"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Conteúdo placeholder: anos e eventos aguardam confirmação com o Marcelo
// (evolução real de equipamento: Outdoor de Madeira → Ferro → Elegance →
// Triedro → Led). Não inventar anos/eventos novos até a confirmação chegar.
const MILESTONES = [
  { 
    year: 1995, 
    label: 'FUNDAÇÃO', 
    title: 'Fundação da Aurum', 
    desc: 'Início das operações com foco em soluções de mídia exterior para anunciantes da região. Uma empresa fundada com a missão de conectar marcas ao seu público no interior paulista.' 
  },
  { 
    year: 2001, 
    label: 'EXPANSÃO', 
    title: 'Expansão Regional', 
    desc: 'Ampliação da nossa cobertura para as principais cidades do Vale do Paraíba, estabelecendo pontos estratégicos de grande fluxo.' 
  },
  { 
    year: 2004, 
    label: 'INOVAÇÃO', 
    title: 'Novos Formatos', 
    desc: 'Introdução de mobiliário urbano e formatos diferenciados para atender às novas demandas do mercado publicitário.' 
  },
  { 
    year: 2006, 
    label: 'LIDERANÇA', 
    title: 'Liderança no Vale', 
    desc: 'Consolidação como a maior empresa de mídia OOH da região, operando com excelência e ampliando nossa carteira de parceiros.' 
  },
  { 
    year: 2007, 
    label: 'LITORAL', 
    title: 'Chegada ao Litoral', 
    desc: 'Expansão das operações para o litoral norte, garantindo cobertura total nas rodovias de acesso e orlas mais movimentadas.' 
  },
  { 
    year: 2010, 
    label: 'TECNOLOGIA', 
    title: 'Primeiro Painel Digital', 
    desc: 'Instalação do primeiro painel de LED de alta definição da região, inaugurando a era da mídia digital out of home (DOOH).' 
  },
  { 
    year: 2012, 
    label: 'ESTRUTURA', 
    title: 'Crescimento da Equipe', 
    desc: 'Investimento em um time comercial e de operações especializado para melhor atender agências e grandes anunciantes.' 
  },
  { 
    year: 2022, 
    label: 'INOVAÇÃO', 
    title: 'Plataforma Digital', 
    desc: 'Lançamento do sistema próprio de gestão e acompanhamento de campanhas em tempo real, trazendo mais transparência.' 
  },
  { 
    year: 2025, 
    label: 'FUTURO', 
    title: 'Mais de 200 Pontos', 
    desc: 'A Aurum hoje possui a maior e mais moderna rede do interior paulista, conectando milhares de marcas a pessoas todos os dias.' 
  },
];

