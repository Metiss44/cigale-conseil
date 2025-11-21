import { Header } from '@/components/Header';
import { FooterWrapper } from '@/components/FooterWrapper';
import { CicadaBackground } from '@/components/CicadaBackground';
import { Video } from '@/components/Video';
import { SectorsCarousel } from '@/components/SectorsCarousel';

export default function ParcoursPage() {
    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden">
            <CicadaBackground />
            <Header />
            <main className="pt-32 pb-20">
                {/* Parcours Hero Section */}
                <div className="text-center max-w-5xl mx-auto px-6 mb-24 md:mb-32">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-orange/10 to-brand-cream border border-brand-orange/20 mb-8 animate-fadeIn">
                        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-brand-orange">Expérience & vision</span>
                    </div>

                    {/* Title with gradient */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-sage-dark via-brand-orange to-brand-sage-dark bg-clip-text text-transparent animate-fadeIn">
                            Mon Parcours
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-brand-sage-gray max-w-3xl mx-auto leading-relaxed mb-8 animate-fadeIn opacity-90">
                        Une expertise construite sur le terrain, pour mieux comprendre vos réalités.
                    </p>
                    <p className="text-lg md:text-xl text-brand-sage-gray/80 max-w-2xl mx-auto leading-relaxed animate-fadeIn">
                        Découvrez comment mon expérience peut vous aider à relever vos défis entrepreneuriaux.
                    </p>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-3 mt-12">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-orange/50"></div>
                        <div className="w-3 h-3 rounded-full bg-brand-orange/30 animate-pulse"></div>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-orange/50"></div>
                    </div>
                </div>

                <div className="space-y-24 md:space-y-32">
                    <Video />
                    <SectorsCarousel />
                </div>
            </main>
            <FooterWrapper />
        </div>
    );
}
