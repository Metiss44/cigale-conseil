'use client';

import React, { useEffect } from 'react';

export const Instagram: React.FC = () => {
    useEffect(() => {
        // The external script will handle the widget rendering.
    }, []);

    return (
        <section className="bg-gradient-to-br from-brand-pink-soft/20 via-brand-cream to-brand-pink-soft/15 py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Dans les coulisses <span className="text-brand-pink-main">du cabinet</span></h2>
                    <p className="mt-4 text-lg text-brand-sage-gray">
                        Suivez mon actualité et découvrez des conseils pratiques sur Instagram.
                    </p>
                </div>
                <div className="mt-12">
                    <div className="elfsight-app-694957ce-9b48-46d5-9f89-3d5134bdc961" data-elfsight-app-lazy></div>
                </div>
            </div>
        </section>
    );
};
