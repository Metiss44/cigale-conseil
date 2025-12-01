import { Header } from '@/components/Header';
import { FooterWrapper } from '@/components/FooterWrapper';
import { CicadaBackground } from '@/components/CicadaBackground';
import { Services } from '@/components/Services';
import { CompatibilityQuiz } from '@/components/CompatibilityQuiz';
import { ExpertiseDomains } from '@/components/ExpertiseDomains';

import { SectorsCarousel } from '@/components/SectorsCarousel';

export default function ServicesPage() {
    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden">
            <CicadaBackground />
            <Header />
            <main className="pt-32 pb-20">
                {/* Services Hero Section */}
                <div className="text-center max-w-5xl mx-auto px-6 mb-24 md:mb-32">
                    {/* Title with gradient */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-sage-dark via-brand-blue-main to-brand-sage-dark bg-clip-text text-transparent animate-fadeIn">
                            Expertise et Accompagnement
                        </span>
                    </h1>

                    {/* Intro text */}
                    <div className="max-w-3xl mx-auto mt-12">
                        <p className="text-lg md:text-xl text-brand-sage-gray/90 leading-relaxed">
                            J'ai créé le travail de mes rêves : réaliser mon métier, qui est le conseil aux entreprises (autour de la comptabilité, fiscalité), avec l'envie d'accompagner correctement mes clients.
                        </p>
                        <p className="text-lg md:text-xl text-brand-sage-gray/90 leading-relaxed mt-4">
                            En apportant une approche moderne : payé pas pour de l'administratif, mais plutot pour du conseil et de l'accompagnement. L'utilisation de logiciels performants vous rendre egalement autonome, vous pouvez enfin gérer sans stress.
                        </p>
                    </div>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-3 mt-12">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-blue-main/50"></div>
                        <div className="w-3 h-3 rounded-full bg-brand-blue-main/30 animate-pulse"></div>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-blue-main/50"></div>
                    </div>
                </div>

                <div className="space-y-24 md:space-y-32">
                    <SectorsCarousel />
                    <CompatibilityQuiz />
                    <Services />
                </div>
            </main>
            <FooterWrapper />
        </div>
    );
}
