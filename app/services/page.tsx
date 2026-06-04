import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { FooterWrapper } from '@/components/FooterWrapper';
import { CicadaBackground } from '@/components/CicadaBackground';
import { Services } from '@/components/Services';
import { CompatibilityQuiz } from '@/components/CompatibilityQuiz';
import { ExpertiseDomains } from '@/components/ExpertiseDomains';
import { SectorsCarousel } from '@/components/SectorsCarousel';

export const metadata: Metadata = {
  title: 'Services Cigale Conseil — Expertise comptable à Montpellier',
  description: 'Découvrez les services de Cigale Conseil, cabinet d\'expertise comptable à Montpellier : création d\'entreprise, suivi comptable, fiscalité, pilotage et conseil.',
  alternates: { canonical: 'https://cigaleconseil.fr/services' },
  openGraph: {
    title: 'Services Cigale Conseil — Expertise comptable à Montpellier',
    description: 'Création d\'entreprise, suivi comptable, conseil stratégique et accompagnement sur-mesure par Cigale Conseil.',
    url: 'https://cigaleconseil.fr/services',
  },
};

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
                            Services Cigale Conseil : expertise comptable et accompagnement
                        </span>
                    </h1>

                    {/* Intro text */}
                    <div className="max-w-3xl mx-auto mt-12">
                        <p className="text-lg md:text-xl text-brand-sage-gray/90 leading-relaxed">
                            J'ai créé Cigale Conseil pour exercer mon métier d'experte-comptable autrement : conseiller les entreprises avec clarté sur leur comptabilité, leur fiscalité et leurs décisions de gestion.
                        </p>
                        <p className="text-lg md:text-xl text-brand-sage-gray/90 leading-relaxed mt-4">
                            Mon approche est moderne et orientée accompagnement : moins d'administratif inutile, plus de conseil utile, avec des outils performants pour suivre votre activité et gagner en autonomie sans stress.
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
