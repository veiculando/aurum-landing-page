import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

const STATIC_LINKS = {
  'Formatos': ['Outdoor', 'Relógio de Rua', 'Painéis Digitais', 'Totem & Mobiliário', 'Busdoor', 'Front Light'],
  'Região': ['São José dos Campos', 'Taubaté', 'Jacareí', 'Caraguatatuba', 'Ubatuba', 'São Sebastião'],
};

// Cruzamento com o App WL (app.aurumooh.com.br). Rotas confirmadas em
// Veiculando.WhiteLabel.App/src/app/app.routes.ts — só linka o que existe
// hoje. "Minhas Campanhas" não tem rota ainda (Sprint 11.5 do App WL) e
// Preços/Cases/Blog/Ajuda/Minha Conta/Termos/Privacidade não têm página em
// nenhum dos dois produtos — omitidos em vez de apontar para link morto.
const EMPRESA_LINKS = [
  { label: 'Catálogo', href: 'https://app.aurumooh.com.br/mapa' },
  { label: 'Como Funciona', href: '#contato' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
  // Texto descritivo pendente do cliente (cortado no PDF) — link entra só com o rótulo.
  { label: 'Alugue seu imóvel', href: 'https://aurumooh.com.br/locacoes.php' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#5e0f1a] overflow-hidden">
      {/* Gold accent top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-grad" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top area */}
        <div className="pt-20 pb-16 border-b border-paper/8">
          <div className="flex flex-wrap gap-16 justify-between">
            {/* Logo + contact */}
            <div className="flex-1 min-w-[280px] max-w-[340px]">
              {/* Big logo */}
              <div className="mb-7">
                <Image
                  src="/image-7.png"
                  alt="aurum OOH"
                  width={200}
                  height={90}
                  className="h-[90px] w-auto block filter drop-shadow-[0_2px_12px_rgba(217,180,66,0.3)]"
                />
              </div>

              <p className="font-inter text-sm leading-relaxed text-paper/55 mb-9">
                A maior rede de mídia exterior do Vale do Paraíba e Litoral Norte de São Paulo. Presença estratégica onde seu cliente está desde 1995.
              </p>

              {/* Contact info */}
              <div className="flex flex-col gap-3.5">
                {[
                  { Icon: Phone, text: '(11) 94477-4353' },
                  { Icon: Mail,  text: 'comercial@aurumooh.com.br' },
                  { Icon: MapPin,text: 'Rua Francelino Rodrigues, 178 - Vl São Sebastião - Mogi das Cruzes' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/12 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-gold" />
                    </div>
                    <span className="font-inter text-sm text-paper/65">{text}</span>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-3 mt-8">
                {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-paper/7 border border-paper/10 flex items-center justify-center text-paper/50 transition-all duration-200 hover:bg-gold/18 hover:text-gold hover:border-gold/30 no-underline"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(STATIC_LINKS).map(([title, items]) => (
              <div key={title} className="flex-1 min-w-[160px]">
                <h5 className="font-fraunces font-semibold text-base text-paper mb-6 tracking-wide">{title}</h5>
                <ul className="list-none flex flex-col gap-3 p-0 m-0">
                  {items.map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="font-inter text-sm text-paper/50 no-underline transition-colors duration-200 hover:text-gold"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Empresa: âncoras da própria landing + cruzamento com o App WL */}
            <div className="flex-1 min-w-[160px]">
              <h5 className="font-fraunces font-semibold text-base text-paper mb-6 tracking-wide">Empresa</h5>
              <ul className="list-none flex flex-col gap-3 p-0 m-0">
                {EMPRESA_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-inter text-sm text-paper/50 no-underline transition-colors duration-200 hover:text-gold"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-7 flex flex-wrap items-center justify-between gap-3">
          <span className="font-inter text-[13px] text-paper/35">
            © {new Date().getFullYear()} aurum OOH Mídia Exterior. Todos os direitos reservados.
          </span>
          <div className="flex gap-6">
            {['Termos de uso', 'Privacidade', 'Cookies'].map(t => (
              <a
                key={t}
                href="#"
                className="font-inter text-xs text-paper/30 no-underline transition-colors duration-200 hover:text-gold"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
