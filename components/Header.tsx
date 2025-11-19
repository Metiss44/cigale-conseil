'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../constants';

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-[100]">
            <div className={`transition-all duration-300 ${
                isScrolled 
                    ? 'mx-3 sm:mx-auto my-2 max-w-5xl px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-2xl bg-brand-sage-dark/85 backdrop-blur-md shadow-lg' 
                    : 'max-w-7xl mx-auto px-6 pt-6 pb-5 bg-transparent'
            }`}>
                <nav className="flex justify-between items-center gap-4 md:gap-6">
                    {/* Left: Navigation */}
                    <div className="hidden lg:flex items-center gap-4 xl:gap-6">
                        {navLinks.map((link) => (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                className={`text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
                                    isScrolled 
                                        ? 'text-brand-cream hover:text-white' 
                                        : 'text-brand-sage-dark hover:text-brand-sage-medium'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <a href="#accueil" className="flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                        <img
                            src={isScrolled ? 'https://cigale.matisscottard.com/illustrations/logo-ciagale-blanc.webp' : 'https://cigale.matisscottard.com/illustrations/logo-cigale.webp'}
                            alt="Cigale Conseil Logo"
                            className={`transition-all duration-300 ${isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-[4.5rem]'} w-auto`}
                        />
                    </a>

                    {/* Right: CTA */}
                    <div className="hidden lg:flex items-center">
                        <a
                            href="https://www.pennylane.com/fr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mr-4 px-4 py-1.5 rounded-lg font-semibold text-sm transition-all duration-300 whitespace-nowrap ${isScrolled ? 'bg-transparent text-brand-cream border border-white/20 hover:opacity-90' : 'bg-white text-brand-sage-dark border border-brand-sage-light hover:bg-brand-sage-light'}`}
                        >
                            Pennylane
                        </a>
                        <a 
                            href="#contact" 
                            className={`px-5 py-1.5 md:px-6 md:py-2 rounded-lg md:rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                                isScrolled
                                    ? 'bg-brand-sage-medium text-white hover:bg-white hover:text-brand-sage-dark'
                                    : 'bg-brand-sage-medium text-white hover:bg-brand-sage-dark'
                            }`}
                        >
                            Prendre RDV
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className={`p-2 rounded-lg transition ${
                                isScrolled
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-brand-sage-dark hover:bg-brand-sage-light'
                            }`}
                        >
                            <Menu size={32} />
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-full bg-brand-sage-dark z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                <div className="flex justify-end p-4 md:p-6">
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-white p-2 rounded-lg hover:bg-white/10 transition"
                    >
                        <X size={36} />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center h-full -mt-16 space-y-6">
                    {navLinks.map((link) => (
                        <a 
                            key={link.href} 
                            href={link.href} 
                            onClick={() => setIsOpen(false)} 
                            className="text-xl text-brand-cream hover:text-white font-medium transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://www.pennylane.com/fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="mt-4 text-lg bg-white text-brand-sage-dark px-6 py-3 rounded-xl shadow-md hover:bg-brand-sage-light transition"
                    >
                        Pennylane
                    </a>
                    <a 
                        href="#contact" 
                        onClick={() => setIsOpen(false)} 
                        className="mt-8 bg-brand-sage-medium text-white px-8 py-3 rounded-xl text-lg shadow-lg hover:bg-white hover:text-brand-sage-dark transition"
                    >
                        Prendre RDV
                    </a>
                </div>
            </div>
        </header>
    );
};
