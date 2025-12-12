'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const HashScrollFix = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const scrollToHash = () => {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            };

            // Immediate attempt
            scrollToHash();

            // Retry attempts to handle layout shifts (e.g. widgets loading)
            const timeouts = [100, 300, 600, 1000, 2000].map(delay =>
                setTimeout(scrollToHash, delay)
            );

            return () => timeouts.forEach(clearTimeout);
        }
    }, [pathname, searchParams]);

    return null;
};
