// app/simulateur-auto-entrepreneur/page.tsx
'use client';

import { useState } from 'react';

type ResultatSimulation = {
  cotisationsMensuelles: number;
  revenuNetAnnuel: number;
  revenuNetApresImpotsAnnuel: number;
};

export default function SimulateurAutoEntrepreneur() {
  const [chiffreAffaires, setChiffreAffaires] = useState<string>('');
  const [natureActivite, setNatureActivite] = useState<
    'commerce' | 'service' | 'liberal' | ''
  >('');
  const [versementLiberatoire, setVersementLiberatoire] = useState<'oui' | 'non'>('non');

  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<ResultatSimulation | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setResultat(null);

    const caNumber = Number(chiffreAffaires);

    if (!caNumber || caNumber <= 0) {
      setErreur('Merci de saisir un chiffre d’affaires annuel valide.');
      return;
    }

    if (!natureActivite) {
      setErreur('Merci de sélectionner la nature de votre activité.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/urssaf/autoentrepreneur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chiffreAffaires: caNumber,
          natureActivite,
          versementLiberatoire,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErreur(data.error || 'Erreur lors du calcul.');
      } else {
        setResultat(data as ResultatSimulation);
      }
    } catch (err) {
      console.error(err);
      setErreur('Erreur réseau, merci de réessayer.');
    } finally {
      setLoading(false);
    }
  }

  function formatEuroMontant(montant: number, suffix?: string) {
    if (montant === 0 || isNaN(montant)) return '-';
    return (
      montant.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + ' €' + (suffix ? ` / ${suffix}` : '')
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 border border-slate-100">
        <h1 className="text-2xl font-semibold mb-2">
          Simulateur micro-entreprise (auto-entrepreneur)
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Calculez vos cotisations sociales et votre revenu net à partir de votre
          chiffre d’affaires annuel. Calcul basé sur le moteur officiel de
          Mon-entreprise / URSSAF. Résultats indicatifs.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {/* CA annuel */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Chiffre d’affaires annuel (en €)
            </label>
            <input
              type="number"
              min={0}
              value={chiffreAffaires}
              onChange={(e) => setChiffreAffaires(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              placeholder="Ex : 45000"
            />
          </div>

          {/* Nature activité */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nature de l’activité
            </label>
            <select
              value={natureActivite}
              onChange={(e) =>
                setNatureActivite(e.target.value as 'commerce' | 'service' | 'liberal' | '')
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            >
              <option value="">Sélectionner…</option>
              <option value="commerce">Commerce / achat-revente</option>
              <option value="service">
                Prestations de service commerciales ou artisanales
              </option>
              <option value="liberal">Profession libérale</option>
            </select>
          </div>

          {/* Versement libératoire */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Versement libératoire de l’impôt sur le revenu
            </label>
            <select
              value={versementLiberatoire}
              onChange={(e) =>
                setVersementLiberatoire(e.target.value as 'oui' | 'non')
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            >
              <option value="non">Non</option>
              <option value="oui">Oui</option>
            </select>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-medium px-4 py-2 disabled:opacity-60"
          >
            {loading ? 'Calcul en cours…' : 'Lancer la simulation'}
          </button>
        </form>

        {/* Erreurs */}
        {erreur && (
          <div className="mb-4 text-sm text-red-600">
            {erreur}
          </div>
        )}

        {/* Résultats */}
        {resultat && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">
                Cotisations & contributions sociales
              </span>
              <span className="font-semibold">
                {formatEuroMontant(resultat.cotisationsMensuelles, 'mois')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Revenu net (avant impôt)</span>
              <span className="font-semibold">
                {formatEuroMontant(resultat.revenuNetAnnuel, 'an')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Revenu net après impôt</span>
              <span className="font-semibold">
                {formatEuroMontant(resultat.revenuNetApresImpotsAnnuel, 'an')}
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
