'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks } from '../constants';

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmenuToggle = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    const handleMouseEnter = (label: string) => {
        // Clear any pending close timeout
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpenSubmenu(label);
    };

    const handleMouseLeave = () => {
        // Add a delay before closing to allow user to move mouse to submenu
        closeTimeoutRef.current = setTimeout(() => {
            setOpenSubmenu(null);
        }, 300); // Increased from 150ms to 300ms
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[100]">
            <div className={`transition-all duration-500 ease-in-out ${isScrolled
                ? 'mx-4 sm:mx-auto my-4 max-w-5xl px-6 py-3 md:px-8 md:py-4 rounded-2xl bg-brand-sage-dark/90 backdrop-blur-xl shadow-2xl border border-white/10'
                : 'max-w-7xl mx-auto px-6 pt-8 pb-6 bg-transparent'
                }`}>
                <nav className="flex justify-between items-center gap-4 md:gap-6">
                    {/* Left: Navigation */}
                    <div className={`hidden lg:flex items-center ${isScrolled ? 'gap-2 xl:gap-3' : 'gap-4 xl:gap-6'}`}>
                        {navLinks.filter(link => !isScrolled || (link.label !== 'FAQ' && link.label !== 'Contact')).map((link) => (
                            <div
                                key={link.label}
                                className="relative group"
                                onMouseEnter={() => link.submenu && handleMouseEnter(link.label)}
                                onMouseLeave={() => link.submenu && handleMouseLeave()}
                            >
                                <a
                                    href={link.href}
                                    className={`text-sm md:text-base font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${isScrolled
                                        ? 'text-brand-cream hover:text-white'
                                        : 'text-brand-sage-dark hover:text-brand-sage-medium'
                                        }`}
                                    onClick={(e) => {
                                        if (link.submenu) {
                                            e.preventDefault();
                                            handleSubmenuToggle(link.label);
                                        }
                                    }}
                                >
                                    {link.label}
                                    {link.submenu && (
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 ${openSubmenu === link.label ? 'rotate-180' : ''
                                                }`}
                                        />
                                    )}
                                </a>

                                {/* Mega Menu Dropdown */}
                                {link.submenu && openSubmenu === link.label && (
                                    <div
                                        className="absolute top-full left-0 pt-1 w-64 z-50"
                                        onMouseEnter={() => handleMouseEnter(link.label)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="bg-white rounded-xl shadow-2xl border border-brand-sage-light overflow-hidden animate-fadeIn">
                                            <div className="py-2">
                                                {link.submenu.map((sublink) => (
                                                    <a
                                                        key={sublink.href}
                                                        href={sublink.href}
                                                        className="block px-6 py-3 text-brand-sage-dark hover:bg-brand-sage-light/50 hover:text-brand-sage-dark transition-colors font-medium"
                                                        onClick={() => setOpenSubmenu(null)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-2xl">
                                                                {sublink.label === 'Entreprise Individuelle' && '👤'}
                                                                {sublink.label === 'EURL' && '🏢'}
                                                                {sublink.label === 'SASU' && '💼'}
                                                                {sublink.label === 'Frais Kilométriques' && '🚗'}
                                                            </span>
                                                            <div>
                                                                <div className="font-semibold">{sublink.label}</div>
                                                                <div className="text-xs text-brand-sage-gray">
                                                                    {sublink.label === 'Entreprise Individuelle' && 'Simulateur officiel URSSAF'}
                                                                    {sublink.label === 'EURL' && 'Gérant majoritaire'}
                                                                    {sublink.label === 'SASU' && 'Assimilé salarié'}
                                                                    {sublink.label === 'Frais Kilométriques' && 'Barème fiscal 2025'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <a href="/#accueil" className="flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                        <Image
                            src={isScrolled ? 'https://cdn.cigaleconseil.fr/illustrations/logo-ciagale-blanc.webp' : 'https://cdn.cigaleconseil.fr/illustrations/logo-cigale.webp'}
                            alt="Cigale Conseil Logo"
                            width={240}
                            height={80}
                            className={`transition-all duration-300 ${isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-[4.5rem]'} w-auto`}
                        />
                    </a>

                    {/* Right: CTA */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href="https://app.pennylane.com/auth/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-5 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${isScrolled
                                ? 'text-brand-cream hover:bg-white/10'
                                : 'bg-white/80 backdrop-blur-sm text-brand-sage-dark border border-brand-sage-light hover:bg-white hover:shadow-md'
                                }`}
                        >
                            Pennylane
                        </a>
                        <a
                            href="/#contact"
                            className={`px-6 py-2 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${isScrolled
                                ? 'bg-brand-blue-main text-white hover:bg-brand-blue-soft'
                                : 'bg-brand-blue-main text-white hover:bg-brand-blue-soft'
                                }`}
                        >
                            Prendre RDV
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-lg transition ${isScrolled
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
            <div className={`fixed top-0 right-0 h-full w-full bg-brand-sage-dark z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto`}>
                <div className="flex justify-end p-4 md:p-6">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white p-2 rounded-lg hover:bg-white/10 transition"
                    >
                        <X size={36} />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-start pt-8 space-y-4 px-6">
                    {navLinks.map((link) => (
                        <div key={link.label} className="w-full">
                            {link.submenu ? (
                                <div className="w-full">
                                    <button
                                        onClick={() => handleSubmenuToggle(link.label)}
                                        className="w-full text-xl text-brand-cream hover:text-white font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        {link.label}
                                        <ChevronDown
                                            size={20}
                                            className={`transition-transform duration-200 ${openSubmenu === link.label ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {openSubmenu === link.label && (
                                        <div className="mt-3 space-y-2 bg-white/10 rounded-lg p-3">
                                            {link.submenu.map((sublink) => (
                                                <a
                                                    key={sublink.href}
                                                    href={sublink.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-center text-brand-cream hover:text-white py-2 transition-colors"
                                                >
                                                    {sublink.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <a
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-xl text-brand-cream hover:text-white font-medium transition-colors text-center"
                                >
                                    {link.label}
                                </a>
                            )}
                        </div>
                    ))}
                    <a
                        href="https://app.pennylane.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex items-center px-5 py-2 rounded-xl bg-white text-brand-sage-dark font-semibold text-sm border border-brand-sage-light/30 shadow-sm hover:shadow-md hover:bg-brand-cream transition-all duration-300 mt-6"
                    >
                        Connexion rapide
                    </a>
                    <a
                        href="https://app.pennylane.com/auth/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="mt-4 text-lg bg-white text-brand-sage-dark px-6 py-3 rounded-xl shadow-md hover:bg-brand-sage-light transition"
                    >
                        Pennylane
                    </a>
                    <a
                        href="/#contact"
                        onClick={() => setIsOpen(false)}
                        className="mt-8 bg-brand-blue-main text-white px-8 py-3 rounded-xl text-lg shadow-lg hover:bg-brand-blue-soft transition"
                    >
                        Prendre RDV
                    </a>
                </div>
            </div>

            {/* Add fadeIn animation */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </header>
    );
};
