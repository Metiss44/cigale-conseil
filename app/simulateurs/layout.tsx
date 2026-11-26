import type { Metadata, ResolvingMetadata } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { openGraph } = await parent;
  return {
    alternates: { canonical: './' },
    openGraph: { ...openGraph, url: './' },
  };
}

export default function SimulateursLayout({ children }: { children: ReactNode }) {
  return children;
}
