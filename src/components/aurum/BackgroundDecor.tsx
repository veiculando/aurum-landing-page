import React from 'react';

const C = '#8a0009'; // wine fill para todos os elementos

/* ── Outdoor / Billboard ── */
function Billboard({ w = 360, h = 300 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 360 300" fill="none">
      {/* Painel principal */}
      <rect x="4" y="0" width="352" height="178" rx="7" fill={C} />
      {/* Moldura interna */}
      <rect x="14" y="10" width="332" height="158" rx="5" fill="white" fillOpacity="0.06" />
      {/* Trilho superior */}
      <rect x="4" y="0" width="352" height="9" rx="7" fill="white" fillOpacity="0.09" />
      {/* Trilho inferior */}
      <rect x="4" y="169" width="352" height="9" rx="0" fill="white" fillOpacity="0.06" />
      {/* Poste esquerdo */}
      <rect x="96" y="178" width="16" height="114" rx="3" fill={C} />
      {/* Poste direito */}
      <rect x="248" y="178" width="16" height="114" rx="3" fill={C} />
      {/* Pés */}
      <rect x="80"  y="288" width="48" height="12" rx="5" fill={C} />
      <rect x="232" y="288" width="48" height="12" rx="5" fill={C} />
    </svg>
  );
}

/* ── Front Light ── */
function FrontLight({ w = 260, h = 400 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 260 400" fill="none">
      {/* Suporte de topo */}
      <rect x="90" y="0" width="80" height="16" rx="4" fill={C} />
      <rect x="118" y="16" width="24" height="20" rx="3" fill={C} />
      {/* Caixa traseira / back panel */}
      <rect x="0" y="36" width="260" height="218" rx="7" fill={C} />
      {/* Face iluminada */}
      <rect x="8" y="44" width="244" height="200" rx="5" fill="white" fillOpacity="0.06" />
      {/* Calha inferior (caixa de luz) */}
      <path d="M0 254 L260 254 L248 298 L12 298 Z" fill={C} />
      {/* Detalhe fresta de luz */}
      <rect x="0" y="294" width="260" height="7" rx="2" fill="white" fillOpacity="0.1" />
      {/* Poste único */}
      <rect x="116" y="301" width="28" height="95" rx="4" fill={C} />
      {/* Base */}
      <ellipse cx="130" cy="398" rx="46" ry="8" fill={C} />
    </svg>
  );
}

/* ── Painel LED / Digital Totem ── */
function LedTotem({ w = 170, h = 460 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 170 460" fill="none">
      {/* Carcaça do painel */}
      <rect x="8" y="0" width="154" height="306" rx="10" fill={C} />
      {/* Tela */}
      <rect x="18" y="12" width="134" height="282" rx="7" fill="white" fillOpacity="0.06" />
      {/* Linhas de scan */}
      {[40, 80, 120, 160, 200, 240].map(y => (
        <rect key={y} x="18" y={y} width="134" height="1.5" fill="white" fillOpacity="0.05" />
      ))}
      {/* Braço de fixação */}
      <rect x="62" y="306" width="46" height="16" rx="4" fill={C} />
      {/* Poste */}
      <rect x="73" y="322" width="24" height="126" rx="4" fill={C} />
      {/* Base */}
      <rect x="34" y="442" width="102" height="18" rx="7" fill={C} />
    </svg>
  );
}

/* ── Relógio de Rua ── */
function StreetClock({ w = 210, h = 420 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 210 420" fill="none">
      {/* Aro externo */}
      <circle cx="105" cy="100" r="96" fill={C} />
      {/* Face do relógio */}
      <circle cx="105" cy="100" r="83" fill="white" fillOpacity="0.07" />
      {/* Marcadores de hora */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 - 90) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={105 + 67 * Math.cos(a)} y1={100 + 67 * Math.sin(a)}
            x2={105 + 76 * Math.cos(a)} y2={100 + 76 * Math.sin(a)}
            stroke="white" strokeWidth={i % 3 === 0 ? 4 : 2} strokeOpacity="0.18" strokeLinecap="round"
          />
        );
      })}
      {/* Ponteiros */}
      <line x1="105" y1="100" x2="105" y2="46" stroke="white" strokeWidth="5" strokeOpacity="0.18" strokeLinecap="round" />
      <line x1="105" y1="100" x2="148" y2="100" stroke="white" strokeWidth="3.5" strokeOpacity="0.18" strokeLinecap="round" />
      {/* Centro */}
      <circle cx="105" cy="100" r="6" fill="white" fillOpacity="0.2" />
      {/* Suporte inferior */}
      <rect x="94" y="196" width="22" height="14" rx="3" fill={C} />
      {/* Poste */}
      <rect x="97" y="210" width="16" height="196" rx="4" fill={C} />
      {/* Base */}
      <rect x="62" y="400" width="86" height="20" rx="8" fill={C} />
    </svg>
  );
}

