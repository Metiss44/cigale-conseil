
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
                        <p className="font-medium text-brand-sage-gray mb-4 text-sm md:text-sm tracking-wide uppercase">Cabinet d'expertise comptable – Montpellier & France entière</p>
                        <p className="text-sm md:text-sm text-brand-blue-main font-semibold mb-4">Inscrite à l'Ordre des experts-comptables d'Occitanie</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-sage-dark leading-tight md:leading-[1.1] tracking-tight max-w-xl mx-auto lg:mx-0">
                            Expert comptable spécialisée dans l'accompagnement des sociétés engagées
                        </h1>
                        <p className="mt-6 md:mt-6 text-base md:text-lg text-brand-sage-gray max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Cigale Conseil accompagne les entrepreneurs, freelances et structures engagées avec une comptabilité claire, pédagogique et alignée avec leurs valeurs.
                        </p>
                        <div className="mt-8 md:mt-8 flex flex-col sm:flex-row gap-4 md:gap-4 items-center justify-center lg:justify-start w-full sm:w-auto px-4 sm:px-0">
                            <a href="#contact" className="w-full sm:w-auto bg-brand-blue-main text-white px-6 md:px-8 py-3 md:py-3 rounded-xl font-semibold text-base hover:bg-brand-blue-soft shadow-lg transition-all duration-300 transform hover:scale-105 flex justify-center">
                                Prendre RDV
                            </a>
                            <a href="#a-propos" className="w-full sm:w-auto bg-transparent border-2 border-brand-blue-main text-brand-blue-main px-6 md:px-8 py-3 md:py-3 rounded-xl font-semibold text-base hover:bg-brand-pink-soft/30 transition-colors duration-300 flex justify-center">
                                Découvrir mon approche
                            </a>
                        </div>
                    </div>

                    {/* Right side - Image shifted right (center on mobile) */}
                    <div className="relative mx-auto lg:ml-auto lg:mr-0 max-w-md perspective-1000">
                        <div className="relative z-10 bg-gradient-to-br from-brand-pink-soft to-brand-pink-medium/30 rounded-[2rem] p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700 ease-out hover:scale-[1.02]">
                            <img src="https://cigale.matisscottard.com/illustrations/photo-eva-1.webp" alt="Eva Perez, experte-comptable" className="rounded-[1.8rem] w-full h-auto object-cover shadow-inner" />
                        </div>
                        {/* Decorative elements behind */}
                        <div className="absolute top-10 -right-6 w-full h-full bg-brand-sage-light/30 rounded-[2rem] -z-10 rotate-6" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-blue-main/10 rounded-full blur-2xl -z-10" />

                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-white/40 px-6 py-3 rounded-2xl shadow-xl text-sm text-brand-sage-dark font-medium whitespace-nowrap z-20">
                            Eva Perez – Experte-comptable
                        </div>
                    </div>
                </div>

                {/* Pillars section - Improved design with animation */}
                <div className={`mt-24 md:mt-32 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}>
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
