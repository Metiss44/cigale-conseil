"use client";

import React from 'react';

const partners = [
  { role: 'Assureur', name: 'AXA', url: 'https://agence.axa.fr/distributeur/0004596504' },
  { role: 'Gestionnaire de patrimoine', name: 'Finspira', url: '' },
  { role: 'Avocat', name: 'Maître Biot', url: 'https://biot-avocat.com/?utm_source=gmb' },
  { role: 'Commissaire aux comptes', name: 'Sophie Berthon', url: 'https://berthon-audit.fr/' },
  { role: 'Graphiste', name: 'Studio Pousse', url: 'https://studio-pousse.fr/' },
  { role: 'Site internet', name: 'Cigale Conseil (ce site)', url: '#' },
  { role: 'Gestionnaire de paiement', name: 'Conseil Expert Paie', url: 'https://www.conseilexpertpaie.fr/' },
];

export const Partners: React.FC = () => {
  return (
    <section id="partenaires" className="py-16 bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-sage-dark">Partenaires</h2>
          <p className="mt-2 text-sm text-brand-sage-gray">Collaborations de confiance — prestataires recommandés</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url || '#'}
              target={p.url ? '_blank' : undefined}
              rel={p.url ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 bg-white rounded-xl p-4 border border-brand-sage-light hover:shadow-lg transition"
            >
              <div className="w-16 h-16 bg-brand-sage-light rounded-md flex items-center justify-center overflow-hidden">
                {/* logo placeholder - upload logos later */}
                <span className="text-xs text-brand-sage-dark">Logo</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-sage-dark">{p.name}</div>
                <div className="text-xs text-brand-sage-gray">{p.role}</div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-4 text-xs text-center text-brand-sage-gray">Logos et visuels à venir — je les ajouterai dès que vous me les fournirez.</p>
      </div>
    </section>
  );
};

export default Partners;
