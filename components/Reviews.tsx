'use client';

import React, { useEffect } from 'react';

export const Reviews: React.FC = () => {
     useEffect(() => {
        // The external script will handle the widget rendering.
        // This effect ensures React lifecycle compatibility.
    }, []);

    return (
        <section id="avis" className="container mx-auto px-6 py-20 md:py-28 bg-brand-pink-soft/15 rounded-3xl">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-sage-dark">Ce que mes clients en disent</h2>
                <p className="mt-4 text-lg text-brand-sage-gray">
                    La confiance et la satisfaction de mes clients sont ma plus grande fierté.
                </p>
            </div>
            <div className="mt-12">
                <div className="elfsight-app-6e1ef30a-d181-4bc5-a6c6-f21fba013bb6" data-elfsight-app-lazy></div>
            </div>
        </section>
    );
};
