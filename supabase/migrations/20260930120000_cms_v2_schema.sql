-- CMS v2 (Sprint 4.0 / TP-2). SOMENTE ADITIVA: o Supabase e unico e a LP de
-- producao le dele (ADR-CMS-004). Nenhuma coluna existente e alterada ou
-- reescrita (image_url, destino, is_active, author, role, content).

-- ── banners ─────────────────────────────────────────────────────────────────
alter table public.banners
  add column if not exists title text not null default '',
  add column if not exists tipo_destino text not null default 'link',
  add column if not exists html_path text null,
  add column if not exists display_order integer not null default 0,
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'banners_tipo_destino_check' and conrelid = 'public.banners'::regclass
  ) then
    alter table public.banners
      add constraint banners_tipo_destino_check check (tipo_destino in ('link', 'html'));
  end if;
end $$;

-- ── depoimentos ─────────────────────────────────────────────────────────────
alter table public.depoimentos
  add column if not exists avatar_url text null,
  add column if not exists company text null,
  add column if not exists display_order integer not null default 0,
  add column if not exists updated_at timestamptz not null default now();

-- ── marcas ──────────────────────────────────────────────────────────────────
alter table public.marcas
  add column if not exists updated_at timestamptz not null default now();

-- ── Default de publicacao (decisao do owner, 30/09/2026) ───────────────────
-- Muda so o default de INSERTs futuros; nao altera linha existente nem o que a
-- anon le hoje.
alter table public.banners     alter column is_active set default false;
alter table public.marcas      alter column is_active set default false;
alter table public.depoimentos alter column is_active set default false;

-- ── Backfill deterministico ─────────────────────────────────────────────────
-- O seed de setembro insere as linhas num unico INSERT (mesmo created_at):
-- desempata por id. So toca as colunas novas.
with o as (
  select id, row_number() over (order by created_at, id) as rn from public.banners
)
update public.banners b
   set title = 'Banner ' || o.rn, display_order = o.rn
  from o
 where o.id = b.id and b.title = '';

with o as (
  select id, row_number() over (order by created_at, id) as rn from public.depoimentos
)
update public.depoimentos d
   set display_order = o.rn
  from o
 where o.id = d.id and d.display_order = 0;

-- ── updated_at automatico ───────────────────────────────────────────────────
create or replace function public.cms_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cms_banners_set_updated_at on public.banners;
create trigger cms_banners_set_updated_at
  before update on public.banners
  for each row execute function public.cms_set_updated_at();

drop trigger if exists cms_marcas_set_updated_at on public.marcas;
create trigger cms_marcas_set_updated_at
  before update on public.marcas
  for each row execute function public.cms_set_updated_at();

drop trigger if exists cms_depoimentos_set_updated_at on public.depoimentos;
create trigger cms_depoimentos_set_updated_at
  before update on public.depoimentos
  for each row execute function public.cms_set_updated_at();

-- ── cms_auditoria ───────────────────────────────────────────────────────────
create table if not exists public.cms_auditoria (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  wl_usuario_id integer,
  usuario_email text,
  afiliada_id integer,
  acao text,
  recurso text,
  recurso_id uuid,
  antes jsonb,
  depois jsonb,
  -- Remocao adiada de arquivos (TP-3): preenchido quando o arquivo antigo de
  -- uma 'trocar_arquivo' ja foi removido do storage.
  arquivo_limpo_em timestamptz null
);

alter table public.cms_auditoria enable row level security;
-- Sem policy: anon/authenticated nao leem nem escrevem; service_role ignora RLS.
revoke all on public.cms_auditoria from anon, authenticated;

create index if not exists cms_auditoria_arquivo_pendente_idx
  on public.cms_auditoria (created_at)
  where acao = 'trocar_arquivo' and arquivo_limpo_em is null;

-- ── RPC do resumo de depoimentos (consumida pelo BFF, service_role) ─────────
create or replace function public.cms_depoimentos_resumo()
returns json
language sql
stable
security invoker
set search_path = ''
as $$
  select json_build_object(
    'total', count(*),
    'publicados', count(*) filter (where is_active),
    'ocultos', count(*) filter (where not is_active),
    'novosNoMes', count(*) filter (
      where created_at >= (date_trunc('month', now() at time zone 'America/Sao_Paulo') at time zone 'America/Sao_Paulo')
    ),
    'empresas', count(distinct lower(nullif(btrim(company), '')))
  ) from public.depoimentos;
$$;

revoke execute on function public.cms_depoimentos_resumo() from public, anon, authenticated;
grant execute on function public.cms_depoimentos_resumo() to service_role;
