
import React from 'react';
import { Building, Palette, LineChart } from 'lucide-react';

const expertiseItems = [
    {
        icon: <Building size={32} className="text-brand-sage-medium" />,
        title: "Les associations",
        description: "Accompagnement de structures à but lucratif ou non, avec une maîtrise des modèles économiques associatifs et des spécificités réglementaires."
    },
    {
        icon: <Palette size={32} className="text-brand-sage-medium" />,
        title: "Le secteur culturel",
        description: "Labels, structures culturelles et tiers-lieux, avec une expertise sur les crédits d’impôt spécifiques et les montages hybrides."
    },
    {
        icon: <LineChart size={32} className="text-brand-sage-medium" />,
        title: "Stratégie d’entreprise",
        description: "Accompagnement de groupes et sociétés à forts enjeux (énergies renouvelables, etc.) avec une approche stratégique de la fiscalité et du pilotage."
    }
];

export const Expertise: React.FC = () => {
    return (
        <section id="expertises" className="container mx-auto px-6 py-20 md:py-28">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Mes domaines d'expertise</h2>
                <p className="mt-4 text-lg text-brand-sage-gray">
                    Un savoir-faire pointu pour les secteurs qui ont du sens et des défis uniques.
                </p>
            </div>
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
