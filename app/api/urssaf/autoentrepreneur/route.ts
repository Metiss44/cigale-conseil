import { NextResponse } from 'next/server';

type Activity = 'service' | 'sales' | 'liberal';

const RATES: Record<Activity, number> = {
  // NOTE: illustrative example rates (fractions, e.g. 0.22 = 22%) — adapt to current URSSAF rates if needed
  service: 0.22, // prestations de service (BIC/BNC approximatif)
  sales: 0.128,  // ventes de marchandises
  liberal: 0.22, // professions libérales (approx.)
};

function validateBody(body: any) {
  if (!body || typeof body !== 'object') return 'Invalid JSON body';
  const { revenue, activity } = body;
  if (typeof revenue !== 'number' || Number.isNaN(revenue) || revenue < 0) return 'Field "revenue" must be a non-negative number';
  if (!activity || !Object.keys(RATES).includes(activity)) return `Field "activity" must be one of: ${Object.keys(RATES).join(', ')}`;
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const err = validateBody(body);
    if (err) return NextResponse.json({ error: err }, { status: 400 });

    const { revenue, activity } = body as { revenue: number; activity: Activity };
    const rate = RATES[activity];

    // total URSSAF contribution (simple model)
    const contribution = +(revenue * rate).toFixed(2);
    const net = +(revenue - contribution).toFixed(2);

    // Simple illustrative breakdown (not an official split)
    const breakdown = {
      social: +(contribution * 0.7).toFixed(2),
      pension: +(contribution * 0.3).toFixed(2),
    };

    return NextResponse.json({
      revenue,
      activity,
      rate,
      contribution,
      net,
      breakdown,
      note: 'Rates are illustrative. Replace RATES with up-to-date URSSAF percentages for production use.'
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Invalid request' }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({
    ok: true,
    message: 'URSSAF auto-entrepreneur endpoint - POST { revenue: number, activity: "service"|"sales"|"liberal" }',
    activities: Object.keys(RATES),
  });
}
