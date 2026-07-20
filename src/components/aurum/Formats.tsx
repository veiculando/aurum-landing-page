import React from 'react';
import { Monitor, Clock, Zap, Package, Truck, Lightbulb } from 'lucide-react';

const FORMATS = [
  {
    Icon: Monitor,
    title: 'Outdoor',
    desc: 'Alta visibilidade em rodovias e avenidas de grande fluxo, nos formatos 9×3m e 8×3m — máxima exposição 24h.',
    photo: 'https://images.unsplash.com/photo-1699480114704-ac153307d2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    Icon: Zap,
    title: 'Painéis Digitais',
    desc: 'Tecnologia LED de alta resolução com rotatividade programada. Altere sua mensagem em tempo real.',
    photo: 'https://images.unsplash.com/photo-1781706422483-35109962fed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    Icon: Truck,
    title: 'Busdoor & Mídia Móvel',
    desc: 'Sua marca circulando por toda a cidade em rotas estratégicas, alcançando múltiplos bairros.',
    photo: 'https://images.unsplash.com/photo-1708107243374-52eddcc3fe64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    Icon: Clock,
    title: 'Relógio de Rua',
    desc: 'Exposição dupla face em calçadões e praças movimentadas — presença constante no dia a dia.',
    photo: 'https://images.unsplash.com/photo-1685489814520-6b6e7b9c9760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    Icon: Package,
    title: 'Totem & Mobiliário',
    desc: 'Destaque elegante em shoppings, terminais e centros comerciais — onde as decisões são tomadas.',
    photo: 'https://images.unsplash.com/photo-1521794414102-37606728dd9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
  {
    Icon: Lightbulb,
    title: 'Front Light',
    desc: 'Painéis iluminados internamente com impacto noturno garantido nos horários de maior fluxo.',
    photo: 'https://images.unsplash.com/photo-1565642899687-1c332fb7dc65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  },
];

export function Formats() {
  return (
    <section id="formatos" className="bg-paper">
      {/* ── Cabeçalho ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-[1.5px] bg-gold-grad" />
          <span className="font-inter text-xs font-bold tracking-widest uppercase text-gold">
            Formatos de Mídia
          </span>
        </div>

        <div className="flex flex-wrap items-end gap-6 justify-between">
          <h2 className="font-fraunces font-semibold text-[28px] sm:text-[36px] md:text-[44px] leading-tight text-charcoal tracking-tight flex-1 min-w-[320px]">
            Soluções que colocam<br />
            <span className="text-wine">sua marca em evidência</span>
          </h2>
          <p className="font-inter text-base md:text-lg leading-relaxed text-on-surface flex-1 min-w-[320px] max-w-lg">
            Do outdoor tradicional aos painéis digitais de última geração — o formato certo para cada objetivo de campanha.
          </p>
        </div>
      </div>

      {/* ── Grade fotográfica ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 auto-rows-[420px]">
        {FORMATS.map(({ Icon, title, desc, photo }, i) => (
          <div
            key={title}
            className="group relative overflow-hidden cursor-default h-[420px]"
          >
            {/* Foto de fundo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${photo})` }}
            />

            {/* Overlay gradiente permanente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

            {/* Borda dourada no topo */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-grad z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Separadores de grade */}
            {i % 3 !== 2 && (
              <div className="hidden md:block absolute top-0 right-0 bottom-0 w-px bg-white/12 z-20" />
            )}
            {i < 3 && (
              <div className="hidden md:block absolute left-0 right-0 bottom-0 h-px bg-white/12 z-20" />
            )}

            {/* Conteúdo na base */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-30 flex flex-col justify-end min-h-[220px]">
              {/* Descrição — aparece no hover */}
              <p className="font-inter text-sm leading-relaxed text-paper/80 mb-5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {desc}
              </p>

              {/* Rótulo sempre visível */}
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-lg shrink-0 bg-gold-grad flex items-center justify-center shadow-[0_4px_16px_rgba(217,180,66,0.45)]">
                  <Icon size={18} className="text-charcoal" />
                </div>
                <span className="font-fraunces font-semibold text-xl text-paper tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  {title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Rodapé da seção ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 flex justify-center">
        <a
          href="#contato"
          className="inline-flex items-center gap-2.5 bg-wine-grad text-[#F9F7F2] font-inter text-sm font-bold tracking-wider uppercase py-4 px-9 rounded-full shadow-[0_4px_20px_rgba(138,0,9,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(138,0,9,0.55)]"
        >
          Solicitar proposta
        </a>
      </div>
    </section>
  );
}
