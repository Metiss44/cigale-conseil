'use client';

import React, { useState, useEffect } from 'react';
import { CicadaMotif } from './CicadaMotif';

const cicadaMotifs = [
  { top: '25vh', right: '5vw', rotate: 15, scrollStart: 300, scrollEnd: 800, className: 'hidden md:block' },
  { top: '110vh', left: '2vw', rotate: -25, scrollStart: 900, scrollEnd: 1400, className: 'hidden md:block' },
  { top: '180vh', right: '10vw', rotate: 5, scrollStart: 1800, scrollEnd: 2300, className: 'hidden lg:block' },
  { top: '260vh', left: '5vw', rotate: -10, scrollStart: 2800, scrollEnd: 3300, className: 'hidden md:block' },
  { top: '350vh', right: '2vw', rotate: 20, scrollStart: 3800, scrollEnd: 4300, className: 'hidden lg:block' }
];

export const CicadaBackground: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {cicadaMotifs.map((motif, index) => {
                const progress = Math.min(1, Math.max(0, (scrollY - motif.scrollStart) / (motif.scrollEnd - motif.scrollStart)));
                const opacity = progress * 0.1;
                const scale = 0.95 + progress * 0.1;

                return (
                    <CicadaMotif
                        key={index}
                        className={motif.className}
                        style={{
                            top: motif.top,
                            left: motif.left,
                            right: motif.right,
                            opacity,
                            transform: `rotate(${motif.rotate}deg) scale(${scale})`,
                        }}
                    />
                );
            })}
        </>
    );
};
