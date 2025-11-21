import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { WhyUs } from '@/components/WhyUs';
import { FAQ } from '@/components/FAQ';
import { Reviews } from '@/components/Reviews';
import { Instagram } from '@/components/Instagram';
import { Contact } from '@/components/Contact';
import Partners from '@/components/Partners';
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
                <Reviews />
                <Instagram />
                <Partners />
                <FAQ />
                <Contact />
            </main>
            <FooterWrapper />
        </div>
    );
}
