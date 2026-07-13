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
  { n: '500+', label: 'Campanhas realizadas' },
  { n: '200+', label: 'Pontos estratégicos' },
  { n: '15+',  label: 'Cidades cobertas' },
];

export function About() {
  return (
    <section id="sobre" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-[1.5px] bg-gold-grad" />
          <span className="font-inter text-xs font-bold tracking-widest uppercase text-[#9a7a1d]">Sobre a aurum</span>
        </div>

        {/* Intro 2-col */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="flex-1 min-w-[340px]">
            <h2 className="font-fraunces font-semibold text-[28px] sm:text-[36px] md:text-[46px] leading-tight text-charcoal tracking-tight mb-7">
              Três décadas conectando<br />
              <span className="text-wine">marcas e pessoas</span>
            </h2>
            <p className="font-inter text-base md:text-lg leading-relaxed text-on-surface mb-5">
              Fundada em 1995, a aurum OOH nasceu com uma missão clara: levar a mensagem certa para o lugar certo, no momento certo. Ao longo de três décadas construímos a mais completa rede de mídia exterior do Vale do Paraíba e Litoral Norte.
            </p>
            <p className="font-inter text-base md:text-lg leading-relaxed text-on-surface">
              Hoje somos mais de 40 profissionais dedicados, operando 200+ pontos estratégicos em 15 cidades — com tecnologia de gestão e atendimento personalizado que fazem a diferença na sua campanha.
            </p>
          </div>

          {/* Stats grid */}
          <div className="flex-1 min-w-[300px] w-full grid grid-cols-2 gap-5">
            {STATS.map(({ n, label }) => (
              <div
                key={label}
                className="bg-white rounded-aurum p-8 border border-wine/8 shadow-aurum text-center"
              >
                <div className="font-fraunces font-semibold text-4xl sm:text-5xl bg-gold-grad bg-clip-text text-transparent leading-none mb-2.5">
                  {n}
                </div>
                <div className="font-inter text-xs sm:text-sm text-on-surface font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <h3 className="font-fraunces font-semibold text-2xl md:text-3xl text-charcoal mb-14 text-center">
            Nossa jornada
          </h3>

          <div className="relative overflow-x-auto pb-4 scrollbar-hide">
            {/* Linha dourada horizontal */}
            <div className="absolute top-[131px] left-0 right-0 h-[2px] bg-gold-grad z-0" />

            <div className="flex min-w-max relative z-10">
              {TIMELINE.map(({ year, event }, i) => {
                const isAbove = i % 2 === 0;
                const isLast  = i === TIMELINE.length - 1;

                return (
                  <div key={year} className="flex flex-col items-center min-w-[126px] px-1.5">
                    {/* Zona superior (100 px fixos) */}
                    <div className="h-[100px] flex flex-col justify-end items-center">
                      {isAbove && (
                        <div className="text-center max-w-[108px]">
                          <div className="w-6 h-[2px] bg-gold-grad mx-auto mb-2" />
                          <p className="font-inter text-[11.5px] leading-relaxed text-on-surface">{event}</p>
                        </div>
                      )}
                    </div>

                    {/* Conector superior → linha */}
                    <div className={`w-[1.5px] h-4 ${isAbove ? 'bg-wine/28' : 'bg-transparent'}`} />

                    {/* Badge do ano */}
                    <div
                      className={`relative z-20 rounded-[5px] px-3 py-1.5 font-inter font-bold text-xs sm:text-sm tracking-wide white-space-nowrap shadow-md ${
                        isLast
                          ? 'bg-gold-grad text-charcoal shadow-gold/50'
                          : 'bg-gradient-to-r from-wine to-[#c2302c] text-[#F9F7F2] shadow-wine/32'
                      }`}
                    >
                      {year}
                    </div>

                    {/* Conector linha → inferior */}
                    <div className={`w-[1.5px] h-4 ${!isAbove ? 'bg-wine/28' : 'bg-transparent'}`} />

                    {/* Zona inferior (100 px fixos) */}
                    <div className="h-[100px] flex flex-col justify-start items-center">
                      {!isAbove && (
                        <div className="text-center max-w-[108px]">
                          <div className="w-6 h-[2px] bg-gold-grad mx-auto mb-2 mt-2" />
                          <p className="font-inter text-[11.5px] leading-relaxed text-on-surface">{event}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mission / Vision / Responsibility */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ title, text, icon }) => (
              <div
                key={title}
                className="bg-white rounded-aurum p-11 border border-wine/7 shadow-aurum relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-grad" />
                <div className="text-4xl mb-5">{icon}</div>
                <h4 className="font-fraunces font-semibold text-2xl text-wine mb-4">{title}</h4>
                <p className="font-inter text-sm leading-relaxed text-on-surface">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="font-fraunces font-semibold text-2xl md:text-3xl text-charcoal mb-12 text-center">
            Equipe de liderança
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 max-w-3xl mx-auto w-full">
            {TEAM.map(({ name, role, photo }) => (
              <div
                key={name}
                className="bg-white rounded-aurum p-11 border border-wine/7 shadow-aurum text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-aurum-hv"
              >
                {/* Avatar */}
                <div className="relative w-22 h-22 rounded-full overflow-hidden mx-auto mb-6 border-[3px] border-wine/10 shadow-md">
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div className="font-fraunces font-semibold text-lg sm:text-xl text-charcoal mb-2">{name}</div>
                <div className="font-inter text-xs text-on-surface font-medium">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
