'use client';

import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-brand-cream rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-brand-sage-gray hover:text-brand-sage-dark">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-brand-sage-dark mb-4">Mentions Légales & Politique de Confidentialité</h2>
                
                <h3 className="text-xl font-bold text-brand-sage-dark mt-6 mb-2">1. Mentions Légales</h3>
                <p className="text-brand-sage-gray mb-4">
                    <strong>Raison sociale :</strong> Cigale Conseil<br/>
                    <strong>Forme juridique :</strong> [À compléter]<br/>
                    <strong>Adresse :</strong> 215 rue du comté de Melgueil, 34000 Montpellier<br/>
                    <strong>Email :</strong> e.perez@cigaleconseil.fr<br/>
                    <strong>Téléphone :</strong> 06.68.85.00.35<br/>
                    <strong>Directrice de la publication :</strong> Eva Perez<br/>
                    <strong>Hébergeur du site :</strong> [À compléter]
                </p>

                <h3 className="text-xl font-bold text-brand-sage-dark mt-6 mb-2">2. Politique de Confidentialité</h3>
                <p className="text-brand-sage-gray mb-4">
                    Cigale Conseil s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site cigaleconseil.fr, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés. Chaque formulaire ou téléservice limite la collecte des données personnelles au strict nécessaire et indique notamment : quels sont les objectifs du recueil de ces données ; si ces données sont obligatoires ou facultatives pour la gestion de votre demande ; qui pourra en prendre connaissance.
                </p>
                 <p className="text-brand-sage-gray mb-4">
                   <strong>Gestion des cookies :</strong> [Placeholder pour le texte sur la gestion des cookies.]
                </p>
            </div>
        </div>
    );
};
