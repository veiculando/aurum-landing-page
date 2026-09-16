import React from 'react';
import { Star } from 'lucide-react';
import { getDepoimentos, type Depoimento } from '@/lib/cms';

function Stars() {
  return (
    <div className="flex gap-0.5 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

export function TestimonialsView({ depoimentos }: { depoimentos: Depoimento[] }) {
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
          {depoimentos.map(({ id, author, role, content }) => (
            <div
              key={id}
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
                &ldquo;{content}&rdquo;
              </blockquote>

              {/* Person */}
              <div>
                <div className="font-inter font-bold text-sm sm:text-base text-charcoal leading-tight">{author}</div>
                {role && (
                  <div className="font-inter text-xs sm:text-sm text-on-surface leading-tight mt-0.5">{role}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Server Component: busca depoimentos ativos no Supabase (tabela
// `depoimentos`). O schema real só tem author/role/content — sem
// empresa nem foto, então essa versão não inventa esses campos.
export async function Testimonials() {
  const depoimentos = await getDepoimentos();
  return <TestimonialsView depoimentos={depoimentos} />;
}
