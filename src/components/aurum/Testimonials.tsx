import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'A aurum transformou nossa presença regional. Em apenas 45 dias vimos um aumento expressivo no reconhecimento de marca e tráfego nas lojas do Vale.',
    name: 'Mariana Costa',
    role: 'Gerente de Marketing',
    company: 'Rede Shibata',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
  },
  {
    quote: 'Profissionalismo do início ao fim. A equipe nos ajudou a escolher os pontos certos, entregou no prazo e o resultado superou qualquer expectativa que tínhamos.',
    name: 'Ricardo Almeida',
    role: 'Diretor Comercial',
    company: 'Centervale Shopping',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
  },
  {
    quote: 'Trabalhamos juntos por mais de 8 anos. A aurum é nosso parceiro estratégico para campanhas de awareness no litoral norte — confiança construída com resultado.',
    name: 'Fernanda Lopes',
    role: 'Coordenadora de Mkt',
    company: 'Drogaria Total',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="depoimentos" className="bg-[#F9F7F2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-18">
          <div className="inline-flex items-center gap-4 mb-5">
            <div className="w-10 h-[1.5px] bg-gold-grad" />
            <span className="font-inter text-xs font-bold tracking-widest uppercase text-[#9a7a1d]">Depoimentos</span>
            <div className="w-10 h-[1.5px] bg-gold-grad rotate-180" />
          </div>
          <h2 className="font-fraunces font-semibold text-[28px] sm:text-[34px] md:text-[44px] leading-tight text-charcoal tracking-tight">
            O que nossos clientes dizem
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {TESTIMONIALS.map(({ quote, name, role, company, photo }) => (
            <div
              key={name}
              className="bg-paper rounded-aurum p-11 border border-wine/7 shadow-aurum relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-aurum-hv"
            >
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-grad" />

              {/* Decorative quote mark */}
              <div className="absolute top-5 right-7 font-fraunces text-[120px] leading-none text-wine/4 font-bold select-none pointer-events-none">
                &ldquo;
              </div>

              <Stars />

              <blockquote className="font-fraunces font-medium text-lg leading-relaxed text-charcoal mb-9 italic relative z-10">
                &ldquo;{quote}&rdquo;
              </blockquote>

              {/* Person */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-wine/12 shadow-[0_3px_14px_rgba(0,0,0,0.15)] shrink-0">
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div>
                  <div className="font-inter font-bold text-sm sm:text-base text-charcoal leading-tight">{name}</div>
                  <div className="font-inter text-xs sm:text-sm text-on-surface leading-tight mt-0.5">{role}</div>
                  <div className="font-inter text-[11px] sm:text-xs text-wine font-semibold leading-tight mt-0.5">{company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
