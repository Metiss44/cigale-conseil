
import React from 'react';
import { Heart, MessageCircle, Smile } from 'lucide-react';

const expertiseItems = [
    {
        icon: <Heart size={32} className="text-brand-sage-medium" />,
        title: "Écoute",
        description: "Une oreille attentive pour comprendre vos besoins uniques."
    },
    {
        icon: <MessageCircle size={32} className="text-brand-sage-medium" />,
        title: "Disponibilité",
        description: "Des réponses claires et rapides à toutes vos questions."
    },
    {
        icon: <Smile size={32} className="text-brand-sage-medium" />,
        title: "Bienveillance",
        description: "Un accompagnement sans jugement, centré sur votre réussite."
    }
];

export const Expertise: React.FC = () => {
    return (
        <section id="expertises" className="container mx-auto px-6 py-20 md:py-28">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Mes domaines d'expertise</h2>
                    <p className="mt-4 text-lg text-brand-sage-gray">
                        Un savoir-faire pointu pour les secteurs qui ont du sens et des défis uniques.
                    </p>
                </div>

                <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {expertiseItems.map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                            <div className="bg-brand-sage-light inline-block p-4 rounded-full mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-brand-sage-dark mb-4">{item.title}</h3>
                            <p className="text-brand-sage-gray leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
        </section>
    );
};
