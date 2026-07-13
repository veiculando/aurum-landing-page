"use client";

import { useState } from 'react';
import { MapPin, Check } from 'lucide-react';

const CITIES_VALE = [
  'São José dos Campos',
  'Taubaté',
  'Jacareí',
  'Pindamonhangaba',
  'Guaratinguetá',
  'Caçapava',
];
const CITIES_LITORAL = [
  'Caraguatatuba',
  'Ubatuba',
  'São Sebastião',
  'Ilhabela',
];

const PINS = [
  { x: 52,  y: 192, label: 'Jacareí',          region: 'vale' },
  { x: 88,  y: 161, label: 'São José dos Campos', region: 'vale' },
  { x: 166, y: 138, label: 'Caçapava',         region: 'vale' },
  { x: 234, y: 119, label: 'Taubaté',          region: 'vale' },
  { x: 276, y: 92,  label: 'Pindamonhangaba',  region: 'vale' },
  { x: 395, y: 64,  label: 'Guaratinguetá',    region: 'vale' },
  { x: 297, y: 274, label: 'Caraguatatuba',    region: 'litoral' },
  { x: 322, y: 314, label: 'Ilhabela',         region: 'litoral' },
  { x: 303, y: 319, label: 'São Sebastião',    region: 'litoral' },
  { x: 450, y: 225, label: 'Ubatuba',          region: 'litoral' },
];

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
          d="M 20,210 L 52,192 L 88,161 L 166,138 L 234,119 L 276,92 L 395,64 L 480,50"
          stroke="#e2e2da"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 20,210 L 52,192 L 88,161 L 166,138 L 234,119 L 276,92 L 395,64 L 480,50"
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
          d="M 240,330 L 303,319 L 297,274 L 380,245 L 450,225 L 490,215"
          stroke="#e2e2da"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ferry / Balsa (São Sebastião to Ilhabela) */}
        <path
          d="M 303,319 L 322,314"
          stroke="#d9b442"
          strokeWidth="2"
          strokeDasharray="3 3"
          strokeLinecap="round"
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
            Nossa malha de pontos cobre o eixo do Vale do Paraíba de ponta a ponta, e sobe a Serra pelo corredor Tamoios até o Litoral Norte — alcançando mais de <strong className="text-wine font-semibold">4 milhões de impactos</strong> mensais.
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
          <div className="bg-paper rounded-3xl p-6 md:p-8 border border-wine/9 shadow-[0_12px_48px_rgba(138,0,9,0.09)] w-full max-w-[540px]">
            <div className="flex items-center justify-between mb-6">
              <span className="font-inter text-[11px] font-bold tracking-widest uppercase text-[#9a7a1d]">
                SP — Vale do Paraíba & Litoral Norte
              </span>
              <div className="flex gap-1.5">
                {['#ff6b6b','#ffd93d','#6bcb77'].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
            </div>
            <MapSVG />
          </div>
        </div>
      </div>
    </section>
  );
}
