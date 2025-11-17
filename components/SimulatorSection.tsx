"use client";

import React, { useState } from 'react';

type ResultatSimulation = {
  cotisationsMensuelles: number;
  revenuNetAnnuel: number;
  revenuNetApresImpotsAnnuel: number;
};

export const SimulatorSection: React.FC = () => {
  const [chiffreAffaires, setChiffreAffaires] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<ResultatSimulation | null>(null);
  const [activite, setActivite] = useState<'service' | 'sales' | 'liberal'>('service');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setResultat(null);

    const caNumber = Number(chiffreAffaires);
    if (!caNumber || caNumber <= 0) {
      setErreur('Merci de saisir un chiffre d’affaires annuel valide.');
      return;
    }

    if (!activite) {
      setErreur('Merci de sélectionner la nature de l\'activité.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/urssaf/autoentrepreneur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chiffreAffaires: caNumber, activite })
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
        maximumFractionDigits: 0
      }) + ' €' + (suffix ? ` / ${suffix}` : '')
    );
  }

  return (
    <section id="simulateur" className="py-16 bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-slate-100">
          <h2 className="text-xl font-semibold mb-2">Simulateur auto-entrepreneur</h2>
          <p className="text-sm text-slate-500 mb-6">Calculez vos cotisations sociales et votre revenu net à partir de votre chiffre d’affaires annuel. Résultats indicatifs fournis par le moteur officiel.</p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Chiffre d’affaires annuel (en €)</label>
              <input
                type="number"
                min={0}
                value={chiffreAffaires}
                onChange={(e) => setChiffreAffaires(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                placeholder="Ex : 45000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nature de l'activité</label>
              <select
                value={activite}
                onChange={(e) => setActivite(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="service">Prestations de service (BNC/BIC - ex : consultants)</option>
                <option value="sales">Ventes de marchandises</option>
                <option value="liberal">Professions libérales</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-medium px-4 py-2 disabled:opacity-60">
                {loading ? 'Calcul en cours…' : 'Lancer la simulation'}
              </button>
              <button type="button" onClick={() => { setChiffreAffaires(''); setResultat(null); setErreur(null); }} className="inline-flex items-center justify-center rounded-lg bg-transparent border border-slate-200 text-sm px-4 py-2">Réinitialiser</button>
            </div>
          </form>

          {erreur && <div className="mb-4 text-sm text-red-600">{erreur}</div>}

          {resultat && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Cotisations & contributions sociales</span>
                <span className="font-semibold">{formatEuroMontant(resultat.cotisationsMensuelles, 'mois')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Revenu net (avant impôt)</span>
                <span className="font-semibold">{formatEuroMontant(resultat.revenuNetAnnuel, 'an')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Revenu net après impôt</span>
                <span className="font-semibold">{formatEuroMontant(resultat.revenuNetApresImpotsAnnuel, 'an')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
