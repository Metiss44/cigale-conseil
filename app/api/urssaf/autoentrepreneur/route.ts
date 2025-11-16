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
    const {
      chiffreAffaires,
      natureActivite,
      versementLiberatoire,
    } = body;

    // ✅ Vérifs basiques
    if (!chiffreAffaires || isNaN(Number(chiffreAffaires))) {
      return NextResponse.json(
        { error: 'chiffreAffaires manquant ou invalide' },
        { status: 400 }
      );
    }

    if (!natureActivite) {
      return NextResponse.json(
        { error: 'natureActivite manquante' },
        { status: 400 }
      );
    }

    // ✅ Situation de base pour un auto-entrepreneur
    const situation: Record<string, string> = {
      "dirigeant . auto-entrepreneur": "oui",
      "dirigeant . auto-entrepreneur . chiffre d'att\u00e9faires": `${chiffreAffaires} €/an`,
    };

    // ✅ Nature de l’activité
    // Les libellés sont à caler sur ceux du simulateur officiel.
    // Si certains ne matchent pas, l’API utilisera ses valeurs par défaut,
    // mais ça ne cassera pas la simulation.
    if (natureActivite === 'commerce') {
      situation["dirigeant . auto-entrepreneur . nature de l'activité"] =
        'commerce';
    } else if (natureActivite === 'service') {
      situation["dirigeant . auto-entrepreneur . nature de l'activité"] =
        'prestations de service commerciales ou artisanales';
    } else if (natureActivite === 'liberal') {
      situation["dirigeant . auto-entrepreneur . nature de l'activité"] =
        'profession libérale';
    }

    // ✅ Versement libératoire de l’impôt
    situation[
      "dirigeant . auto-entrepreneur . imp\u00f4t . versement lib\u00e9ratoire"
    ] = versementLiberatoire === 'oui' ? 'oui' : 'non';

    // ✅ Expressions à calculer
    const payload = {
      situation,
      expressions: [
        "dirigeant . auto-entrepreneur . cotisations et contributions",
        "dirigeant . auto-entrepreneur . revenu net",
        "dirigeant . auto-entrepreneur . revenu net . après impôt",
      ],
    };

    const apiRes = await fetch(
      'https://mon-entreprise.urssaf.fr/api/v1/evaluate',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

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
      revenuNetApresImpotsAnnuel: revenuNetApresImpots?.nodeValue ?? 0,
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

