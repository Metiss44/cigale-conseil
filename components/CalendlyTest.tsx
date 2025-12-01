'use client';

import React, { useEffect, useState } from 'react';

export const CalendlyTest: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Add Calendly script if not already present
        const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
        if (!existing) {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }

        // no cleanup needed if script already present
        return () => {};
    }, []);

    return (
        <section id="calendly-test" className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Test — Calendly intégré</h2>
                    <p className="mt-4 text-lg text-brand-sage-gray">Section de test pour vérifier l’intégration du widget Calendly.</p>
                </div>

                <div className="mt-12 flex justify-center">
                    {mounted && (
                        <div
                            className="calendly-inline-widget"
                            data-url="https://calendly.com/naomienegouai"
                            style={{ minWidth: '320px', height: '700px' }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
