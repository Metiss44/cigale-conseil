"use client";

import React from 'react';

const sectors = [
  { key: 'restaurants', title: 'Restaurants', img: 'https://cdn.cigaleconseil.fr/illustrations/metiers/restaurant.webp' },
  { key: 'consultants', title: 'Consultants', img: 'https://cdn.cigaleconseil.fr/illustrations/metiers/consultant.webp' },
  { key: 'associations', title: 'Associations', img: 'https://cdn.cigaleconseil.fr/illustrations/metiers/association.webp' },
  { key: 'commercants', title: 'Commerçants', img: 'https://cdn.cigaleconseil.fr/illustrations/metiers/commercant.webp' },
  { key: 'artisans', title: 'Artisans', img: 'https://cdn.cigaleconseil.fr/illustrations/metiers/artisan.webp' },
  { key: 'prestataires', title: 'Prestataires de services', img: 'https://cdn.cigaleconseil.fr/illustrations/metiers/prestataire.webp' },
];

export const SectorsCarousel: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastScrollLeft = el.scrollLeft;

    const animate = () => {
      if (!isPaused && el) {
        // Auto-scroll speed
        el.scrollLeft += 0.8;

        // Infinite loop logic
        // We assume the first group (half the content) is what we loop over
        // We need to know the width of one group. 
        // Since we have 2 identical groups, if scrollLeft >= scrollWidth / 2, we reset to 0.
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <section id="sectors" className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-sage-dark">Secteurs d'activité</h2>
        </div>

        {/* Full-bleed auto-scrolling strip */}
        <div className="w-full">
          <div
            ref={scrollRef}
            className="sectors-carousel overflow-x-auto flex"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => {
              // Resume after a short delay to allow momentum scrolling to finish if any
              setTimeout(() => setIsPaused(false), 2000);
            }}
          >
            {/* track: duplicated content for seamless loop */}
            <div className="sectors-track">
              {Array.from({ length: 2 }).map((_, rep) => (
                <div key={rep} className="sectors-group flex items-stretch">
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
