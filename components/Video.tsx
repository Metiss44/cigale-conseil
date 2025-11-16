
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
                <div className="mt-12 aspect-video max-w-4xl mx-auto">
                     <iframe 
                        className="w-full h-full rounded-2xl shadow-2xl" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="Vidéo pédagogique" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </section>
    );
};
