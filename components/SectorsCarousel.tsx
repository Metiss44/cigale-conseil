"use client";

import React from 'react';

const sectors = [
  { key: 'restaurants', title: 'Restaurants', img: 'https://cigale.matisscottard.com/illustrations/metiers/restaurant.webp' },
  { key: 'consultants', title: 'Consultants', img: 'https://cigale.matisscottard.com/illustrations/metiers/consultant.webp' },
  { key: 'associations', title: 'Associations', img: 'https://cigale.matisscottard.com/illustrations/metiers/association.webp' },
  { key: 'commercants', title: 'Commerçants', img: 'https://cigale.matisscottard.com/illustrations/metiers/commercant.webp' },
  { key: 'artisans', title: 'Artisans', img: 'https://cigale.matisscottard.com/illustrations/metiers/artisan.webp' },
  { key: 'prestataires', title: 'Prestataires de services', img: 'https://cigale.matisscottard.com/illustrations/metiers/prestataire.webp' },
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
                    <div className="h-36 md:h-40 flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-sage-light to-brand-cream shadow-sm overflow-hidden mx-2">
                      <img src={s.img} alt={`${s.title} illustration`} className="w-28 h-28 md:w-32 md:h-32 object-contain" />
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
