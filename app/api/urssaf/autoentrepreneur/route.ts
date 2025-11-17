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

    const resultat: ResultatSimulation = {
      cotisationsMensuelles: cotisations?.nodeValue ?? 0,
      revenuNetAnnuel: revenuNet?.nodeValue ?? 0,
      revenuNetApresImpotsAnnuel: revenuNetApresImpots?.nodeValue ?? 0
    };

    return NextResponse.json(resultat);
  } catch (error) {
    console.error('Erreur interne simulateur URSSAF', error);
    return NextResponse.json(
      { error: 'Erreur interne serveur' },
      { status: 500 }
    );
  }
}

