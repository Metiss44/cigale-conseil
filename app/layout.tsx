import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cigale Conseil - Expertise comptable engagée',
  description: 'Cabinet d\'expertise comptable fondé par Eva Perez, spécialisé dans l\'accompagnement des entrepreneuses, projets engagés, associations et le secteur culturel.',
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
      <body className="bg-brand-cream text-brand-sage-dark">
        {/* Background image for the first section (behind header + hero) */}
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 h-screen pointer-events-none -z-10 hero-bg"
        />

        {children}
      </body>
    </html>
  );
}
