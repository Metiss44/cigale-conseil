
import React from 'react';
import { Linkedin, MapPin, Target } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <section id="a-propos" className="bg-brand-sage-light py-12 md:py-20 lg:py-28 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-2 relative h-auto max-w-[280px] mx-auto lg:max-w-[360px]">
                    <div className="bg-brand-sage-light rounded-2xl p-3 md:p-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <img src="https://cigale.matisscottard.com/illustrations/photo-eva-2.webp" alt="Eva Perez" className="rounded-xl w-full h-auto object-cover" />
                    </div>
                </div>
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-sage-dark mb-6 md:mb-8">Un cabinet comptable à taille humaine, <br/> aligné avec <span className="text-brand-sage-medium">vos valeurs</span></h2>
                        
                        <div className="space-y-5 mb-8">
                            <p className="text-base md:text-lg text-brand-sage-gray leading-relaxed">
                                Je suis <strong className="text-brand-sage-dark">Eva Perez</strong>, experte-comptable diplômée, fondatrice d'un cabinet à taille humaine dédié aux entrepreneuses et aux projets à impact.
                            </p>

                            <p className="text-base md:text-lg text-brand-sage-gray leading-relaxed">
                                Après plusieurs années en cabinet traditionnel, j'ai choisi de créer un espace professionnel aligné avec mes valeurs : <span className="font-medium text-brand-sage-dark">bienveillance, clarté, éthique et écoute</span>. Ici, pas de jargon inutile ni de relation distante.
                            </p>

                            <p className="text-base md:text-lg text-brand-sage-gray leading-relaxed">
                                Je vous accompagne pas à pas, avec rigueur et pédagogie, pour que vous puissiez avancer sereinement dans votre activité. Que vous lanciez votre projet ou que vous soyez déjà bien installée, je vous propose une collaboration fondée sur la confiance, le respect de votre rythme, et la conviction que la comptabilité peut être un véritable outil d'autonomie et de stratégie.
                            </p>
                        </div>

                        {/* Info cards with icons */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-brand-sage-light/30 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-brand-sage-medium mt-0.5 flex-shrink-0" size={22} />
                                    <div>
                                        <h3 className="font-semibold text-brand-sage-dark mb-1">Montpellier & France entière</h3>
                                        <p className="text-sm text-brand-sage-gray">Accompagnement 100% digital, partout en France</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-brand-sage-light/30 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-3">
                                    <Target className="text-brand-sage-medium mt-0.5 flex-shrink-0" size={22} />
                                    <div>
                                        <h3 className="font-semibold text-brand-sage-dark mb-1">Spécialisation</h3>
                                        <p className="text-sm text-brand-sage-gray">Entrepreneuses, freelances et projets à impact</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a href="https://www.linkedin.com/in/eva-perez-a62b6a138/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-sm md:text-base text-brand-sage-medium hover:text-brand-sage-dark transition-colors group">
                            <Linkedin className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                            Voir mon profil LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
