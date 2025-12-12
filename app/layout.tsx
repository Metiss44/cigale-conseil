import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { HashScrollFix } from '@/components/HashScrollFix';

export const metadata: Metadata = {
  title: 'Cigale Conseil - Expertise comptable engagée',
  description: 'Cabinet d\'expertise comptable fondé par Eva Perez, spécialisé dans l\'accompagnement des entrepreneurs, projets engagés, associations et le secteur culturel.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://elfsightcdn.com/platform.js" defer></script>
      </head>
      <body className="bg-brand-cream text-brand-sage-dark relative">
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
