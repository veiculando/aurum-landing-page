import React from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Escolha os pontos',
    desc: 'Nosso time apresenta o mapa completo da rede. Você seleciona os pontos que fazem mais sentido para o seu público-alvo e orçamento.',
  },
  {
    num: '02',
    title: 'Envie sua arte',
    desc: 'Entregue os arquivos no formato aprovado ou conte com nossa equipe criativa para desenvolver uma peça de alto impacto para a sua campanha.',
  },
  {
    num: '03',
    title: 'Acompanhe os resultados',
    desc: 'Relatórios fotográficos de instalação, métricas de fluxo e relatório final de campanha para você ter controle total do investimento.',
  },
];

export function CtaSection() {
  return (
    <section id="contato" className="bg-[#F9F7F2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-[1.5px] bg-gold-grad" />
          <span className="font-inter text-xs font-bold tracking-widest uppercase text-[#9a7a1d]">Como funciona</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Left: steps */}
          <div className="flex-1 min-w-[360px]">
            <h2 className="font-fraunces font-semibold text-[28px] sm:text-[36px] md:text-[46px] leading-tight text-charcoal tracking-tight mb-13">
              Anuncie em<br />
              <span className="text-wine">3 passos simples</span>
            </h2>

            <div className="flex flex-col gap-9 mb-14">
              {STEPS.map(({ num, title, desc }) => (
                <div key={num} className="flex gap-6 items-start">
                  {/* Number badge */}
                  <div className="w-13 h-13 rounded-full shrink-0 bg-gold-grad flex items-center justify-center shadow-[0_4px_18px_rgba(217,180,66,0.42)]">
                    <span className="font-fraunces font-bold text-lg text-charcoal">{num}</span>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-fraunces font-semibold text-xl text-wine mb-2.5">{title}</h4>
                    <p className="font-inter text-sm md:text-base leading-relaxed text-on-surface">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <a
              href="mailto:contato@aurumooh.com.br"
              className="inline-flex items-center gap-3 bg-wine-grad text-[#F9F7F2] font-inter text-[15px] font-bold tracking-wider uppercase py-5 px-11 rounded-full shadow-[0_6px_32px_rgba(138,0,9,0.42)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(138,0,9,0.6)]"
            >
              Solicitar proposta gratuita <ArrowRight size={18} />
            </a>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 mt-7">
              {['Sem taxa de adesão', 'Resposta em 24h', 'Proposta personalizada'].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-wine" />
                  <span className="font-inter text-xs sm:text-sm text-on-surface">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: video mockup */}
          <div className="flex-1 min-w-[340px] w-full flex justify-center">
            <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_80px_rgba(74,14,14,0.3)] border border-wine/20 flex flex-col items-center justify-center"
              style={{ background: 'radial-gradient(ellipse at 40% 30%,#5a0006 0%,#2a0003 50%,#110001 100%)' }}
            >
              {/* Decorative overlay pattern */}
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(249,247,242,1)_1px,transparent_1px),linear-gradient(90deg,rgba(249,247,242,1)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              {/* Outdoor billboard mockup */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-10">
                {/* Billboard frame */}
                <div className="bg-white/6 border border-white/15 rounded-xl py-7 px-8 text-center w-full backdrop-blur-[4px]">
                  <div className="bg-gold-grad rounded-lg px-4 py-1.5 inline-block mb-4">
                    <span className="font-inter text-[10px] font-bold tracking-widest uppercase text-charcoal">Outdoor 9×3m</span>
                  </div>
                  <div className="font-fraunces font-semibold text-xl sm:text-2xl text-paper leading-snug mb-3">
                    Sua marca<br />em destaque aqui
                  </div>
                  <div className="font-inter text-xs text-paper/50">
                    BR-116 km 142 · São José dos Campos
                  </div>
                </div>

                {/* Play button ring */}
                <button className="w-18 h-18 rounded-full bg-gold-grad flex items-center justify-center cursor-pointer border-none shadow-[0_8px_32px_rgba(217,180,66,0.6)] transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_44px_rgba(217,180,66,0.75)]">
                  <Play size={28} className="text-charcoal fill-charcoal ml-1" />
                </button>
                <span className="font-inter text-xs text-paper/50 tracking-wider uppercase">Ver showreel</span>
              </div>

              {/* Gold bar top */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-grad" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
