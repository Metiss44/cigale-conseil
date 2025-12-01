'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

export const Contact: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Load Calendly script
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section id="contact" className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Contact et rendez-vous</h2>
                    <p className="mt-4 text-lg text-brand-sage-gray">
                        Prête à discuter de votre projet ? Contactez-moi ou réservez directement un créneau pour un premier échange gratuit.
                    </p>
                </div>
                <div className="mt-16 grid lg:grid-cols-2 gap-12">
                    <div className="bg-brand-sage-light p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold text-brand-sage-dark mb-6">Mes coordonnées</h3>
                        <ul className="space-y-4 text-brand-sage-dark">
                            <li className="flex items-center"><Phone className="text-brand-orange mr-4" /> 06.68.85.00.35</li>
                            <li className="flex items-center"><Mail className="text-brand-blue-main mr-4" /> e.perez@cigaleconseil.fr</li>
                            <li className="flex items-center"><MapPin className="text-brand-orange mr-4" /> 215 rue du comté de Melgueil, 34000 Montpellier</li>
                            <li className="flex items-center"><Linkedin className="text-brand-blue-main mr-4" /> <a href="https://www.linkedin.com/in/eva-perez-a62b6a138/" target="_blank" rel="noopener noreferrer" className="hover:underline">Profil LinkedIn</a></li>
                            <li className="mt-2 text-sm text-brand-sage-dark">
                                <strong className="text-brand-blue-main">Inscrite à l'Ordre des experts-comptables d'Occitanie</strong>
                            </li>
                        </ul>
                        {mounted && (
                            <form className="mt-8 space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Prénom" className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft" />
                                    <input type="text" placeholder="Nom" className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft" />
                                </div>
                                <input type="email" placeholder="Email" className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft" />
                                <input type="text" placeholder="Type de structure" className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft" />
                                <textarea placeholder="Votre message" rows={4} className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft"></textarea>
                                <div className="flex items-center">
                                    <input type="checkbox" id="rgpd" className="h-4 w-4 text-brand-blue-main focus:ring-brand-blue-soft border-gray-300 rounded" />
                                    <label htmlFor="rgpd" className="ml-2 block text-sm text-brand-sage-gray">J'accepte la politique de confidentialité.</label>
                                </div>
                                <button type="submit" className="w-full bg-brand-blue-main text-white p-3 rounded-full font-semibold hover:bg-brand-blue-soft shadow-lg transition-colors">Envoyer</button>
                            </form>
                        )}
                    </div>
                    <div className="min-h-[400px]">
                        <h3 className="text-2xl font-bold text-brand-sage-dark mb-6 text-center lg:text-left">Réserver un rendez-vous en ligne</h3>
                        {mounted && (
                            <div 
                                className="calendly-inline-widget" 
                                data-url="https://calendly.com/e-perez-cigaleconseil" 
                                style={{ minWidth: '320px', height: '700px' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
