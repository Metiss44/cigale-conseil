import { Header } from '@/components/Header';
import { FooterWrapper } from '@/components/FooterWrapper';
import { CicadaBackground } from '@/components/CicadaBackground';
import { Video } from '@/components/Video';
import { SectorsCarousel } from '@/components/SectorsCarousel';
import { ExpertiseDomains } from '@/components/ExpertiseDomains';

export default function ParcoursPage() {
    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden">
            <CicadaBackground />
            <Header />
            <main className="pt-32">
                {/* Parcours Hero Section */}
                <div className="text-center max-w-5xl mx-auto px-6 mb-24 md:mb-32">
                    {/* Title with gradient */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-brand-sage-dark via-brand-orange to-brand-sage-dark bg-clip-text text-transparent animate-fadeIn">
                            Mon Parcours
                        </span>
                    </h1>

                    {/* Intro text */}
                    <div className="max-w-3xl mx-auto mt-12">
                        <p className="text-lg md:text-xl text-brand-sage-gray/90 leading-relaxed mb-4">
                            Depuis 2016, j'accompagne les entrepreneurs, associations et structures collaboratives avec une approche à la fois rigoureuse et humaine. Mon cheminement dans l'expertise comptable m'a amenée à évoluer dans des univers très variés - des TPE aux groupes de sociétés jusqu'aux structures hydrides collaboratives.
                        </p>
                        <p className="text-lg md:text-xl text-brand-sage-gray/90 leading-relaxed mb-4">
                            Chez Cigale conseil, je crois que la comptabilité ne se résume pas à des chiffres, mais qu'elle repose avant tout sur une relation humaine, sincère et durable.
                        </p>
                        <p className="text-lg md:text-xl text-brand-sage-gray/90 leading-relaxed">
                            Etre à vos côtés, c'est aussi comprendre vos parcours, vos ambitions et vos doutes. Cette proximité, je la cultive avec bienveillance et transparence, pour que chacun se sente accompagné avec clarté, sécurité et sérénité.
                        </p>
                    </div>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-3 mt-12">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-orange/50"></div>
                        <div className="w-3 h-3 rounded-full bg-brand-orange/30 animate-pulse"></div>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-orange/50"></div>
                    </div>
                </div>

                <div>
                    <ExpertiseDomains />
                    <Video />
                </div>
            </main>
            <FooterWrapper />
        </div>
    );
}
