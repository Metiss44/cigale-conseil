"use client";

import React, { useState } from 'react';

export default function SimulatorPage() {
  const [chiffreAffaires, setChiffreAffaires] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const value = Number(chiffreAffaires);
    if (Number.isNaN(value) || value < 0) {
      setError('Veuillez entrer un chiffre d\'affaires valide (nombre positif)');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/urssaf/autoentrepreneur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chiffreAffaires: value })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Erreur lors de la simulation');
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err?.message || 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-sage-dark mb-4">Simulateur auto-entrepreneur</h1>
        <p className="text-sm text-brand-sage-gray mb-6">Entrez votre chiffre d'affaires annuel pour obtenir une estimation des cotisations et du revenu net (approx.).</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-sage-dark mb-2">Chiffre d'affaires annuel (€)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={chiffreAffaires}
              onChange={(e) => setChiffreAffaires(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-sage-medium"
              placeholder="Ex: 30000"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-brand-sage-medium text-white px-5 py-2 rounded-xl font-semibold hover:bg-brand-sage-dark transition"
              disabled={loading}
            >
              {loading ? 'Simulation en cours…' : 'Simuler'}
            </button>
            <button
              type="button"
              className="bg-transparent border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50"
              onClick={() => { setChiffreAffaires(''); setResult(null); setError(null); }}
            >
              Réinitialiser
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-600">{error}</div>
        )}

        {result && (
          <div className="mt-6 bg-brand-sage-light/40 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Résultat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm text-center">
                <div className="text-sm text-gray-500">Cotisations (mensuelles)</div>
                <div className="text-xl font-bold text-brand-sage-dark mt-2">{Number(result.cotisationsMensuelles ?? 0).toLocaleString()} €</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm text-center">
                <div className="text-sm text-gray-500">Revenu net annuel</div>
                <div className="text-xl font-bold text-brand-sage-dark mt-2">{Number(result.revenuNetAnnuel ?? 0).toLocaleString()} €</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm text-center">
                <div className="text-sm text-gray-500">Revenu net après impôts (annuel)</div>
                <div className="text-xl font-bold text-brand-sage-dark mt-2">{Number(result.revenuNetApresImpotsAnnuel ?? 0).toLocaleString()} €</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">Les résultats sont fournis à titre indicatif et proviennent de l'API officielle. Vérifiez les détails avant toute décision.</p>
          </div>
        )}
      </div>
    </main>
  );
}
