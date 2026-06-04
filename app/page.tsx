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
import Script from 'next/script';
import { faqItems } from '@/data/faq';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  '@id': 'https://cigaleconseil.fr/#organization',
  name: 'Cigale Conseil',
  legalName: 'CIGALE CONSEIL',
  alternateName: ['Cigale Conseil Montpellier', 'Cabinet Cigale Conseil'],
  description: 'Cabinet d\'expertise comptable fondé par Eva Perez, spécialisé dans l\'accompagnement des entrepreneurs, freelances, associations et projets engagés.',
  url: 'https://cigaleconseil.fr',
  logo: 'https://cdn.cigaleconseil.fr/illustrations/logo-cigale.webp',
  image: 'https://cdn.cigaleconseil.fr/illustrations/photo-eva-1.webp',
  telephone: '+33668850035',
  email: 'e.perez@cigaleconseil.fr',
  foundingDate: '2025-04-14',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'SIREN',
    value: '945022846',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: '+33668850035',
    email: 'e.perez@cigaleconseil.fr',
    availableLanguage: ['fr'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '215 rue du comté de Melgueil',
    addressLocality: 'Montpellier',
    postalCode: '34000',
    addressCountry: 'FR',
  },
  founder: {
    '@type': 'Person',
    '@id': 'https://cigaleconseil.fr/#eva-perez',
    name: 'Eva Perez',
    jobTitle: 'Experte-comptable',
    sameAs: 'https://www.linkedin.com/in/eva-perez-a62b6a138/',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Montpellier',
    },
    {
      '@type': 'Country',
      name: 'France',
    },
  ],
  knowsAbout: [
    'expertise comptable',
    'création d’entreprise',
    'comptabilité',
    'fiscalité',
    'pilotage d’entreprise',
    'conseil aux entrepreneurs',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/cigaleconseil/',
    'https://www.linkedin.com/in/eva-perez-a62b6a138/',
    'https://www.pappers.fr/entreprise/cigale-conseil-945022846',
    'https://www.societe.com/societe/cigale-conseil-945022846.html',
    'https://annuaire.experts-comptables.org/expert-comptable/38081-cigale-conseil-montpellier-34000',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://cigaleconseil.fr/#website',
  name: 'Cigale Conseil',
  url: 'https://cigaleconseil.fr',
  inLanguage: 'fr-FR',
  publisher: {
    '@id': 'https://cigaleconseil.fr/#organization',
  },
};

export default function Home() {
    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden">
            <script
                id="faq-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                id="local-business-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <script
                id="website-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
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
