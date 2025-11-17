// app/api/simulateur/sasu/route.ts
import { NextRequest, NextResponse } from 'next/server';

const URSSAF_API_URL = 'https://mon-entreprise.urssaf.fr/api/v1/evaluate';

type ResultatSimulationSASU = {
  cotisations: number;
  revenuNet: number;
  revenuNetApresImpot: number;
};

export async function POST(req: NextRequest) {
  try {
    const { remunerationTotale } = await req.json();

    if (!remunerationTotale) {
      return NextResponse.json(
        { error: 'remunerationTotale est obligatoire (ex: "45000 €/an")' },
        { status: 400 }
      );
    }

    const payload = {
      situation: {
        "dirigeant . assimilé salarié": "oui",
        "dirigeant . rémunération . totale": `${remunerationTotale} €/an`
      },
      expressions: [
        "dirigeant . assimilé salarié . cotisations et contributions",
        "dirigeant . rémunération . net",
        "dirigeant . rémunération . net . après impôt"
      ]
    };

    const res = await fetch(URSSAF_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Erreur URSSAF SASU:', text);
      return NextResponse.json(
        { error: 'Erreur côté URSSAF', details: text },
        { status: 500 }
      );
    }

    const data = await res.json();
    
    // L'API renvoie un tableau "evaluate" dans l'ordre des expressions
    const [cotisations, revenuNet, revenuNetApresImpot] = data.evaluate || [];

    const resultat: ResultatSimulationSASU = {
      cotisations: cotisations?.nodeValue ?? 0,
      revenuNet: revenuNet?.nodeValue ?? 0,
      revenuNetApresImpot: revenuNetApresImpot?.nodeValue ?? 0
    };

    return NextResponse.json(resultat);
  } catch (e: any) {
    console.error('Erreur interne SASU:', e);
    return NextResponse.json(
      { error: 'Erreur interne', details: e?.message },
      { status: 500 }
    );
  }
}
