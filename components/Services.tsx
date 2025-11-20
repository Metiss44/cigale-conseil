
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: 'https://cigale.matisscottard.com/illustrations/icones-cigale-conseil/1.webp',
    title: "Création et lancement d'activité",
    subtitle: 'Premiers pas et structuration',
    price: '800 € HT (hors débours)',
    bullets: [
      'Choix du statut juridique',
      'Prévisionnel financier',
      'Démarches d\'immatriculation',
    ],
  },
  {
    icon: 'https://cigale.matisscottard.com/illustrations/icones-cigale-conseil/2.webp',
    title: 'Suivi comptable et fiscal',
    subtitle: 'Sécuriser la gestion au quotidien',
    price: '200 €/mois HT',
    bullets: [
      'Tenue de comptabilité',
      'Déclarations fiscales',
      'Bilan annuel',
    ],
  },
  {
    icon: 'https://cigale.matisscottard.com/illustrations/icones-cigale-conseil/3.webp',
    title: 'Conseil et stratégie',
    subtitle: 'Décisions éclairées pour grandir',
    price: '150 €/l\'heure HT',
    bullets: ['Optimisation fiscale', 'Analyse de rentabilité', 'Conseils en gestion'],
  },
  {
    icon: 'https://cigale.matisscottard.com/illustrations/icones-cigale-conseil/4.webp',
    title: 'Pilotage et outils',
    subtitle: 'Outils pour piloter votre activité',
    price: 'Sur devis',
    bullets: [
      'Mise en place de tableaux de bord',
      'Formation aux outils de gestion',
      'Suivi de trésorerie',
    ],
  },
  {
    icon: 'https://cigale.matisscottard.com/illustrations/icones-cigale-conseil/5.webp',
    title: 'Appel coaching',
    subtitle: '45min de visio',
    price: '80 € HT',
    bullets: [
      'Identifier la cause réelle du blocage et trouver des solutions concrètes',
      'Thèmes : compta / fisca / droit / gestion',
    ],
  },
];

