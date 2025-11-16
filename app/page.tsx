import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Expertise } from '@/components/Expertise';
import { WhyUs } from '@/components/WhyUs';
import { Services } from '@/components/Services';
import { Values } from '@/components/Values';
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
                <Expertise />
                <WhyUs />
                <Services />
                <Values />
                <Video />
                <Reviews />
                <Instagram />
                <Contact />
            </main>
            <FooterWrapper />
        </div>
    );
}