/* ── Totem / Mobiliário Urbano ── */
function Totem({ w = 130, h = 380 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 130 380" fill="none">
      {/* Carcaça */}
      <rect x="10" y="0" width="110" height="310" rx="12" fill={C} />
      {/* Face A */}
      <rect x="20" y="12" width="90" height="136" rx="7" fill="white" fillOpacity="0.07" />
      {/* Divisória */}
      <rect x="10" y="152" width="110" height="6" rx="2" fill="white" fillOpacity="0.08" />
      {/* Face B */}
      <rect x="20" y="162" width="90" height="136" rx="7" fill="white" fillOpacity="0.07" />
      {/* Base / suporte */}
      <rect x="0" y="310" width="130" height="24" rx="8" fill={C} />
      {/* Rodapé */}
      <rect x="20" y="330" width="90" height="50" rx="6" fill={C} />
    </svg>
  );
}

/* ── Busdoor / Mídia Móvel ── */
function Busdoor({ w = 380, h = 160 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 380 160" fill="none">
      {/* Painel do busdoor */}
      <rect x="0" y="10" width="380" height="120" rx="6" fill={C} />
      {/* Área do anúncio */}
      <rect x="10" y="20" width="360" height="100" rx="4" fill="white" fillOpacity="0.06" />
      {/* Tira superior */}
      <rect x="0" y="10" width="380" height="8" rx="6" fill="white" fillOpacity="0.09" />
      {/* Tira inferior */}
      <rect x="0" y="122" width="380" height="8" rx="0" fill="white" fillOpacity="0.06" />
      {/* Clipes de fixação */}
      {[40, 160, 280, 340].map(x => (
        <rect key={x} x={x} y="0" width="18" height="10" rx="3" fill={C} />
      ))}
      {[40, 160, 280, 340].map(x => (
        <rect key={x} x={x} y="150" width="18" height="10" rx="3" fill={C} />
      ))}
    </svg>
  );
}

/* ── Componente principal ── */
export function BackgroundDecor() {
  const base: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 0,
  };

  return (
    <>
      {/* Outdoor — seção Formatos, direita */}
      <div style={{ ...base, top: 780, right: -90, opacity: 0.048, transform: 'rotate(4deg)' }}>
        <Billboard />
      </div>

      {/* Relógio de rua — seção Cobertura, esquerda */}
      <div style={{ ...base, top: 2080, left: -55, opacity: 0.042 }}>
        <StreetClock />
      </div>

      {/* Front Light — seção Depoimentos, direita */}
      <div style={{ ...base, top: 2900, right: -50, opacity: 0.04, transform: 'rotate(-3deg)' }}>
        <FrontLight />
      </div>

      {/* Totem — seção Sobre, esquerda */}
      <div style={{ ...base, top: 3850, left: 24, opacity: 0.044 }}>
        <Totem />
      </div>

      {/* LED Totem — seção CTA, direita */}
      <div style={{ ...base, top: 4900, right: 30, opacity: 0.042, transform: 'rotate(2deg)' }}>
        <LedTotem />
      </div>

      {/* Busdoor — seção Parceiros, esquerda */}
      <div style={{ ...base, top: 1540, left: -40, opacity: 0.038, transform: 'rotate(-1deg)' }}>
        <Busdoor />
      </div>

      {/* Outdoor pequeno — base da página */}
      <div style={{ ...base, top: 5600, left: 40, opacity: 0.04, transform: 'rotate(2deg)' }}>
        <Billboard w={220} h={185} />
      </div>
    </>
  );
}