export const Services: React.FC = () => {
  // Start with the middle service centered. Keep all 5 visible on desktop.
  const [order, setOrder] = useState<number[]>(() => [0, 1, 2, 3, 4]);
  const [activeCard, setActiveCard] = useState<number>(order[2]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Five-slot arrangement for desktop with center slot index 2 being focused.
  const desktopSlots = [
    { translateX: -480, translateY: 36, rotate: -10, scale: 0.86, zIndex: 12 },
    { translateX: -240, translateY: 12, rotate: -5, scale: 0.98, zIndex: 28 },
    { translateX: 0, translateY: 0, rotate: 0, scale: 1.12, zIndex: 64 }, // focused center
    { translateX: 240, translateY: 12, rotate: 5, scale: 0.98, zIndex: 28 },
    { translateX: 480, translateY: 36, rotate: 10, scale: 0.86, zIndex: 12 },
  ] as const;

  const focusCard = (index: number) => {
    setActiveCard(index);
    setOrder((prev) => {
      // Keep the middle position (index 2) as the primary focused slot.
      if (prev[2] === index) return prev;
      const next = [...prev];
      const clickedPos = prev.indexOf(index);
      if (clickedPos === -1) {
        // Edge-case: bring the clicked card into the focused slot
        next[2] = index;
        return next;
      }
      // Swap the clicked position with the focused slot (position 2)
      [next[clickedPos], next[2]] = [next[2], next[clickedPos]];
      return next;
    });
  };

  // Keep activeCard in sync when user scrolls on mobile
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let timeout: any;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const children = Array.from(el.querySelectorAll('[data-card-index]')) as HTMLElement[];
        const center = el.getBoundingClientRect().left + el.offsetWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        children.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const dist = Math.abs(r.left + r.width / 2 - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActiveCard(best);
      }, 120);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Services et accompagnements</h2>
          <p className="mt-4 text-lg text-brand-sage-gray">Des prestations sur-mesure pour sécuriser chaque étape de votre activité.</p>
        </div>

        {/* Desktop: 3-card fan / carousel */}
        <div className="hidden lg:block mt-14">
          <div className="relative h-[560px] max-w-7xl mx-auto perspective-800">
            {/* Left arrow */}
            <button
              onClick={() => focusCard((activeCard - 1 + services.length) % services.length)}
              aria-label="Précédent"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-md border border-brand-sage-light flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => focusCard((activeCard + 1) % services.length)}
              aria-label="Suivant"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white shadow-md border border-brand-sage-light flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronRight size={20} />
            </button>

            {services.map((svc, svcIndex) => {
              const slotIndex = order.indexOf(svcIndex);
              if (slotIndex === -1) return null;
              const slot = desktopSlots[slotIndex];
              const transform = `translate(-50%, -50%) translateX(${slot.translateX}px) translateY(${slot.translateY}px) rotate(${slot.rotate}deg) scale(${slot.scale})`;
              const isActive = svcIndex === activeCard;

              return (
                <div
                  key={svc.title}
                  className="absolute top-1/2 left-1/2 cursor-pointer"
                  style={{
                    transform,
                    zIndex: slot.zIndex,
                    transformOrigin: 'center bottom',
                    transition: 'transform 600ms cubic-bezier(0.2, 0, 0, 1)',
                  }}
                  onClick={() => focusCard(svcIndex)}
                >
                  <div className={`w-[340px] bg-white rounded-3xl border border-brand-sage-light/20 overflow-hidden ${isActive ? 'shadow-2xl ring-1 ring-brand-sage-light/30' : 'shadow-lg opacity-90'} transition-all duration-500`}>
                    <div className="pt-8 pb-4 flex items-center justify-center bg-gradient-to-b from-brand-cream/50 to-transparent">
                      <div className="relative">
                        <div className="absolute inset-0 bg-brand-sage-light/20 rounded-full blur-xl transform scale-110"></div>
                        <img src={svc.icon} alt="icon" className="relative w-24 h-24 object-contain drop-shadow-sm" />
                      </div>
                    </div>
                    <div className="px-8 pb-8 text-center">
                      <h3 className="text-2xl font-bold text-brand-sage-dark mb-2">{svc.title}</h3>
                      {svc.price && (
                        <div className="text-brand-blue-main font-bold text-lg mb-3 bg-brand-blue-main/5 py-1 px-4 rounded-full inline-block">{svc.price}</div>
                      )}
                      <p className="text-sm text-brand-sage-gray mb-6 leading-relaxed">{svc.subtitle}</p>
                      <ul className="text-left space-y-3 bg-brand-sage-light/10 p-4 rounded-2xl">
                        {svc.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-brand-sage-dark font-medium">
                            <span className="text-brand-blue-main mt-1">•</span>
                            <span className="text-brand-sage-gray/90">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => focusCard(i)}
                className={`h-3 rounded-full transition-all ${i === activeCard ? 'bg-brand-blue-main w-8' : 'bg-gray-300 w-3'}`}
                aria-label={`Aller à l'étape ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden mt-12">
          <div ref={scrollRef} className="overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 py-2">
            <div className="flex gap-4 pb-4 pt-2 items-stretch">
              {services.map((svc, i) => (
                <div key={i} data-card-index className="flex-shrink-0 w-[85vw] max-w-[380px] snap-center">
                  <div className="bg-white rounded-2xl border border-brand-sage-light p-6 shadow-lg h-full">
                    <div className="flex items-center justify-center mb-4">
                      <img src={svc.icon} alt="icon" className="w-24 h-24 object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-sage-dark mb-1 text-center">{svc.title}</h3>
                    {svc.price && <div className="text-brand-blue-main font-semibold text-base mb-2 text-center">{svc.price}</div>}
                    <p className="text-sm text-brand-sage-gray italic text-center mb-4">{svc.subtitle}</p>
                    <ul className="space-y-2 text-left">
                      {svc.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <span className="text-brand-sage-medium">•</span>
                          <span className="text-brand-sage-gray">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex justify-between items-center mt-6 px-4">
            <button
              onClick={() => {
                const newIndex = (activeCard - 1 + services.length) % services.length;
                focusCard(newIndex);
                const el = scrollRef.current;
                el?.querySelectorAll('[data-card-index]')[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
              className="w-12 h-12 rounded-full bg-brand-blue-main text-white flex items-center justify-center shadow-md hover:scale-105 hover:bg-brand-blue-soft transition"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {services.map((_, i) => (
                <div key={i} className={`${i === activeCard ? 'w-8 bg-brand-blue-main' : 'w-2 bg-gray-300'} h-2.5 rounded-full transition-all`} />
              ))}
            </div>

            <button
              onClick={() => {
                const newIndex = (activeCard + 1) % services.length;
                focusCard(newIndex);
                const el = scrollRef.current;
                el?.querySelectorAll('[data-card-index]')[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
              className="w-12 h-12 rounded-full bg-brand-blue-main text-white flex items-center justify-center shadow-md hover:scale-105 hover:bg-brand-blue-soft transition"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-800 { perspective: 800px; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};