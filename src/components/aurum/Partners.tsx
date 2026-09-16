import React from 'react';
import { getMarcas, type Marca } from '@/lib/cms';

function PartnerCard({ name, image_url }: { name: string; image_url: string }) {
  return (
    <div className="shrink-0 w-[180px] h-[90px] bg-white rounded-xl border border-wine/7 flex flex-col items-center justify-center gap-1.5 px-5 shadow-[0_2px_12px_rgba(74,14,14,0.07)]">
      <img
        src={image_url}
        alt={name}
        className="max-h-9 max-w-[120px] object-contain"
      />
      <span className="font-inter text-xs font-semibold text-on-surface tracking-wider text-center">{name}</span>
    </div>
  );
}

export function PartnersView({ marcas }: { marcas: Marca[] }) {
  const doubled = [...marcas, ...marcas];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-[1.5px] bg-gold-grad" />
          <span className="font-inter text-xs font-bold tracking-widest uppercase text-[#9a7a1d]">Marcas Parceiras</span>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-fraunces font-semibold text-[26px] sm:text-[32px] md:text-[40px] text-charcoal leading-tight tracking-tight">
            Empresas que confiam<br />
            <span className="text-wine">na aurum OOH</span>
          </h2>
          <p className="font-inter text-base text-on-surface max-w-md leading-relaxed">
            Mais de 5 mil campanhas de sucesso executadas com excelência. Conheça algumas das marcas que escolheram nossa rede para crescer na região.
          </p>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden py-3">
          <div className="flex gap-5 w-max animate-[marquee_28s_linear_infinite]">
            {doubled.map((p, i) => (
              <PartnerCard key={`${p.id}-${i}`} {...p} />
            ))}
          </div>
        </div>
      </div>

      {/* Second row reversed */}
      <div className="relative mt-5">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden py-3">
          <div className="flex gap-5 w-max animate-[marqueeReverse_32s_linear_infinite]">
            {[...doubled].reverse().map((p, i) => (
              <PartnerCard key={`${p.id}-r${i}`} {...p} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

// Server Component: busca as marcas ativas no Supabase (tabela `marcas`).
// Sem fallback hardcoded — se o banco estiver vazio/indisponível a seção
// não deve fingir dados fictícios, só renderiza sem cards.
export async function Partners() {
  const marcas = await getMarcas();
  return <PartnersView marcas={marcas} />;
}