const Illustration1995 = () => (
  <div className="w-full h-full bg-[#d5bfa4] relative overflow-hidden flex flex-col items-center justify-end pb-[70px]">
    {/* Sun */}
    <div className="absolute right-[10%] top-[20%] w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full bg-[#ebd186]" />
    
    {/* Billboard */}
    <div className="relative z-10 flex flex-col items-center">
      {/* Board */}
      <div className="w-[220px] md:w-[280px] h-[130px] md:h-[160px] bg-[#f7f2ea] border-[8px] border-[#46332a] flex flex-col items-center justify-center relative shadow-[0_12px_24px_rgba(70,51,42,0.2)]">
        <h3 className="font-fraunces italic font-bold text-[36px] md:text-[44px] text-[#9b201a]">aurum</h3>
        <p className="font-inter text-[9px] md:text-[11px] tracking-[0.2em] font-semibold text-[#46332a] mt-2">MÍDIA EXTERIOR · 1995</p>
      </div>
      {/* Pole */}
      <div className="w-[14px] md:w-[16px] h-[50px] md:h-[70px] bg-[#46332a]" />
    </div>
    
    {/* Ground */}
    <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-[#b3997d]" />
    
    {/* 1995 Badge */}
    <div className="absolute top-6 left-6 bg-[#6c5b4d] text-[#e0cfba] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wider">
      1995
    </div>
  </div>
);

const FallbackIllustration = ({ year }: { year: number }) => (
  <div className="w-full h-full bg-stone-200 relative overflow-hidden flex items-center justify-center">
    <span className="font-fraunces text-6xl text-stone-300 font-bold opacity-50">{year}</span>
    <div className="absolute top-6 left-6 bg-stone-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wider">
      {year}
    </div>
  </div>
);

export function History() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const current = MILESTONES[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === MILESTONES.length - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex(prev => prev + 1);
  };

  return (
    <section className="bg-paper py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-[1.5px] bg-gold-grad" />
            <span className="font-inter text-xs font-bold tracking-widest uppercase text-gold">Nossa história</span>
          </div>
          <h2 className="font-fraunces font-semibold text-[32px] sm:text-[40px] md:text-[46px] leading-tight text-charcoal tracking-tight mb-5">
            Uma história em <span className="text-wine">movimento</span>
          </h2>
          <p className="font-inter text-base md:text-lg leading-relaxed text-on-surface max-w-2xl">
            De 1995 até hoje: os marcos que transformaram a Aurum na referência em mídia exterior do interior paulista. Navegue pelos anos.
          </p>
        </div>

        {/* Timeline Graph */}
        <div className="relative mb-16 h-[100px] w-full hidden md:block">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
            <path 
              d="M 10 50 Q 120 10, 230 50 T 450 50 T 670 50 T 890 50 Q 945 10, 990 50" 
              fill="none" 
              stroke="#e2d2a4" 
              strokeWidth="2" 
            />
          </svg>
          
          <div className="absolute inset-0 w-full h-full flex items-center justify-between px-[1%]">
            {MILESTONES.map((m, i) => {
              const isActive = i === currentIndex;
              
              // Approximate alternating Y positions based on the sine wave curve
              let yOffset = "0px";
              if (i === 1) yOffset = "-25px";
              if (i === 3) yOffset = "25px";
              if (i === 5) yOffset = "-25px";
              if (i === 7) yOffset = "25px";
              
              return (
                <div 
                  key={m.year} 
                  className="relative flex flex-col items-center justify-center cursor-pointer group"
                  style={{ transform: `translateY(${yOffset})` }}
                  onClick={() => setCurrentIndex(i)}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white shadow-[0_2px_10px_rgba(138,0,9,0.3)] scale-125 z-10' : 'bg-white border-2 border-[#d9b442] group-hover:scale-110 z-0'}`}>
                    {isActive && <div className="w-3 h-3 rounded-full bg-wine" />}
                  </div>
                  
                  <span className={`absolute top-7 font-fraunces text-sm transition-all duration-300 ${isActive ? 'text-wine font-bold text-base' : 'text-on-surface font-semibold'}`}>
                    {m.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile timeline substitute */}
        <div className="flex md:hidden overflow-x-auto gap-4 pb-6 mb-8 scrollbar-hide">
          {MILESTONES.map((m, i) => (
            <button
              key={m.year}
              onClick={() => setCurrentIndex(i)}
              className={`px-5 py-2 rounded-full font-fraunces text-sm whitespace-nowrap transition-colors ${i === currentIndex ? 'bg-wine text-white shadow-md' : 'bg-white border border-gold/40 text-charcoal'}`}
            >
              {m.year}
            </button>
          ))}
        </div>

        {/* Card Component */}
        <div className="bg-white rounded-[24px] shadow-aurum border border-wine/5 overflow-hidden flex flex-col md:flex-row h-auto md:h-[400px]">
          {/* Image Side */}
          <div className="w-full md:w-1/2 h-[260px] md:h-full relative">
            {current.year === 1995 ? <Illustration1995 /> : <FallbackIllustration year={current.year} />}
          </div>
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col">
            <div className="mb-4">
              <span className="font-inter text-[11px] font-bold tracking-widest uppercase text-[#9a7a1d]">
                {current.year} • {current.label}
              </span>
            </div>
            <h3 className="font-fraunces font-semibold text-[26px] sm:text-[32px] text-wine mb-5 leading-tight">
              {current.title}
            </h3>
            <p className="font-inter text-sm md:text-[15px] leading-relaxed text-on-surface">
              {current.desc}
            </p>
            
            <div className="mt-auto pt-8 flex items-center">
              <div className="flex-1 h-[2px] bg-stone-100 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-gold-grad transition-all duration-500 ease-out" 
                  style={{ width: `${((currentIndex + 1) / MILESTONES.length) * 100}%` }}
                />
              </div>
              <span className="ml-4 font-inter text-xs font-semibold text-stone-400 tracking-wider">
                {currentIndex + 1} / {MILESTONES.length}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={handlePrev}
            disabled={isFirst}
            className="px-6 py-2.5 rounded-full border border-wine/20 text-[11px] font-inter font-bold tracking-widest uppercase text-wine/50 transition-colors hover:bg-wine/5 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            &lt; Anterior
          </button>
          <button 
            onClick={handleNext}
            disabled={isLast}
            className="px-6 py-2.5 rounded-full border border-wine text-[11px] font-inter font-bold tracking-widest uppercase text-wine transition-colors hover:bg-wine hover:text-white disabled:opacity-50"
          >
            Próximo &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
