"use client";

import React from 'react';
import { Network, TrendingUp, HandHeart } from 'lucide-react';

const VALUES = [
  {
    title: 'Missão',
    text: 'Promover conexões entre marcas e pessoas com inteligência, presença e impacto — gerando resultados mensuráveis para cada cliente que confia em nossa rede.',
    icon: <Network className="w-6 h-6 text-wine" />,
  },
  {
    title: 'Visão',
    text: 'Ser a referência em mídia OOH no interior e litoral paulista, com tecnologia, capilaridade e um time de alta performance ao lado de cada parceiro.',
    icon: <TrendingUp className="w-6 h-6 text-wine" />,
  },
  {
    title: 'Responsabilidade',
    text: 'Crescer com consciência: pontualidade, transparência e compromisso com as comunidades das cidades onde operamos faz parte do nosso DNA há 31 anos.',
    icon: <HandHeart className="w-6 h-6 text-wine" />,
  },
];

const TEAM = [
  { name: 'Carlos Mendes',  role: 'CEO & Fundador',     photo: 'https://images.unsplash.com/photo-1600878459138-e1123b37cb30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
  { name: 'Ana Beatriz',    role: 'Diretora Comercial', photo: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
  { name: 'Lucas Ferreira', role: 'Head de Operações',  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
];

export function ValuesAndTeam() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Mission / Vision / Responsibility */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ title, text, icon }) => (
              <div
                key={title}
                className="bg-white rounded-aurum p-10 md:p-12 border border-wine/5 shadow-aurum relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-grad" />
                <div className="mb-6">{icon}</div>
                <h4 className="font-fraunces font-semibold text-[26px] text-wine mb-4">{title}</h4>
                <p className="font-inter text-[13.5px] leading-relaxed text-on-surface">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="font-fraunces font-semibold text-[28px] md:text-3xl text-charcoal mb-12 text-center tracking-tight">
            Equipe de liderança
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto w-full">
            {TEAM.map(({ name, role, photo }) => (
              <div
                key={name}
                className="bg-white rounded-aurum p-10 border border-wine/5 shadow-aurum text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-aurum-hv"
              >
                {/* Avatar */}
                <div className="relative w-[90px] h-[90px] rounded-full overflow-hidden mx-auto mb-6 shadow-md border-4 border-white">
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div className="font-fraunces font-semibold text-[19px] text-charcoal mb-1.5">{name}</div>
                <div className="font-inter text-xs text-on-surface font-medium">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
