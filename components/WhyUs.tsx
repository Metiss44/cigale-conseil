
import React from 'react';

const whyUsItems = [
    {
        image: 'https://cigale.matisscottard.com/illustrations/pourquoi.webp',
        title: "Expertise humaine",
        description: "Une approche technique rigoureuse, toujours délivrée avec pédagogie et douceur."
    },
    {
        image: 'https://cigale.matisscottard.com/illustrations/pourquoi-2.webp',
        title: "Valeurs partagées",
        description: "Nous accompagnons des projets qui nous ressemblent et qui œuvrent pour un futur plus juste."
    },
    {
        image: 'https://cigale.matisscottard.com/illustrations/pourquoi-3.webp',
        title: "Partenaire de confiance",
        description: "Plus qu'une prestataire, une alliée engagée dans la réussite et la pérennité de votre projet."
    },
    {
        image: 'https://cigale.matisscottard.com/illustrations/pourquoi-4.webp',
        title: "Relationnel sincère",
        description: "L'écoute et la bienveillance sont au cœur de chaque échange pour une collaboration sereine."
    }
];

export const WhyUs: React.FC = () => {
    return (
        <section className="bg-brand-sage-light py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Pourquoi collaborer avec Cigale Conseil ?</h2>
                     <p className="mt-4 text-lg text-brand-sage-gray">
                        Une vision de l'expertise-comptable qui change tout.
                    </p>
                </div>
                <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyUsItems.map((item, index) => (
                        <div key={index} className="relative bg-brand-cream p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
                            {/* Icon image */}
                            <div className="flex justify-center mb-4">
                                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-sage-dark mb-2">{item.title}</h3>
                            <p className="text-brand-sage-gray">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
