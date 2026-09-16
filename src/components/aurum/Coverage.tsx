"use client";

import { useState } from 'react';
import { MapPin, Check } from 'lucide-react';

const CITIES_VALE = [
  'Mogi das Cruzes',
  'Suzano',
  'Poá',
  'São José dos Campos',
  'Jacareí',
  'Caçapava',
  'Taubaté',
];
const CITIES_LITORAL = [
  'São Sebastião',
  'Bertioga',
];

const PINS = [
  { x: 40,  y: 205, label: 'Mogi das Cruzes',    region: 'vale' },
  { x: 25,  y: 217, label: 'Suzano',             region: 'vale' },
  { x: 12,  y: 227, label: 'Poá',                region: 'vale' },
  { x: 52,  y: 192, label: 'Jacareí',            region: 'vale' },
  { x: 88,  y: 161, label: 'São José dos Campos', region: 'vale' },
  { x: 166, y: 138, label: 'Caçapava',           region: 'vale' },
  { x: 234, y: 119, label: 'Taubaté',            region: 'vale' },
  { x: 303, y: 319, label: 'São Sebastião',      region: 'litoral' },
  { x: 250, y: 333, label: 'Bertioga',           region: 'litoral' },
];

const HIGHWAYS = [
  { name: 'BR-116 Via Dutra', color: '#8a0009' },
  { name: 'SP-070 Ayrton Senna/Carvalho Pinto', color: '#8a0009' },
  { name: 'SP-088 Mogi-Dutra', color: '#8a0009' },
  { name: 'SP-098 Mogi-Bertioga', color: '#d9b442' },
  { name: 'SP-099 Tamoios', color: '#d9b442' },
  { name: 'SP-055/BR-101 Rio-Santos', color: '#d9b442' },
];

