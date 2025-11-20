
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
        icon: <Palette className="text-brand-blue-main" />,
        title: "Approche pédagogique",
        text: "Approche pédagogique qui rend la comptabilité claire, accessible et intuitive, afin que chacun puisse comprendre et piloter sereinement son activité."
    },
    {
        icon: <LineChart className="text-brand-blue-main" />,
        title: "Stratégie d'entreprise",
        text: "Accompagnement de groupes et sociétés à forts enjeux (énergies renouvelables, etc.) avec une approche stratégique de la fiscalité et du pilotage."
    }
];

export const Hero: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);
    return (
        <section id="accueil" className="pt-32 md:pt-36 pb-12 md:pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left side - Text content, aligned with menu (center on mobile) */}
                    <div className="lg:pr-8 text-center lg:text-left">
                        <p className="font-medium text-brand-sage-gray mb-3 text-xs md:text-sm">Cabinet d'expertise comptable – Montpellier & France entière</p>
                        <p className="text-xs md:text-sm text-brand-blue-main font-medium">Inscrite à l'Ordre des experts-comptables d'Occitanie</p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-sage-dark leading-tight max-w-lg mx-auto lg:mx-0">
                            Expert comptable spécialisée dans l'accompagnement des sociétés engagées
                        </h1>
                        <p className="mt-5 md:mt-6 text-base md:text-lg text-brand-sage-gray max-w-lg mx-auto lg:mx-0">
                            Cigale Conseil accompagne les entrepreneurs, freelances et structures engagées avec une comptabilité claire, pédagogique et alignée avec leurs valeurs.
                        </p>
                        <div className="mt-7 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center lg:justify-start">
                            <a href="#contact" className="bg-brand-blue-main text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-brand-blue-soft shadow-lg transition-all duration-300 transform hover:scale-105">
                                Prendre RDV
                            </a>
                            <a href="#a-propos" className="bg-transparent border-2 border-brand-blue-main text-brand-blue-main px-6 md:px-8 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-brand-pink-soft/30 transition-colors duration-300">
                                Découvrir mon approche
                            </a>
                        </div>
                    </div>

                    {/* Right side - Image shifted right (center on mobile) */}
                    <div className="relative mx-auto lg:ml-auto lg:mr-0 max-w-md">
                        <div className="bg-gradient-to-br from-brand-pink-soft to-brand-pink-medium/30 rounded-2xl p-3 md:p-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                             <img src="https://cigale.matisscottard.com/illustrations/photo-eva-1.webp" alt="Eva Perez, experte-comptable" className="rounded-xl w-full h-auto" />
                        </div>
                        <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:-left-4 md:translate-x-0 bg-brand-pink-soft border border-brand-pink-medium px-3 md:px-4 py-1 md:py-2 rounded-xl shadow-md text-xs md:text-sm text-brand-sage-dark font-semibold">
                            Eva Perez – Experte-comptable diplômée
                        </div>
                    </div>
                </div>

                {/* Pillars section - Improved design with animation */}
                <div className={`mt-20 md:mt-24 max-w-6xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                    <div className="bg-gradient-to-br from-brand-sage-light/40 via-brand-cream/30 to-brand-sage-light/40 rounded-2xl p-8 md:p-12 shadow-xl border border-brand-sage-light/50 backdrop-blur-sm">
                        {/* Title for expertise items (moved here) */}
                        <div className="text-center max-w-3xl mx-auto mb-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Mes domaines d'expertise</h2>
                            <p className="mt-3 text-lg text-brand-sage-gray">Un savoir-faire pointu pour les secteurs qui ont du sens et des défis uniques.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                            {pillars.map((pillar, index) => (
                                <div 
                                    key={pillar.title} 
                                    className="flex flex-col items-center text-center transition-all duration-700 hover:scale-105"
                                    style={{
                                        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                                    }}
                                >
                                    <div className="bg-white p-5 rounded-2xl mb-4 shadow-md border border-brand-sage-light/30 group-hover:shadow-lg transition-all duration-300">
                                        <div className="w-8 h-8 flex items-center justify-center">
                                            {pillar.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-brand-sage-dark mb-2">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-brand-sage-gray leading-relaxed max-w-xs">
                                        {pillar.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
