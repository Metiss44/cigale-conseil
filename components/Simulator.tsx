import React from 'react';

export const Simulator: React.FC = () => {
    return (
        <section id="simulateur" className="container mx-auto px-6 py-20 md:py-28">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Simulateur de revenus pour auto-entrepreneur</h2>
                <p className="mt-4 text-lg text-brand-sage-gray">
                    Utilisez le simulateur officiel de l'Urssaf pour estimer vos cotisations et votre revenu net. Un outil essentiel pour piloter votre activité en toute transparence.
                </p>
            </div>
            <div className="mt-12 max-w-5xl mx-auto bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <iframe
                    src="https://mon-entreprise.urssaf.fr/simulateurs/auto-entrepreneur?iframe=1"
                    className="w-full h-[900px] border-0"
                    title="Simulateur de revenus auto-entrepreneur Urssaf"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
};
