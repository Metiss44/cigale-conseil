
import React from 'react';

const values = [
    "Des valeurs communes",
    "Une vraie écoute",
    "Finie la phobie administrative",
    "Une vision au-delà du bilan",
    "Une expertise au long cours",
    "Des rendez-vous utiles et rassurants"
];

export const Values: React.FC = () => {
    return (
        <section className="bg-brand-sage-light py-20 md:py-28">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Une approche fondée sur la confiance</h2>
                <p className="mt-4 text-lg text-brand-sage-gray max-w-2xl mx-auto">
                    La comptabilité ne devrait pas être une source d'angoisse. Ensemble, nous la rendons claire, utile et rassurante.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    {values.map((value, index) => (
                        <div key={index} className="bg-brand-cream text-brand-sage-dark font-semibold py-3 px-6 rounded-full shadow-sm border border-brand-sage-light transition-transform duration-300 hover:scale-105">
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
