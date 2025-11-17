
import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
    openModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ openModal }) => {
    return (
        <footer className="bg-brand-sage-dark text-brand-cream">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                         <img src="https://cigale.matisscottard.com/illustrations/logo-ciagale-blanc.webp" alt="Cigale Conseil Logo" className="h-14 w-auto mx-auto md:mx-0" />
                         <p className="mt-4 text-sm text-brand-sage-light">e.perez@cigaleconseil.fr<br/>Montpellier, France</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#a-propos" className="text-brand-sage-light hover:text-white">À propos</a></li>
                            <li><a href="#services" className="text-brand-sage-light hover:text-white">Services</a></li>
                            <li><a href="#contact" className="text-brand-sage-light hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold mb-4">Suivez-moi</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" className="text-brand-sage-light hover:text-white"><Instagram /></a>
                            <a href="#" className="text-brand-sage-light hover:text-white"><Linkedin /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-brand-sage-medium mt-8 pt-6 text-center text-sm text-brand-sage-gray">
                    <p>© {new Date().getFullYear()} Cigale Conseil. Tous droits réservés.</p>
                     <p className="mt-2">
                        <button onClick={openModal} className="hover:text-white underline">Mentions légales & Politique de confidentialité</button>
                    </p>
                </div>
            </div>
        </footer>
    );
};
