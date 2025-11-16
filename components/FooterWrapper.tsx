'use client';

import React, { useState } from 'react';
import { Footer } from './Footer';
import { LegalModal } from './LegalModal';

export const FooterWrapper: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Footer openModal={() => setIsModalOpen(true)} />
            <LegalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
