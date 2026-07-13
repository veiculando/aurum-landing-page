import React from 'react';

const PARTNERS = [
  { name: 'Bradesco',         abbr: 'BRA', color: '#cc0000' },
  { name: 'Unimed',           abbr: 'UNI', color: '#00843d' },
  { name: 'Havan',            abbr: 'HAV', color: '#005ca9' },
  { name: 'Shibata',          abbr: 'SHI', color: '#e60026' },
  { name: 'Vanguarda',        abbr: 'VAN', color: '#1a1a6e' },
  { name: 'Colinas Shopping', abbr: 'COL', color: '#8b6914' },
  { name: 'Magazine Luiza',   abbr: 'MAG', color: '#0086ff' },
  { name: 'Centervale',       abbr: 'CEN', color: '#c8102e' },
  { name: 'Drogaria Total',   abbr: 'DRO', color: '#009036' },
  { name: 'Univap',           abbr: 'UNV', color: '#003087' },
];

function PartnerCard({ name, abbr, color }: { name: string; abbr: string; color: string }) {
  return (
    <div className="shrink-0 w-[180px] h-[90px] bg-white rounded-xl border border-wine/7 flex flex-col items-center justify-center gap-1.5 px-5 shadow-[0_2px_12px_rgba(74,14,14,0.07)]">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          background: color,
          boxShadow: `0 3px 12px ${color}44`,
        }}
      >
        <span className="font-inter font-bold text-[13px] text-white tracking-wider">{abbr}</span>
      </div>
      <span className="font-inter text-xs font-semibold text-on-surface tracking-wider text-center">{name}</span>
    </div>
  );
}

export function Partners() {
  const doubled = [...PARTNERS, ...PARTNERS];

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
            Mais de 500 campanhas executadas com excelência. Conheça algumas das marcas que escolheram nossa rede para crescer na região.
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
              <PartnerCard key={i} {...p} />
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
              <PartnerCard key={i} {...p} />
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
