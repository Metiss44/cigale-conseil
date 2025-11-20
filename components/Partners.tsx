"use client";

import React from 'react';

const partners = [
  { role: 'Assureur', name: 'AXA', url: 'https://agence.axa.fr/distributeur/0004596504', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/axa.webp' },
  { role: 'Gestionnaire de patrimoine', name: 'Finspira', url: '', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/finspira.webp' },
  { role: 'Avocat', name: 'Maître Biot', url: 'https://biot-avocat.com/?utm_source=gmb', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/maitre-biot.webp' },
  { role: 'Commissaire aux comptes', name: 'Sophie Berthon', url: 'https://berthon-audit.fr/', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/berthon.webp' },
  { role: 'Graphiste', name: 'Studio Pousse', url: 'https://studio-pousse.fr/', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/studio-pousse.webp' },
  { role: 'Web designer', name: 'Matiss Cottard', url: 'https://matisscottard.com', logo: 'https://cdn.matisscottard.com/photos-equipe/photo-matiss-equipe.webp' },
  { role: 'Gestionnaire de paiement', name: 'Conseil Expert Paie', url: 'https://www.conseilexpertpaie.fr/', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/conseil-expert.webp' },
];

export const Partners: React.FC = () => {
  return (
    <section id="partenaires" className="py-16 bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-sage-dark">Partenaires</h2>
          <p className="mt-2 text-sm text-brand-sage-gray">Collaborations de confiance — prestataires recommandés</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:flex-wrap md:justify-center md:gap-8 max-w-5xl mx-auto">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url || '#'}
              target={p.url ? '_blank' : undefined}
              rel={p.url ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center justify-center gap-2 md:gap-3 p-2 md:p-4 transition-transform hover:scale-105"
            >
              <div className={`w-24 h-24 md:w-28 md:h-28 flex items-center justify-center overflow-hidden ${p.name === 'Matiss Cottard' ? 'p-3 md:p-2' : 'p-2'}`}>
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className={`w-full h-full transition-all duration-300 ${p.name === 'Matiss Cottard' ? 'object-cover rounded-full shadow-sm' : 'object-contain'}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm text-brand-sage-dark">Logo</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-brand-sage-dark">{p.name}</div>
                <div className="text-[10px] text-brand-sage-gray">{p.role}</div>
              </div>
            </a>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Partners;
