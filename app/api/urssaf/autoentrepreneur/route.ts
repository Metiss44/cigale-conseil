// app/api/urssaf/autoentrepreneur/route.ts
import { NextResponse } from 'next/server';

type ResultatSimulation = {
  cotisationsMensuelles: number;
  revenuNetAnnuel: number;
  revenuNetApresImpotsAnnuel: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { chiffreAffaires, activite } = body;

    if (!chiffreAffaires || isNaN(Number(chiffreAffaires))) {
      return NextResponse.json(
        { error: 'chiffreAffaires manquant ou invalide' },
        { status: 400 }
      );
    }

    if (!activite || !['service', 'sales', 'liberal'].includes(activite)) {
      return NextResponse.json(
        { error: 'activite manquante ou invalide (service|sales|liberal)' },
        { status: 400 }
      );
    }

    const ACTIVITY_LABELS: Record<string, string> = {
      service: "Prestations de service",
      sales: "Ventes de marchandises",
      liberal: "Professions libérales"
    };

    // Payload envoyé à l’API URSSAF
    const payload = {
      situation: {
        "dirigeant . auto-entrepreneur": "oui",
        "dirigeant . auto-entrepreneur . chiffre d'affaires": `${chiffreAffaires} €/an`,
        "dirigeant . auto-entrepreneur . activité principale": ACTIVITY_LABELS[activite]
      },
      expressions: [
        "dirigeant . auto-entrepreneur . cotisations et contributions",
        "dirigeant . auto-entrepreneur . revenu net",
        "dirigeant . auto-entrepreneur . revenu net . après impôt"
      ]
    };

    const apiRes = await fetch('https://mon-entreprise.urssaf.fr/api/v1/evaluate', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      console.error('Erreur API URSSAF', apiRes.status, text);
      return NextResponse.json(
        { error: 'Erreur lors de la simulation URSSAF' },
        { status: 500 }
      );
    }

    const data = await apiRes.json();

    // L’API renvoie un tableau "evaluate" dans l’ordre des expressions
    const [cotisations, revenuNet, revenuNetApresImpots] = data.evaluate || [];

    // Helper to coerce different shapes into a number (tries several strategies)
    const parseNode = (node: any): number => {
      if (node == null) return 0;
      // node could be a number, a string, or an object with nodeValue / value
      const candidate = node.nodeValue ?? node.value ?? node;
      if (candidate == null) return 0;
      if (typeof candidate === 'number') return candidate;
      if (typeof candidate === 'string') {
        // extract first numeric substring (handles "1 234 €", "1234", "1 234,56")
        const m = candidate.match(/[-+]?\d[\d\s\u202f\.,]*/);
        if (!m) return 0;
        let s = m[0];
        // normalize spaces (including non-breaking) and replace comma with dot when appropriate
        s = s.replace(/\u202f|\s/g, '');
        // if both comma and dot present, assume dot is decimal sep and remove commas
        if (s.includes(',') && s.includes('.')) {
          s = s.replace(/,/g, '');
        } else if (s.includes(',')) {
          s = s.replace(/,/, '.');
        }
        const n = Number(s);
        return Number.isFinite(n) ? n : 0;
      }
      return 0;
    };

    const resultat: ResultatSimulation = {
      cotisationsMensuelles: parseNode(cotisations),
      revenuNetAnnuel: parseNode(revenuNet),
      revenuNetApresImpotsAnnuel: parseNode(revenuNetApresImpots)
    };

    // Include raw API response for debugging so we can see why values are empty
    return NextResponse.json({ resultat, debug: data });
  } catch (error) {
    console.error('Erreur interne URSSAF', error);
    return NextResponse.json(
      { error: 'Erreur interne serveur' },
      { status: 500 }
    );
  }
}

