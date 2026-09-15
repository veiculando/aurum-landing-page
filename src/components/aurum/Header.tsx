"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { APP_LINK, CONTACT_LINK, EXTERNAL_LINK_PROPS } from '@/lib/site-links';

const NAV = [
  { label: 'Início', href: '#inicio' },
  { label: 'Catálogo', href: '#cobertura' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: CONTACT_LINK },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV.map(n => (n.href.startsWith('#') ? document.querySelector(n.href) : null));
      let current = '';
      sections.forEach((el, i) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section is near the top of the viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = NAV[i].label;
          }
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once initially
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-wine border-b border-gold/10 shadow-[0_4px_32px_rgba(0,0,0,0.35)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-[76px] gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <Image
            src="/image-1.png"
            alt="aurum OOH"
            width={150}
            height={58}
            className="h-[58px] w-auto block filter drop-shadow-[0_2px_10px_rgba(217,180,66,0.4)]"
            priority
          />
        </a>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center ml-auto gap-2">
          {NAV.map(({ label, href }) => {
            const isActive = active === label;
            const isExternal = href.startsWith('http');
            return (
              <a
                key={label}
                href={href}
                {...(isExternal ? EXTERNAL_LINK_PROPS : {})}
                className={`font-inter text-sm transition-colors duration-200 px-4 py-2 relative border-b-2 pb-1.5 ${isActive
                    ? 'font-semibold border-gold text-gold'
                    : 'font-medium border-transparent text-paper/78 hover:text-gold-light'
                  }`}
              >
                {label}
              </a>
            );
          })}

          {/* Separator */}
          <div className="w-px h-5 bg-gold/20 mx-4" />

          {/* CTA */}
          <a
            href={APP_LINK}
            {...EXTERNAL_LINK_PROPS}
            className="inline-flex items-center bg-gold-grad text-charcoal font-inter text-[13px] font-bold tracking-wider uppercase py-[11px] px-[26px] rounded-full shadow-[0_4px_18px_rgba(217,180,66,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(217,180,66,0.58)] shrink-0"
          >
            Anuncie
          </a>
        </nav>

        {/* Hamburger mobile */}
        <button
          className="md:hidden text-paper p-2 flex items-center justify-center cursor-pointer hover:text-gold transition-colors duration-200"
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-wine-dark border-t border-gold/12 px-6 py-4 pb-6 flex flex-col gap-1 transition-all duration-300">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith('http') ? EXTERNAL_LINK_PROPS : {})}
              onClick={() => setOpen(false)}
              className="block py-3 px-1 font-inter text-base font-medium text-paper/85 border-b border-gold/8 hover:text-gold transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href={APP_LINK}
            {...EXTERNAL_LINK_PROPS}
            onClick={() => setOpen(false)}
            className="block mt-5 text-center bg-gold-grad text-charcoal font-inter text-sm font-bold tracking-wider uppercase py-4 px-7 rounded-full shadow-[0_4px_18px_rgba(217,180,66,0.38)]"
          >
            Anuncie
          </a>
        </div>
      )}
    </header>
  );
}
