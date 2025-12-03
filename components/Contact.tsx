'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    typeDeStructure: string;
    message: string;
    rgpdConsent: boolean;
}

export const Contact: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        typeDeStructure: '',
        message: '',
        rgpdConsent: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setMounted(true);
        
        // Load Calendly script
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formData.firstName || !formData.email || !formData.message) {
            setErrorMessage('Veuillez remplir tous les champs obligatoires.');
            setSubmitStatus('error');
            return;
        }

        if (!formData.rgpdConsent) {
            setErrorMessage('Veuillez accepter la politique de confidentialité.');
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formId: 'contact-cigale-v1',
                    sourceUrl: window.location.href,
                    fields: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        typeDeStructure: formData.typeDeStructure,
                        message: formData.message,
                    },
                }),
            });

            const result = await response.json();

            if (result.ok) {
                setSubmitStatus('success');
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    typeDeStructure: '',
                    message: '',
                    rgpdConsent: false,
                });
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || 'Une erreur est survenue lors de l\'envoi du message.');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Impossible de contacter le serveur. Veuillez réessayer.');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Contact et rendez-vous</h2>
                    <p className="mt-4 text-lg text-brand-sage-gray">
                        Prête à discuter de votre projet ? Contactez-moi ou réservez directement un créneau pour un premier échange gratuit.
                    </p>
                </div>
                <div className="mt-16 grid lg:grid-cols-2 gap-12">
                    <div className="bg-brand-sage-light p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold text-brand-sage-dark mb-6">Mes coordonnées</h3>
                        <ul className="space-y-4 text-brand-sage-dark">
                            <li className="flex items-center">
                                <Phone className="text-brand-orange mr-4" />
                                <a href="tel:+33668850035" className="hover:underline hover:text-brand-orange transition-colors">06.68.85.00.35</a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="text-brand-blue-main mr-4" />
                                <a href="mailto:e.perez@cigaleconseil.fr" className="hover:underline hover:text-brand-blue-main transition-colors">e.perez@cigaleconseil.fr</a>
                            </li>
                            <li className="flex items-center">
                                <MapPin className="text-brand-orange mr-4" />
                                <a href="https://maps.google.com/?q=215+rue+du+comté+de+Melgueil,+34000+Montpellier" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-brand-orange transition-colors">215 rue du comté de Melgueil, 34000 Montpellier</a>
                            </li>
                            <li className="flex items-center">
                                <Linkedin className="text-brand-blue-main mr-4" />
                                <a href="https://www.linkedin.com/in/eva-perez-a62b6a138/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-brand-blue-main transition-colors">Profil LinkedIn</a>
                            </li>
                            <li className="mt-2 text-sm text-brand-sage-dark">
                                <strong className="text-brand-blue-main">Inscrite à l'Ordre des experts-comptables d'Occitanie</strong>
                            </li>
                        </ul>
                        {mounted && (
                            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                                {submitStatus === 'success' && (
                                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                        <p className="text-green-800 text-sm">✅ Message envoyé avec succès ! Nous vous répondrons rapidement.</p>
                                    </div>
                                )}
                                
                                {submitStatus === 'error' && (
                                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                        <p className="text-red-800 text-sm">❌ {errorMessage}</p>
                                    </div>
                                )}

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        placeholder="Prénom *" 
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-blue-soft focus:border-brand-blue-soft outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" 
                                    />
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        placeholder="Nom" 
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-blue-soft focus:border-brand-blue-soft outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" 
                                    />
                                </div>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email *" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-blue-soft focus:border-brand-blue-soft outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" 
                                />
                                <input 
                                    type="text" 
                                    name="typeDeStructure"
                                    placeholder="Type de structure" 
                                    value={formData.typeDeStructure}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-blue-soft focus:border-brand-blue-soft outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" 
                                />
                                <textarea 
                                    name="message"
                                    placeholder="Votre message *" 
                                    rows={4} 
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-blue-soft focus:border-brand-blue-soft outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                                ></textarea>
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id="rgpd" 
                                        name="rgpdConsent"
                                        checked={formData.rgpdConsent}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="h-4 w-4 text-brand-blue-main focus:ring-brand-blue-soft border-gray-300 rounded disabled:cursor-not-allowed" 
                                    />
                                    <label htmlFor="rgpd" className="ml-2 block text-sm text-brand-sage-gray">
                                        J'accepte la politique de confidentialité. *
                                    </label>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-brand-blue-main text-white p-3 rounded-full font-semibold hover:bg-brand-blue-soft shadow-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="min-h-[400px]">
                        <h3 className="text-2xl font-bold text-brand-sage-dark mb-6 text-center lg:text-left">Réserver un rendez-vous en ligne</h3>
                        {mounted && (
                            <div 
                                className="calendly-inline-widget" 
                                data-url="https://calendly.com/e-perez-cigaleconseil" 
                                style={{ minWidth: '320px', height: '700px' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
