'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { FooterWrapper } from '@/components/FooterWrapper';
import { CicadaBackground } from '@/components/CicadaBackground';

export default function SimulateurEURL() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Load URSSAF simulator script
        const script = document.createElement('script');
        script.src = 'https://mon-entreprise.urssaf.fr/simulateur-iframe-integration.js';
        script.setAttribute('data-module', 'simulateur-eurl');
        script.setAttribute('data-couleur', '#728f78');
        script.async = true;

        // Add script to head instead of body
        document.head.appendChild(script);

        // Monitor for iframe injection and move it to our container
        const checkInterval = setInterval(() => {
            const iframe = document.querySelector('iframe[src*="mon-entreprise.urssaf.fr"]');
            const container = document.getElementById('urssaf-simulator-container');

            if (iframe && container && !container.contains(iframe)) {
                // Move iframe to our container
                container.appendChild(iframe);
                setIsLoading(false); // Hide loading spinner
                clearInterval(checkInterval);
            }
        }, 100);

        return () => {
            clearInterval(checkInterval);
            // Cleanup script on unmount
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
            // Also remove the iframe that the script creates
            const iframes = document.querySelectorAll('iframe[src*="mon-entreprise.urssaf.fr"]');
            iframes.forEach(iframe => iframe.remove());
        };
    }, []);

    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden bg-brand-cream">
            <CicadaBackground />
            <Header />
            <main className="pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-brand-sage-dark mb-4">
                                Simulateur EURL
                            </h1>
                            <p className="text-lg md:text-xl text-brand-sage-gray max-w-3xl mx-auto">
                                Estimez vos cotisations sociales et votre revenu net en tant que gérant d'EURL.
                                Outil officiel fourni par l'URSSAF.
                            </p>
                        </div>

                        {/* Info Section */}
                        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-brand-sage-light/30">
                            <h2 className="text-xl font-semibold text-brand-sage-dark mb-3">
                                💡 À propos de ce simulateur
                            </h2>
                            <p className="text-brand-sage-gray mb-3">
                                Ce simulateur officiel de l'URSSAF vous permet d'estimer vos charges sociales en tant que gérant d'EURL (Entreprise Unipersonnelle à Responsabilité Limitée).
                            </p>
                            <p className="text-brand-sage-gray">
                                Pour un accompagnement personnalisé dans la gestion de votre société, n'hésitez pas à{' '}
                                <a href="/#contact" className="text-brand-blue-main hover:text-brand-blue-soft font-semibold underline">
                                    nous contacter
                                </a>.
                            </p>
                        </div>

                        {/* URSSAF Simulator Container */}
                        <div id="urssaf-simulator-container" className="w-full min-h-[600px]">
                            {isLoading && (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-sage-medium mx-auto mb-4"></div>
                                        <p className="text-brand-sage-gray">Chargement du simulateur...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <FooterWrapper />
        </div>
    );
}
