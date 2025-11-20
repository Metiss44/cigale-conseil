"use client";

import React from 'react';

const partners = [
  { role: 'Assureur', name: 'AXA', url: 'https://agence.axa.fr/distributeur/0004596504', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/axa.webp' },
  { role: 'Gestionnaire de patrimoine', name: 'Finspira', url: '', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/finspira.webp' },
  { role: 'Avocat', name: 'Maître Biot', url: 'https://biot-avocat.com/?utm_source=gmb', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/maitre-biot.webp' },
  { role: 'Commissaire aux comptes', name: 'Sophie Berthon', url: 'https://berthon-audit.fr/', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/berthon.webp' },
  { role: 'Graphiste', name: 'Studio Pousse', url: 'https://studio-pousse.fr/', logo: 'https://cigale.matisscottard.com/illustrations/partenaires/studio-pousse.webp' },
  { role: 'Site internet', name: 'Cigale Conseil (ce site)', url: '#', logo: '' },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto justify-center">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url || '#'}
              target={p.url ? '_blank' : undefined}
              rel={p.url ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center justify-center gap-3 bg-brand-sage-dark rounded-lg px-2 py-4 hover:bg-brand-sage-medium hover:shadow-md transition"
            >
              <div className="w-28 h-28 rounded-md flex items-center justify-center overflow-hidden p-2">
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logo} alt={`${p.name} logo`} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm text-white">Logo</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-white">{p.name}</div>
                <div className="text-[10px] text-brand-cream opacity-80">{p.role}</div>
              </div>
            </a>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Partners;
