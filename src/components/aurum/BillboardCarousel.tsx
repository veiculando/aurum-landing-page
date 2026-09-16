"use client";

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Banner } from '@/lib/cms';

const METAL = 'linear-gradient(180deg,#4a4a4a 0%,#2e2e2e 40%,#1c1c1c 100%)';
const POLE_BG  = 'linear-gradient(90deg,#6a6a6a 0%,#4a4a4a 25%,#888 50%,#4a4a4a 75%,#6a6a6a 100%)';

export function BillboardCarousel({ slides }: { slides: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [paused, next, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];

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

            {/* Face do outdoor — imagem do banner (tabela `banners`), com link de destino */}
            <a
              href={slide.destino || undefined}
              className="relative block rounded-md overflow-hidden min-h-[280px] md:min-h-[240px]"
              aria-label="Ver oferta"
            >
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{
                    backgroundImage: `url(${s.image_url})`,
                    opacity: i === current ? 1 : 0,
                  }}
                />
              ))}
            </a>

            {/* Trilho inferior */}
            <div className="h-1.5 bg-gradient-to-r from-[#555] via-[#888] to-[#555] rounded-b-md mt-2" />
          </div>

          {/* Espaço para os postes abaixo do painel */}
          <div className="h-18" />
        </div>

        {/* ── Navegação ── */}
        {slides.length > 1 && (
          <div className="flex items-center justify-between mt-7">
            {/* Dots */}
            <div className="flex gap-2 items-center">
              {slides.map((s, i) => (
                <button
                  key={s.id}
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
        )}
      </div>
    </section>
  );
}
