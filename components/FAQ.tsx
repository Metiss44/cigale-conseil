'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
    {
        question: "Comment échange-t-on ?",
        answer: "Les échanges se font par mail, téléphone ou visio, selon vos préférences. Pas besoin d'attendre la fin de l'année : on communique dès que nécessaire, en toute simplicité."
    },
    {
        question: "Quels outils utilise Cigale Conseil ?",
        answer: "J'utilise Pennylane, un outil collaboratif simple et intuitif qui vous permet de suivre vos factures, vos dépenses et votre comptabilité en temps réel. Tout est centralisé, sécurisé et accessible depuis votre ordinateur ou votre téléphone."
    },
    {
        question: "Est-ce que tout peut se faire à distance ?",
        answer: "Oui, absolument ! Tous les échanges, signatures et dépôts de documents se font en ligne. Mais si vous êtes dans la région de Montpellier, on peut aussi se rencontrer autour d'un café ☕."
    },
    {
        question: "Quels types d'activités accompagnes-tu ?",
        answer: "J'accompagne principalement les entrepreneurs (micro-entreprise, SAS, SARL, associations, SCOP, etc.), ainsi que les créateurs d'entreprises."
    },
    {
        question: "Comment se passe la mise en place d'une collaboration ?",
        answer: "Tout commence par un appel découverte gratuit, pour faire le point sur vos besoins et votre activité. Ensuite, je vous envoie une proposition personnalisée et, une fois validée, on démarre ensemble avec un accompagnement sur mesure."
    },
    {
        question: "Quels sont les tarifs ?",
        answer: "Les tarifs dépendent de votre statut, de la taille de votre activité et du niveau d'accompagnement souhaité. Je privilégie une tarification claire et transparente, sans surprise. Une estimation personnalisée vous est toujours envoyée avant tout engagement."
    },
    {
        question: "Est-ce que tu aides aussi à la création d'entreprise ?",
        answer: "Oui ! Je peux vous accompagner dès la phase de création : choix du statut, prévisionnel, démarches administratives, immatriculation… Vous n'êtes pas seul·e pour vous lancer."
    },
    {
        question: "Qu'est-ce qui différencie Cigale Conseil d'un cabinet classique ?",
        answer: "Une approche humaine, moderne et flexible : ici, pas de jargon, pas de paperasse inutile. Je crois en la proximité, en la pédagogie et en un accompagnement qui vous permet de comprendre et piloter votre activité en toute autonomie."
    }
];

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 md:py-28 bg-brand-sage-light">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">FAQ – Vos questions fréquentes</h2>
                    <p className="mt-4 text-lg text-brand-sage-gray">
                        Toutes les réponses aux questions que vous vous posez sur mon accompagnement.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md border border-brand-sage-light overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-cream transition-colors"
                            >
                                <h3 className="text-lg md:text-xl font-semibold text-brand-sage-dark pr-4">
                                    {item.question}
                                </h3>
                                <ChevronDown
                                    className={`flex-shrink-0 text-brand-sage-medium transition-transform duration-300 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                    size={24}
                                />
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                            >
                                <div className="px-6 pb-6 text-base md:text-lg text-brand-sage-gray leading-relaxed">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-brand-sage-gray mb-4">Une autre question ?</p>
                    <a
                        href="#contact"
                        className="inline-block bg-brand-sage-medium text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-sage-dark transition-colors shadow-lg"
                    >
                        Contactez-moi
                    </a>
                </div>
            </div>
        </section>
    );
};
