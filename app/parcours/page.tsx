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
                <div className="text-center max-w-4xl mx-auto px-6 mb-20 md:mb-28">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-sage-dark mb-6 leading-tight">
                        Mon Parcours
                    </h1>
                    <p className="text-lg md:text-xl text-brand-sage-gray max-w-2xl mx-auto leading-relaxed">
                        Une expertise construite sur le terrain, pour mieux comprendre vos réalités.
                    </p>
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
