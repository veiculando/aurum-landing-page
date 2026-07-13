"use client";

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const METAL = 'linear-gradient(180deg,#4a4a4a 0%,#2e2e2e 40%,#1c1c1c 100%)';
const POLE_BG  = 'linear-gradient(90deg,#6a6a6a 0%,#4a4a4a 25%,#888 50%,#4a4a4a 75%,#6a6a6a 100%)';

const SLIDES = [
  {
    tag:   'Para Agências',
    title: 'Condições especiais para planejamento anual',
    desc:  'Negocie circuitos completos no Vale do Paraíba com atendimento dedicado e relatórios de exibição.',
    cta:   'Falar com o comercial',
    photo: 'https://images.unsplash.com/photo-1762421028555-f18bf9596a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
  {
    tag:   'Alta Temporada',
    title: 'Verão 2026: máxima visibilidade no Litoral Norte',
    desc:  'Garanta seus pontos com antecedência e aproveite o fluxo de turistas na alta temporada do litoral paulista.',
    cta:   'Ver pontos disponíveis',
    photo: 'https://images.unsplash.com/photo-1781740146105-e2bd98e9ea6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
  {
    tag:   'Oferta Especial',
    title: 'Pacote Vale do Paraíba: 5 pontos pelo preço de 4',
    desc:  'Campanha completa com outdoor, digital e relógio de rua nas principais cidades do interior paulista.',
    cta:   'Solicitar proposta',
    photo: 'https://images.unsplash.com/photo-1771775751001-eab9483febe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  },
];

export function BillboardCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(() => setCurrent(i => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(i => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      id="clientes"
      className="bg-white py-24 md:py-28 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1060px] mx-auto px-6 md:px-12">
        {/* ── Cabeçalho ── */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-[1.5px] bg-gold-grad" />
            <span className="font-inter text-xs font-bold tracking-widest uppercase text-[#9a7a1d]">
              Campanhas e Ofertas
            </span>
          </div>
          <h2 className="font-fraunces font-semibold text-[26px] sm:text-[32px] md:text-[40px] text-charcoal leading-tight tracking-tight">
            Campanhas e ofertas ativas
          </h2>
        </div>

        {/* ── Estrutura do outdoor ── */}
        <div className="relative">
          {/* Postes (atrás do painel) */}
          <div
            className="absolute z-1 bottom-0 left-[27%] w-4.5 top-[72%] rounded-t-[2px]"
            style={{ background: POLE_BG }}
          />
          <div
            className="absolute z-1 bottom-0 right-[27%] w-4.5 top-[72%] rounded-t-[2px]"
            style={{ background: POLE_BG }}
          />
          {/* Pés dos postes */}
          <div className="absolute z-1 bottom-0 left-[calc(27%-10px)] w-9.5 h-2.5 bg-[#3a3a3a] rounded-b-md" />
          <div className="absolute z-1 bottom-0 right-[calc(27%-10px)] w-9.5 h-2.5 bg-[#3a3a3a] rounded-b-md" />

          {/* ── Painel do outdoor ── */}
          <div
            className="relative z-10 rounded-lg p-2.5 pb-2 shadow-[0_28px_80px_rgba(0,0,0,0.22),_0_6px_20px_rgba(0,0,0,0.15),_inset_0_1px_0_rgba(255,255,255,0.08)]"
            style={{ background: METAL }}
          >
            {/* Trilho superior do frame */}
            <div className="h-1.5 bg-gradient-to-r from-[#555] via-[#888] to-[#555] rounded-t-md mb-2" />

            {/* Face do outdoor */}
            <div className="relative rounded-md overflow-hidden min-h-[280px] md:min-h-[240px]">
              {/* Slides com fade — foto de fundo */}
              {SLIDES.map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{
                    backgroundImage: `url(${s.photo})`,
                    opacity: i === current ? 1 : 0,
                  }}
                />
              ))}

              {/* Overlay gradiente escuro */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20 pointer-events-none z-10" />

              {/* Conteúdo do slide */}
              <div className="relative z-20 p-8 sm:p-12 md:py-11 md:px-14 flex flex-col justify-center min-h-[280px] md:min-h-[240px]">
                {/* Tag */}
                <div className="self-start mb-5 bg-gold/18 border border-gold/40 rounded-full px-4 py-1">
                  <span className="font-inter text-[11px] font-bold tracking-widest uppercase text-gold-light">
                    {slide.tag}
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-fraunces font-semibold text-xl sm:text-2xl md:text-3xl leading-tight text-paper mb-4.5 tracking-tight max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                  {slide.title}
                </h3>

                {/* Descrição */}
                <p className="font-inter text-sm md:text-base leading-relaxed text-paper/80 mb-9 max-w-lg drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                  {slide.desc}
                </p>

                {/* CTA */}
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 bg-wine-grad text-[#F9F7F2] font-inter text-[12px] font-bold tracking-widest uppercase py-3 px-7 rounded-full shadow-[0_4px_20px_rgba(138,0,9,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(138,0,9,0.65)] self-start"
                >
                  {slide.cta}
                </a>
              </div>
            </div>

            {/* Trilho inferior */}
            <div className="h-1.5 bg-gradient-to-r from-[#555] via-[#888] to-[#555] rounded-b-md mt-2" />
          </div>

          {/* Espaço para os postes abaixo do painel */}
          <div className="h-18" />
        </div>

        {/* ── Navegação ── */}
        <div className="flex items-center justify-between mt-7">
          {/* Dots */}
          <div className="flex gap-2 items-center">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 p-0 border-none cursor-pointer rounded-full transition-all duration-300 ${
                  i === current ? 'w-7 bg-gold-grad' : 'w-2 bg-wine/18'
                }`}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            {[
              { fn: prev, Icon: ArrowLeft, label: 'Anterior' },
              { fn: next, Icon: ArrowRight, label: 'Próximo' },
            ].map(({ fn, Icon, label }, i) => (
              <button
                key={i}
                onClick={fn}
                className="w-[38px] h-[38px] rounded-full border border-wine/18 bg-white flex items-center justify-center cursor-pointer text-wine shadow-[0_2px_10px_rgba(74,14,14,0.08)] transition-all duration-200 hover:bg-wine hover:text-white"
                aria-label={label}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
