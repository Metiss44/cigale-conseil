import { Header } from '@/components/Header';
import { FooterWrapper } from '@/components/FooterWrapper';
import { CicadaBackground } from '@/components/CicadaBackground';
import { Services } from '@/components/Services';
import { CompatibilityQuiz } from '@/components/CompatibilityQuiz';
import { ExpertiseDomains } from '@/components/ExpertiseDomains';

export default function ServicesPage() {
    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden">
            <CicadaBackground />
            <Header />
            <main className="pt-32 pb-20">
                {/* Services Hero Section */}
                <div className="text-center max-w-4xl mx-auto px-6 mb-20 md:mb-28">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-sage-dark mb-6 leading-tight">
                        Expertise et Accompagnement
                    </h1>
                    <p className="text-lg md:text-xl text-brand-sage-gray max-w-2xl mx-auto leading-relaxed">
                        Des solutions sur mesure pour chaque étape de votre vie d'entrepreneur.
                        Du lancement à la gestion quotidienne, je suis à vos côtés.
                    </p>
                </div>

                <div className="space-y-24 md:space-y-32">
                    <CompatibilityQuiz />
                    <Services />
                    <ExpertiseDomains />
                </div>
            </main>
            <FooterWrapper />
        </div>
    );
}
