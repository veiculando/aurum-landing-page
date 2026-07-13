"use client";

import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ── Canvas: perspectiva de avenida noturna com carros em movimento ── */
function HighwayCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    interface Car {
      t: number;       // 0 = vanishing point (far), 1 = bottom (near)
      dir: 1 | -1;     // 1 = incoming (headlights), -1 = outgoing (taillights)
      speed: number;
      bright: number;
    }

    const N = 40;
    const cars: Car[] = Array.from({ length: N }, (_, i) => ({
      t:      Math.random(),
      dir:    (i < N / 2 ? 1 : -1) as 1 | -1,
      speed:  0.0025 + Math.random() * 0.006,
      bright: 0.6 + Math.random() * 0.4,
    }));

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);

      /* ── Background: dark charcoal sky ── */
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0,    '#06060e');
      bg.addColorStop(0.45, '#0a0a14');
      bg.addColorStop(1,    '#0e0e18');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      /* ── Stars / bokeh de luz urbana no "céu" ── */
      for (let i = 0; i < 60; i++) {
        const sx   = (Math.sin(i * 137.5) * 0.5 + 0.5) * w;
        const sy   = (Math.cos(i * 97.3)  * 0.5 + 0.5) * h * 0.38;
        const sr   = 0.5 + Math.abs(Math.sin(i * 53)) * 1.2;
        const sa   = 0.1 + Math.abs(Math.cos(i * 71)) * 0.25;
        ctx.fillStyle = `rgba(255,240,200,${sa})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }

      const vpX   = w / 2;
      const vpY   = h * 0.40;
      const roadW = w * 0.50; // metade da largura da pista no fundo

      /* ── Pista ── */
      ctx.beginPath();
      ctx.moveTo(vpX, vpY);
      ctx.lineTo(vpX - roadW, h);
      ctx.lineTo(vpX + roadW, h);
      ctx.closePath();
      const roadGrad = ctx.createLinearGradient(0, vpY, 0, h);
      roadGrad.addColorStop(0, '#131320');
      roadGrad.addColorStop(1, '#0b0b12');
      ctx.fillStyle = roadGrad;
      ctx.fill();

      /* ── Calçadas laterais ── */
      ctx.beginPath();
      ctx.moveTo(vpX - roadW * 0.01, vpY);
      ctx.lineTo(0, h);
      ctx.lineTo(vpX - roadW, h);
      ctx.closePath();
      ctx.fillStyle = '#0d0d16';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(vpX + roadW * 0.01, vpY);
      ctx.lineTo(w, h);
      ctx.lineTo(vpX + roadW, h);
      ctx.closePath();
      ctx.fillStyle = '#0d0d16';
      ctx.fill();

      /* ── Poste de luz: claridade ambiente ── */
      const poleGlow = (px: number) => {
        const gl = ctx.createRadialGradient(px, vpY + (h - vpY) * 0.05, 0, px, vpY + (h - vpY) * 0.05, w * 0.18);
        gl.addColorStop(0, 'rgba(255,210,120,0.09)');
        gl.addColorStop(1, 'rgba(255,180,80,0)');
        ctx.fillStyle = gl;
        ctx.fillRect(0, 0, w, h);
      };
      poleGlow(vpX - roadW * 0.65);
      poleGlow(vpX + roadW * 0.65);

      /* ── Faixa central (tracejada em perspectiva) ── */
      for (let i = 0; i < 16; i++) {
        const t0 = i       / 16;
        const t1 = (i + 0.5) / 16;
        const y0 = vpY + (h - vpY) * t0;
        const y1 = vpY + (h - vpY) * t1;
        const ww = t0 * 3.5 + 0.4;
        ctx.fillStyle = `rgba(255,255,160,${0.07 + t0 * 0.09})`;
        ctx.fillRect(vpX - ww / 2, y0, ww, y1 - y0);
      }

      /* ── Carros (fundo → frente) ── */
      const sorted = [...cars].sort((a, b) => a.t - b.t);

      for (const car of sorted) {
        const t    = car.t;
        const y    = vpY + (h - vpY) * t;
        const span = roadW * t;
        const cx   = car.dir === 1
          ? vpX + span * 0.30   // faixa direita (vem de frente → faróis)
          : vpX - span * 0.30;  // faixa esquerda (vai embora → lanternas)
        const sz = 1.8 + t * 24;

        if (car.dir === 1) {
          /* faróis — branco quente */
          for (const dx of [-sz * 0.65, sz * 0.65]) {
            const gx = cx + dx;
            const gl = ctx.createRadialGradient(gx, y, 0, gx, y, sz * 2.6);
            gl.addColorStop(0,   `rgba(255,252,215,${car.bright})`);
            gl.addColorStop(0.2, `rgba(255,240,155,${car.bright * 0.5})`);
            gl.addColorStop(1,   'rgba(255,200,80,0)');
            ctx.fillStyle = gl;
            ctx.beginPath();
            ctx.ellipse(gx, y, sz * 2.6, sz * 1.3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255,255,240,${car.bright})`;
            ctx.beginPath();
            ctx.arc(gx, y, Math.max(0.5, sz * 0.3), 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          /* lanternas — vermelho */
          for (const dx of [-sz * 0.55, sz * 0.55]) {
            const gx = cx + dx;
            const gl = ctx.createRadialGradient(gx, y, 0, gx, y, sz * 2.0);
            gl.addColorStop(0,   `rgba(255,35,10,${car.bright * 0.95})`);
            gl.addColorStop(0.3, `rgba(200,10,5,${car.bright * 0.4})`);
            gl.addColorStop(1,   'rgba(100,0,0,0)');
            ctx.fillStyle = gl;
            ctx.beginPath();
            ctx.ellipse(gx, y, sz * 2.0, sz * 1.1, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255,48,20,${car.bright})`;
            ctx.beginPath();
            ctx.arc(gx, y, Math.max(0.4, sz * 0.27), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      /* ── Fade horizon ── */
      const hFade = ctx.createLinearGradient(0, 0, 0, vpY + h * 0.08);
      hFade.addColorStop(0, 'rgba(6,6,14,1)');
      hFade.addColorStop(1, 'rgba(6,6,14,0)');
      ctx.fillStyle = hFade;
      ctx.fillRect(0, 0, w, vpY + h * 0.08);

      /* ── Vinheta ── */
      const vig = ctx.createRadialGradient(w / 2, h * 0.55, h * 0.08, w / 2, h * 0.5, h * 0.85);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(0,0,0,0.62)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
    };

    const tick = () => {
      for (const car of cars) {
        car.t += car.speed;
        if (car.t > 1) car.t = 0;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('resize', setSize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', setSize); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full block"
    />
  );
}

/* ── Métricas do hero ── */
const METRICS = [
  { value: '31',   unit: 'anos',    label: 'de experiência' },
  { value: '15+',  unit: 'cidades', label: 'no Vale e Litoral' },
  { value: '200+', unit: 'pontos',  label: 'estratégicos' },
];

export function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-center bg-[#06060e]">
      {/* Vídeo / canvas de avenida */}
      <HighwayCanvas />

      {/* Máscara escura neutra */}
      <div className="absolute inset-0 z-1 bg-gradient-to-br from-black/55 via-[#0a0a12]/38 to-black/62 pointer-events-none" />

      {/* Gold accent top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-grad z-10" />

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:pb-24 relative z-20 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-9">
          <div className="w-11 h-[1.5px] bg-gold-grad shrink-0" />
          <span className="font-inter text-xs font-bold tracking-widest uppercase text-gold">
            Mídia exterior desde 1995
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-fraunces font-semibold text-[38px] sm:text-[48px] md:text-[74px] leading-[1.07] tracking-tight text-paper max-w-3xl mb-8">
          Conectando marcas<br />
          <span className="bg-gold-grad bg-clip-text text-transparent">
            ao seu público
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-base sm:text-lg md:text-xl leading-relaxed text-paper/72 max-w-xl mb-14">
          A maior rede de mídia Out of Home do Vale do Paraíba e Litoral Norte de São Paulo — presença estratégica onde seu cliente está, com 31 anos de experiência.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-20">
          <a
            href="#contato"
            className="inline-flex items-center gap-2.5 bg-wine-grad text-[#F9F7F2] font-inter text-sm font-bold tracking-wider uppercase py-4.5 px-9.5 rounded-full shadow-[0_6px_32px_rgba(138,0,9,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(138,0,9,0.62)]"
          >
            Anuncie agora <ArrowRight size={16} />
          </a>
          <a
            href="#formatos"
            className="inline-flex items-center gap-2.5 bg-transparent text-paper font-inter text-sm font-semibold tracking-wider uppercase py-4.5 px-9.5 rounded-full border border-paper/28 transition-all duration-200 hover:border-gold hover:text-gold"
          >
            Ver formatos
          </a>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap border-t border-paper/10 pt-13 gap-y-6">
          {METRICS.map((m, i) => (
            <div
              key={i}
              className={`flex-1 min-w-[140px] pb-4 ${
                i < 2 ? 'md:pr-12 md:mr-12 md:border-r border-paper/10' : ''
              }`}
            >
              <div className="flex items-baseline gap-2.5 mb-2">
                <span className="font-fraunces font-semibold text-3xl sm:text-4xl md:text-5xl bg-gold-grad bg-clip-text text-transparent">
                  {m.value}
                </span>
                <span className="font-inter text-xs font-semibold text-gold/72 uppercase tracking-wider">
                  {m.unit}
                </span>
              </div>
              <p className="font-inter text-[13px] text-paper/50 tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-45 z-20">
        <span className="font-inter text-[11px] tracking-widest uppercase text-paper">Scroll</span>
        <ChevronDown size={18} className="text-paper animate-[heroScroll_2s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes heroScroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(7px); }
        }
      `}</style>
    </section>
  );
}
