'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const CompatibilityQuiz: React.FC = () => {
    const [answers, setAnswers] = useState<{ q1?: boolean; q2?: boolean; q3?: boolean }>({});
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (question: 'q1' | 'q2' | 'q3', value: boolean) => {
        setAnswers((prev) => ({ ...prev, [question]: value }));
    };

    const handleSubmit = () => {
        if (answers.q1 !== undefined && answers.q2 !== undefined && answers.q3 !== undefined) {
            setShowResult(true);
        }
    };

    const isMatch = answers.q1 === false && answers.q2 === true && answers.q3 === true;
    const allAnswered = answers.q1 !== undefined && answers.q2 !== undefined && answers.q3 !== undefined;

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark mb-4">
                            Test de compatibilité en comptabilité
                        </h2>
                        <p className="text-lg text-brand-sage-gray">
                            Vous voulez savoir si on peut travailler ensemble ? 3 questions pour le savoir.
                        </p>
                    </div>

                    <div className="bg-brand-cream rounded-2xl p-8 md:p-10 shadow-lg border border-brand-sage-light">
                        {/* Question 1 */}
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-semibold text-brand-sage-dark mb-4">
                                1. Êtes-vous là seulement pour vos comptes annuels ?
                            </h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAnswer('q1', true)}
                                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                                        answers.q1 === true
                                            ? 'bg-brand-blue-main text-white'
                                            : 'bg-white text-brand-sage-dark border border-brand-sage-light hover:bg-brand-sage-light'
                                    }`}
                                >
                                    Oui
                                </button>
                                <button
                                    onClick={() => handleAnswer('q1', false)}
                                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                                        answers.q1 === false
                                            ? 'bg-brand-blue-main text-white'
                                            : 'bg-white text-brand-sage-dark border border-brand-sage-light hover:bg-brand-sage-light'
                                    }`}
                                >
                                    Non
                                </button>
                            </div>
                        </div>

                        {/* Question 2 */}
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-semibold text-brand-sage-dark mb-4">
                                2. Avez-vous besoin d'accompagnement en gestion ?
                            </h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAnswer('q2', true)}
                                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                                        answers.q2 === true
                                            ? 'bg-brand-blue-main text-white'
                                            : 'bg-white text-brand-sage-dark border border-brand-sage-light hover:bg-brand-sage-light'
                                    }`}
                                >
                                    Oui
                                </button>
                                <button
                                    onClick={() => handleAnswer('q2', false)}
                                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                                        answers.q2 === false
                                            ? 'bg-brand-blue-main text-white'
                                            : 'bg-white text-brand-sage-dark border border-brand-sage-light hover:bg-brand-sage-light'
                                    }`}
                                >
                                    Non
                                </button>
                            </div>
                        </div>

                        {/* Question 3 */}
                        <div className="mb-8">
                            <h3 className="text-lg md:text-xl font-semibold text-brand-sage-dark mb-4">
                                3. Êtes-vous sympa ?
                            </h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAnswer('q3', true)}
                                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                                        answers.q3 === true
                                            ? 'bg-brand-blue-main text-white'
                                            : 'bg-white text-brand-sage-dark border border-brand-sage-light hover:bg-brand-sage-light'
                                    }`}
                                >
                                    Oui
                                </button>
                                <button
                                    onClick={() => handleAnswer('q3', false)}
                                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                                        answers.q3 === false
                                            ? 'bg-brand-blue-main text-white'
                                            : 'bg-white text-brand-sage-dark border border-brand-sage-light hover:bg-brand-sage-light'
                                    }`}
                                >
                                    Non
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        {allAnswered && !showResult && (
                            <div className="text-center">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-brand-blue-main text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-blue-soft transition-colors shadow-lg"
                                >
                                    Voir le résultat
                                </button>
                            </div>
                        )}

                        {/* Result */}
                        {showResult && (
                            <div className="mt-8 p-6 rounded-xl bg-white border-2 border-brand-sage-light text-center">
                                {isMatch ? (
                                    <>
                                        <div className="flex justify-center mb-4">
                                            <CheckCircle2 className="text-green-600" size={64} />
                                        </div>
                                        <h4 className="text-2xl font-bold text-brand-sage-dark mb-3">
                                            C'est un match ! 🎉
                                        </h4>
                                        <p className="text-lg text-brand-sage-gray mb-6">
                                            Hâte que l'on collabore ensemble !
                                        </p>
                                        <a
                                            href="#services"
                                            className="inline-block bg-brand-blue-main text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-blue-soft transition-colors shadow-lg"
                                        >
                                            Découvrir mes services
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-center mb-4">
                                            <XCircle className="text-orange-500" size={64} />
                                        </div>
                                        <h4 className="text-2xl font-bold text-brand-sage-dark mb-3">
                                            Aïe, pas de match...
                                        </h4>
                                        <p className="text-lg text-brand-sage-gray">
                                            Mais je suis sûre que vous trouverez l'expert-comptable qui correspond à vos besoins !
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
