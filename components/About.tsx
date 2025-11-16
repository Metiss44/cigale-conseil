
import React from 'react';
import { Linkedin, MapPin, Target } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <section id="a-propos" className="bg-brand-sage-light py-12 md:py-20 lg:py-28 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-2 relative h-full max-w-xs lg:max-w-none mx-auto">
                         <img src="https://cigale.matisscottard.com/illustrations/photo-eva-2.webp" alt="Eva Perez" className="rounded-2xl shadow-2xl w-full object-cover h-full" />
                    </div>
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-sage-dark mb-4 md:mb-6">Un cabinet comptable à taille humaine, <br/> aligné avec <span className="text-brand-sage-medium">vos valeurs</span></h2>
                        <div className="space-y-4">
                            <p className="text-base md:text-lg text-brand-sage-gray">
                                Je suis Eva Perez, experte-comptable diplômée, fondatrice d’un cabinet à taille humaine dédié aux entrepreneuses et aux projets à impact.
                            </p>

                            <p className="text-base md:text-lg text-brand-sage-gray">
                                Après plusieurs années en cabinet traditionnel, j’ai choisi de créer un espace professionnel aligné avec mes valeurs : bienveillance, clarté, éthique et écoute. Ici, pas de jargon inutile ni de relation distante.
                            </p>

                            <p className="text-base md:text-lg text-brand-sage-gray">
                                Je vous accompagne pas à pas, avec rigueur et pédagogie, pour que vous puissiez avancer sereinement dans votre activité. Que vous lanciez votre projet ou que vous soyez déjà bien installée, je vous propose une collaboration fondée sur la confiance, le respect de votre rythme, et la conviction que la comptabilité peut être un véritable outil d’autonomie et de stratégie.
                            </p>

                            <p className="text-sm md:text-base text-brand-sage-gray">
                                📍 Basée à Montpellier, j’interviens partout en France en digital.<br/>
                                🌱 Spécialisée dans l’accompagnement des entrepreneuses, freelances, et structures engagées dans la transition écologique ou sociale.
                            </p>
                        </div>
                        <ul className="space-y-3 md:space-y-4 text-brand-sage-dark">
                            <li className="flex items-start">
                                <MapPin className="text-brand-sage-medium mt-1 mr-4 flex-shrink-0" size={20} />
                                <span className="text-sm md:text-base">Basée à Montpellier, j'accompagne mes clients partout en France grâce au 100% digital.</span>
                            </li>
                            <li className="flex items-start">
                                <Target className="text-brand-sage-medium mt-1 mr-4 flex-shrink-0" size={20} />
                                <span className="text-sm md:text-base">Spécialisée dans les entrepreneuses, freelances et projets à impact écologique ou social.</span>
                            </li>
                        </ul>
                        <a href="https://www.linkedin.com/in/eva-perez-cigale-conseil" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-6 md:mt-8 font-semibold text-sm md:text-base text-brand-sage-medium hover:text-brand-sage-dark transition-colors">
                            <Linkedin className="mr-2" size={18} />
                            Voir mon profil LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
