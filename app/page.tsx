import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { WhyUs } from '@/components/WhyUs';
import { Services } from '@/components/Services';
import { SimulatorSection } from '@/components/SimulatorSection';
import { CompatibilityQuiz } from '@/components/CompatibilityQuiz';
import { FAQ } from '@/components/FAQ';
import { Video } from '@/components/Video';
import { Reviews } from '@/components/Reviews';
import { Instagram } from '@/components/Instagram';
import { Contact } from '@/components/Contact';
import { FooterWrapper } from '@/components/FooterWrapper';
import { CicadaBackground } from '@/components/CicadaBackground';

export default function Home() {
    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden">
            <CicadaBackground />
            <Header />
            <main>
                <Hero />
                <About />
                <WhyUs />
                <Services />
                <SimulatorSection />
                <CompatibilityQuiz />
                <FAQ />
                <Video />
                <Reviews />
                <Instagram />
                <Contact />
            </main>
            <FooterWrapper />
        </div>
    );
}
