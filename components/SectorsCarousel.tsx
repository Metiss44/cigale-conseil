"use client";

import React from 'react';

const sectors = [
  { key: 'restaurants', title: 'Restaurants' },
  { key: 'consultants', title: 'Consultants' },
  { key: 'associations', title: 'Associations' },
  { key: 'commercants', title: 'Commerçants' },
  { key: 'artisans', title: 'Artisans' },
  { key: 'prestataires', title: 'Prestataires de services' },
];

export const SectorsCarousel: React.FC = () => {
  return (
    <section aria-hidden="true" id="sectors" className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-sage-dark">Secteurs d'activité</h2>
          <p className="mt-2 text-sm text-brand-sage-gray">Exemples de métiers — aperçu rapide</p>
        </div>

        {/* Full-bleed auto-scrolling strip (no boxed background) */}
        <div className="w-full">
          <div className="sectors-carousel overflow-hidden">
            {/* track: duplicated content for seamless loop */}
            <div className="sectors-track pointer-events-none">
            {Array.from({ length: 2 }).map((_, rep) => (
              <div key={rep} className="sectors-group flex items-stretch gap-6 px-6 py-8">
                {sectors.map((s) => (
                  <div key={s.key + rep} className="sector-card flex-shrink-0 w-56 md:w-64 lg:w-72">
                    <div className="h-36 md:h-40 flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-sage-light to-brand-cream shadow-sm mx-2">
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <rect x="1" y="1" width="22" height="22" rx="6" fill="white" opacity="0.06" />
                        <circle cx="12" cy="8" r="3" stroke="#6B7280" strokeWidth="1.2" />
                        <path d="M4 20c1.333-3 6-4 8-4s6.667 1 8 4" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-sm md:text-base font-semibold text-brand-sage-dark">{s.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorsCarousel;
