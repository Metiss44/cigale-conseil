
import React from 'react';

export const Video: React.FC = () => {
    return (
        <section className="bg-brand-sage-light py-20 md:py-28">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark max-w-3xl mx-auto">
                    "On ne nous a pas appris la gestion et la comptabilité à l’école"
                </h2>
                <p className="mt-4 text-lg text-brand-sage-gray max-w-2xl mx-auto">
                    C'est pourquoi je m'engage à rendre ces sujets accessibles, pour que vous puissiez piloter votre activité en toute confiance.
                </p>
                {/* Video frame with gradient border */}
                <div className="mt-12 max-w-sm mx-auto">
                    {/* Outer gradient border container */}
                    <div className="relative p-1 rounded-3xl bg-gradient-to-br from-brand-orange via-brand-blue-main to-brand-sage-dark shadow-2xl">
                        {/* Inner white padding */}
                        <div className="bg-white p-2 rounded-[22px]">
                            {/* Video container */}
                            <div className="aspect-[9/16] relative rounded-2xl overflow-hidden shadow-lg">
                                <video
                                    className="w-full h-full object-cover"
                                    poster="https://cdn.cigaleconseil.fr/illustrations/miniature-video-fiscale.webp"
                                    controls
                                    playsInline
                                >
                                    <source src="https://cdn.cigaleconseil.fr/video-fiiscal.mp4" type="video/mp4" />
                                    Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
