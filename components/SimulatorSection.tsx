// components/SimulatorSection.tsx
"use client";

import { useState } from 'react';

type StatutType = 'auto-entrepreneur' | 'sasu' | 'sarl';

type ResultatSimulation = {
  cotisationsMensuelles?: number;
  revenuNetAnnuel?: number;
  revenuNetApresImpotsAnnuel?: number;
  cotisations?: number;
  revenuNet?: number;
  revenuNetApresImpot?: number;
};

export const SimulatorSection: React.FC = () => {
  const [statut, setStatut] = useState<StatutType>('auto-entrepreneur');
  const [montant, setMontant] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<ResultatSimulation | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setResultat(null);

    const montantNumber = Number(montant);
    if (!montantNumber || montantNumber <= 0) {
      setErreur("Merci de saisir un montant valide.");
      return;
    }

    setLoading(true);
    try {
      let endpoint = '';
      let body = {};

      if (statut === 'auto-entrepreneur') {
        endpoint = '/api/urssaf/autoentrepreneur';
        body = { chiffreAffaires: montantNumber };
      } else if (statut === 'sasu') {
        endpoint = '/api/simulateur/sasu';
        body = { remunerationTotale: montantNumber };
      } else if (statut === 'sarl') {
        endpoint = '/api/simulateur/sarl';
        body = { remunerationTotale: montantNumber };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
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

  function formatEuroMontant(montant: number | undefined, suffix?: string) {
    if (!montant || montant === 0 || isNaN(montant)) return '-';
    return (
      montant.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }) + ' €' + (suffix ? ` / ${suffix}` : '')
    );
  }

  const getFieldLabel = () => {
    if (statut === 'auto-entrepreneur') {
      return "Chiffre d'affaires annuel (en €)";
    }
    return "Budget total annuel pour la rémunération (charges incluses, en €)";
  };

  const getTitle = () => {
    if (statut === 'auto-entrepreneur') return 'Micro-entreprise (Auto-entrepreneur)';
    if (statut === 'sasu') return 'SASU (Assimilé salarié)';
    if (statut === 'sarl') return 'SARL (Gérant majoritaire - TNS)';
    return '';
  };

  const getCotisationsLabel = () => {
    if (statut === 'auto-entrepreneur') return 'Cotisations & contributions sociales';
    return 'Charges sociales';
  };

  return (
    <section id="simulateur" className="py-16 bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-slate-100">
          <h2 className="text-2xl font-semibold mb-2">
            Simulateur de revenus
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Estimez vos charges sociales et revenus nets selon votre statut juridique. 
            Calculs basés sur le moteur officiel Mon-entreprise / URSSAF (résultats indicatifs).
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Statut juridique
              </label>
              <select
                value={statut}
                onChange={(e) => {
                  setStatut(e.target.value as StatutType);
                  setResultat(null);
                  setErreur(null);
                }}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              >
                <option value="auto-entrepreneur">Micro-entreprise (Auto-entrepreneur)</option>
                <option value="sasu">SASU (Assimilé salarié)</option>
                <option value="sarl">SARL (Gérant majoritaire)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {getFieldLabel()}
              </label>
              <input
                type="number"
                min={0}
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                placeholder="Ex : 45000"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-medium px-4 py-2 disabled:opacity-60"
            >
              {loading ? 'Calcul en cours…' : 'Lancer la simulation'}
            </button>
          </form>

          {erreur && (
            <div className="mb-4 text-sm text-red-600">
              {erreur}
            </div>
          )}

          {resultat && (
            <div className="space-y-4">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {getTitle()}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    {getCotisationsLabel()}
                  </span>
                  <span className="font-semibold">
                    {formatEuroMontant(
                      resultat.cotisationsMensuelles ?? resultat.cotisations,
                      statut === 'auto-entrepreneur' ? 'mois' : 'an'
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Revenu net (avant impôt)
                  </span>
                  <span className="font-semibold">
                    {formatEuroMontant(
                      resultat.revenuNetAnnuel ?? resultat.revenuNet,
                      'an'
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Revenu net après impôt
                  </span>
                  <span className="font-semibold">
                    {formatEuroMontant(
                      resultat.revenuNetApresImpotsAnnuel ?? resultat.revenuNetApresImpot,
                      'an'
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
                💡 Simulation indicative basée sur les barèmes URSSAF. Elle ne remplace pas un calcul personnalisé avec un expert-comptable.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
