
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
                <div className="mt-12 aspect-[9/16] max-w-sm mx-auto relative rounded-2xl overflow-hidden">
                    <video
                        className="w-full h-full object-cover"
                        poster="https://cigale.matisscottard.com/illustrations/miniature-video-fiscale.webp"
                        controls
                        playsInline
                    >
                        <source src="https://cigale.matisscottard.com/video-fiiscal.mp4" type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                </div>
            </div>
        </section>
    );
};
