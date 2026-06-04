import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { HashScrollFix } from '@/components/HashScrollFix';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cigaleconseil.fr'),
  title: {
    default: 'Cigale Conseil — Expertise comptable engagée | Montpellier',
    template: '%s | Cigale Conseil',
  },
  description: 'Cabinet d\'expertise comptable fondé par Eva Perez à Montpellier. Accompagnement des entrepreneurs, freelances, associations et projets engagés. 100 % digital.',
  keywords: [
    'Cigale Conseil',
    'CIGALE CONSEIL',
    'Eva Perez',
    'expert comptable Montpellier',
    'cabinet expertise comptable Montpellier',
  ],
  authors: [{ name: 'Cigale Conseil', url: 'https://cigaleconseil.fr' }],
  creator: 'Cigale Conseil',
  publisher: 'Cigale Conseil',
  icons: {
    icon: 'https://cdn.cigaleconseil.fr/illustrations/favicon-cigale-conseil.png',
  },
  alternates: {
    canonical: 'https://cigaleconseil.fr',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Cigale Conseil',
    title: 'Cigale Conseil — Expertise comptable engagée | Montpellier',
    description: 'Cabinet d\'expertise comptable fondé par Eva Perez à Montpellier. Accompagnement des entrepreneurs, freelances, associations et projets engagés.',
    url: 'https://cigaleconseil.fr',
    images: [
      {
        url: 'https://cdn.cigaleconseil.fr/illustrations/photo-eva-1.webp',
        width: 1200,
        height: 630,
        alt: 'Eva Perez — Cigale Conseil, expertise comptable engagée',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cigale Conseil — Expertise comptable engagée',
    description: 'Cabinet d\'expertise comptable fondé par Eva Perez à Montpellier. Accompagnement des entrepreneurs, freelances et projets engagés.',
    images: ['https://cdn.cigaleconseil.fr/illustrations/photo-eva-1.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`scroll-smooth ${poppins.variable}`}>
      <body className={`${poppins.className} bg-brand-cream text-brand-sage-dark relative`}>
        {/* Background image for the first section (behind header + hero) - limited to hero height */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[100vh] max-h-[900px] pointer-events-none -z-10 hero-bg"
        />

        {children}
        <Suspense fallback={null}>
          <HashScrollFix />
        </Suspense>
      </body>
    </html>
  );
}