function HighwaysLegend() {
  return (
    <div className="mt-6 bg-paper rounded-2xl border border-wine/9 p-5">
      <span className="font-inter text-[11px] font-bold tracking-widest uppercase text-[#9a7a1d] mb-4 block">
        Principais rodovias do corredor
      </span>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
        {HIGHWAYS.map(hw => (
          <li key={hw.name} data-highway-row className="flex items-center gap-2.5">
            <svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true">
              <path d="M 1 5 L 27 5" stroke={hw.color} strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
            </svg>
            <span className="font-inter text-xs text-on-surface font-medium">{hw.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MapSVG() {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[460px] bg-[#fdfdfc] rounded-2xl border border-wine/9 shadow-[0_12px_48px_rgba(138,0,9,0.06)] overflow-hidden flex items-center justify-center">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e0_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
      
      {/* SVG Canvas Map */}
      <svg className="w-full h-full max-w-[500px] max-h-[340px] z-10 p-4" viewBox="0 0 500 340" fill="none">
        {/* Road networks */}
        {/* Rodovia Presidente Dutra (Vale do Paraíba corridor) */}
        <path
          d="M 12,227 L 25,217 L 40,205 L 52,192 L 88,161 L 166,138 L 234,119 L 276,92 L 395,64 L 480,50"
          stroke="#e2e2da"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 12,227 L 25,217 L 40,205 L 52,192 L 88,161 L 166,138 L 234,119 L 276,92 L 395,64 L 480,50"
          stroke="#8a0009"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-25"
        />

        {/* Rodovia dos Tamoios (SJC to Litoral Norte) */}
        <path
          d="M 88,161 L 190,200 L 297,274"
          stroke="#e2e2da"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 88,161 L 190,200 L 297,274"
          stroke="#d9b442"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-30"
        />

        {/* Rodovia Rio-Santos (Litoral Norte corridor) */}
        <path
          d="M 250,333 L 303,319 L 297,274 L 380,245 L 450,225 L 490,215"
          stroke="#e2e2da"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Coastline visual effect */}
        <path
          d="M 210,340 C 260,335 285,320 280,285 C 275,250 350,240 390,228 C 430,215 470,210 500,200"
          stroke="#d4d4c8"
          strokeWidth="1"
          className="opacity-40"
        />

        {/* PINS */}
        {PINS.map((pin) => {
          const isHovered = hoveredPin === pin.label;
          const isVale = pin.region === 'vale';
          return (
            <g
              key={pin.label}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredPin(pin.label)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Outer Glow on hover */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isHovered ? 16 : 10}
                fill={isVale ? '#8a0009' : '#d9b442'}
                className="opacity-15 transition-all duration-300 ease-out"
              />

              {/* Pin base circle */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={6}
                fill={isVale ? '#8a0009' : '#d9b442'}
                stroke="#ffffff"
                strokeWidth="1.5"
                className="transition-transform duration-300 ease-out group-hover:scale-125"
              />

              {/* Tiny inner center */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={2}
                fill="#ffffff"
              />

              {/* Label */}
              <text
                x={pin.x}
                y={pin.y - 12}
                textAnchor="middle"
                className={`font-inter text-[10px] font-bold transition-all duration-300 ${
                  isHovered ? 'fill-wine opacity-100 scale-105' : 'fill-charcoal/60'
                }`}
                style={{
                  pointerEvents: 'none',
                }}
              >
                {pin.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mock Map Info / Interactive HUD Overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-wine/5 rounded-xl p-3 flex justify-between items-center text-xs shadow-sm z-20">
        <div>
          <span className="font-bold text-wine">Mapa de Cobertura</span>
          <p className="text-[10px] text-charcoal/60">Passe o mouse nos pontos para identificar as cidades</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8a0009]" />
            <span className="text-[10px] font-medium text-charcoal/80">Vale do Paraíba</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d9b442]" />
            <span className="text-[10px] font-medium text-charcoal/80">Litoral Norte</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Coverage() {
  return (
    <section id="cobertura" className="bg-[#F9F7F2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
        {/* Left: text + cities */}
        <div className="flex-1 min-w-[340px]">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-[1.5px] bg-gold-grad" />
            <span className="font-inter text-xs font-bold tracking-widest uppercase text-[#9a7a1d]">
              Cobertura Regional
            </span>
          </div>

          <h2 className="font-fraunces font-semibold text-[28px] sm:text-[34px] md:text-[42px] leading-tight text-charcoal mb-6 tracking-tight">
            Presença em toda a<br />
            <span className="text-wine">região estratégica</span>
          </h2>

          <p className="font-inter text-base md:text-lg leading-relaxed text-on-surface mb-11">
            Nossa malha de pontos cobre o Alto Tietê, o Vale do Paraíba de ponta a ponta, e sobe a Serra pelo corredor Tamoios até o Litoral Norte — alcançando mais de <strong className="text-wine font-semibold">4 milhões de impactos</strong> mensais.
          </p>

          {/* City columns */}
          <div className="grid grid-cols-2 gap-3.5 mb-11">
            {[...CITIES_VALE, ...CITIES_LITORAL].map(city => (
              <div key={city} className="flex items-center gap-2.5">
                <div className="w-[22px] h-[22px] rounded-full bg-wine/7 flex items-center justify-center shrink-0">
                  <Check size={13} className="text-wine" strokeWidth={2.5} />
                </div>
                <span className="font-inter text-sm text-on-surface font-medium">{city}</span>
              </div>
            ))}
          </div>

          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-wine-grad text-[#F9F7F2] font-inter text-[12px] font-bold tracking-widest uppercase py-4.5 px-9.5 rounded-full shadow-[0_4px_20px_rgba(138,0,9,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(138,0,9,0.55)]"
          >
            <MapPin size={15} /> Ver pontos disponíveis
          </a>
        </div>

        {/* Right: SVG map */}
        <div className="flex-1 min-w-[360px] w-full flex justify-center">
          <div className="w-full max-w-[540px]">
            <div className="bg-paper rounded-3xl p-6 md:p-8 border border-wine/9 shadow-[0_12px_48px_rgba(138,0,9,0.09)] w-full">
              <div className="flex items-center justify-between mb-6">
                <span className="font-inter text-[11px] font-bold tracking-widest uppercase text-[#9a7a1d]">
                  GRANDE SP | VALE DO PARAIBA | LITORAL NORTE
                </span>
                <div className="flex gap-1.5">
                  {['#ff6b6b','#ffd93d','#6bcb77'].map(c => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <MapSVG />
            </div>
            <HighwaysLegend />
          </div>
        </div>
      </div>
    </section>
  );
}
