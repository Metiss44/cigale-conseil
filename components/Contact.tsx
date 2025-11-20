'use client';

import React from 'react';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import { TemporaryCalendar } from '@/components/TemporaryCalendar';

export const Contact: React.FC = () => {
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
                             <li className="flex items-center"><Phone className="text-brand-sage-medium mr-4" /> 06.68.85.00.35</li>
                            <li className="flex items-center"><Mail className="text-brand-sage-medium mr-4" /> e.perez@cigaleconseil.fr</li>
                            <li className="flex items-center"><MapPin className="text-brand-sage-medium mr-4" /> 215 rue du comté de Melgueil, 34000 Montpellier</li>
                            <li className="flex items-center"><Linkedin className="text-brand-sage-medium mr-4" /> <a href="https://www.linkedin.com/in/eva-perez-a62b6a138/" target="_blank" rel="noopener noreferrer" className="hover:underline">Profil LinkedIn</a></li>
                        </ul>
                         <form className="mt-8 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="Prénom" className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft"/>
                                <input type="text" placeholder="Nom" className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft"/>
                            </div>
                            <input type="email" placeholder="Email" className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft"/>
                            <input type="text" placeholder="Type de structure" className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft"/>
                            <textarea placeholder="Votre message" rows={4} className="w-full p-3 rounded-md border-gray-300 focus:ring-brand-blue-soft"></textarea>
                            <div className="flex items-center">
                                <input type="checkbox" id="rgpd" className="h-4 w-4 text-brand-blue-main focus:ring-brand-blue-soft border-gray-300 rounded"/>
                                <label htmlFor="rgpd" className="ml-2 block text-sm text-brand-sage-gray">J'accepte la politique de confidentialité.</label>
                            </div>
                            <button type="submit" className="w-full bg-brand-blue-main text-white p-3 rounded-full font-semibold hover:bg-brand-blue-soft shadow-lg transition-colors">Envoyer</button>
                        </form>
                    </div>
                    <div className="min-h-[400px]">
                        <h3 className="text-2xl font-bold text-brand-sage-dark mb-6 text-center lg:text-left">Réserver un rendez-vous en ligne</h3>
                        <TemporaryCalendar />
                    </div>
                </div>
            </div>
        </section>
    );
};
