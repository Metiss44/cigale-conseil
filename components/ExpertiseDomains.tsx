'use client';

import React, { useEffect, useState } from 'react';
import { Building, Palette, LineChart } from 'lucide-react';

const pillars = [
    {
        icon: <Building className="text-brand-blue-main" />,
        title: "Gestion d'entreprise",
        text: "Accompagnement de structures avec une maîtrise de modèles économiques complexes, et des montages financiers spécifiques."
    },
    {
        icon: <Palette className="text-brand-orange" />,
        title: "Approche pédagogique",
        text: "Approche pédagogique qui rend la comptabilité claire, accessible et intuitive, afin que chacun puisse comprendre et piloter sereinement son activité."
    },
    {
        icon: <LineChart className="text-brand-orange" />,
        title: "Stratégie d'entreprise",
        text: "Accompagnement de groupes et sociétés à forts enjeux (énergies renouvelables, etc.) avec une approche stratégique de la fiscalité et du pilotage."
    }
];

export const ExpertiseDomains: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {/* Title for expertise items */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark mb-4">Mes domaines d'expertise</h2>
                        <p className="text-lg text-brand-sage-gray/90 max-w-2xl mx-auto">Un savoir-faire pointu pour les secteurs qui ont du sens et des défis uniques.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {pillars.map((pillar, index) => (
                            <div
                                key={pillar.title}
                                className="group flex flex-col items-start text-left p-8 rounded-3xl bg-white border border-brand-sage-light/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                                style={{
                                    transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                                }}
                            >
                                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-sage-light/30 text-brand-blue-main mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {React.cloneElement(pillar.icon as React.ReactElement, { size: 28, strokeWidth: 1.5 })}
                                </div>
                                <h3 className="text-xl font-bold text-brand-sage-dark mb-3 group-hover:text-brand-blue-main transition-colors">
                                    {pillar.title}
                                </h3>
                                <p className="text-brand-sage-gray leading-relaxed">
                                    {pillar.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
