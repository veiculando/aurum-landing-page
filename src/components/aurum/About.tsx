import React from 'react';
import Image from 'next/image';

const TIMELINE = [
  { year: '1995', event: 'Fundação da aurum OOH em São José dos Campos' },
  { year: '1998', event: 'Expansão para Taubaté e Jacareí' },
  { year: '2002', event: 'Lançamento da linha de relógios de rua' },
  { year: '2007', event: 'Chegada ao Litoral Norte (Caraguatatuba)' },
  { year: '2010', event: 'Primeiro painel digital da região instalado' },
  { year: '2014', event: 'Parceria com 100+ anunciantes ativos' },
  { year: '2018', event: 'Rede ultrapassa 150 pontos estratégicos' },
  { year: '2022', event: 'Lançamento da plataforma digital de campanhas' },
  { year: '2025', event: '200+ pontos e 31 anos conectando marcas' },
];

const VALUES = [
  {
    title: 'Missão',
    text: 'Conectar marcas ao público certo com inteligência, presença e impacto — gerando resultados mensuráveis para cada cliente que confia em nossa rede.',
    icon: '🎯',
  },
  {
    title: 'Visão',
    text: 'Ser a referência em mídia OOH no interior e litoral paulista, com tecnologia, capilaridade e um time de alta performance ao lado de cada parceiro.',
    icon: '🔭',
  },
  {
    title: 'Responsabilidade',
    text: 'Crescer com consciência: pontualidade, transparência e compromisso com as comunidades das cidades onde operamos faz parte do nosso DNA há 31 anos.',
    icon: '🌱',
  },
];

const TEAM = [
  { name: 'Carlos Mendes',  role: 'CEO & Fundador',     photo: 'https://images.unsplash.com/photo-1600878459138-e1123b37cb30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
  { name: 'Ana Beatriz',    role: 'Diretora Comercial', photo: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
  { name: 'Lucas Ferreira', role: 'Head de Operações',  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
];

const STATS = [
  { n: '31',   label: 'Anos no mercado' },
  { n: '5K+',  label: 'Campanhas realizadas' },
  { n: '200+', label: 'Pontos estratégicos' },
  { n: '15+',  label: 'Cidades cobertas' },
];

export function About() {
  return (
    <section id="sobre" className="bg-paper py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-[1.5px] bg-gold-grad" />
          <span className="font-inter text-xs font-bold tracking-widest uppercase text-gold">Sobre a aurum</span>
        </div>

        {/* Intro 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="font-fraunces font-semibold text-[28px] sm:text-[36px] md:text-[46px] leading-tight text-charcoal tracking-tight mb-7">
              Três décadas conectando<br />
              <span className="text-wine">marcas e pessoas</span>
            </h2>
            <p className="font-inter text-base md:text-lg leading-relaxed text-on-surface mb-5">
              Fundada em 1995, a aurum OOH nasceu com uma missão clara: levar a mensagem certa para o lugar certo, no momento certo. Ao longo de três décadas construímos a mais completa rede de mídia exterior da Grande São Paulo, Vale do Paraíba e Litoral Norte.
            </p>
            <p className="font-inter text-base md:text-lg leading-relaxed text-on-surface">
              Hoje somos mais de 40 profissionais dedicados, operando 200+ pontos estratégicos em 15 cidades — com tecnologia de gestão e atendimento personalizado que fazem a diferença na sua campanha.
            </p>
          </div>

          {/* Stats grid */}
          <div className="w-full grid grid-cols-2 gap-6">
            {STATS.map(({ n, label }) => (
              <div
                key={label}
                className="bg-white rounded-aurum p-8 lg:p-10 border border-wine/8 shadow-aurum text-center flex flex-col justify-center"
              >
                <div className="font-fraunces font-semibold text-5xl lg:text-[64px] bg-gold-grad bg-clip-text text-transparent leading-none mb-4">
                  {n}
                </div>
                <div className="font-inter text-xs sm:text-sm text-on-surface font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
