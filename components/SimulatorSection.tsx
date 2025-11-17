// components/SimulatorSection.tsx
"use client";

import { useState } from 'react';
import {
  simulerMicroEntreprise,
  type ActiviteMicro,
  type RegimeFiscal,
  type SimulationMicroResultat,
  type SimulationMicroInput,
} from '@/lib/microSimulator';

export const SimulatorSection: React.FC = () => {
  const [caAnnuel, setCaAnnuel] = useState<string>('');
  const [activite, setActivite] = useState<ActiviteMicro>('prestations_bnc');
  const [regimeFiscal, setRegimeFiscal] = useState<RegimeFiscal>('versement_liberatoire');
  const [tauxCfpOverride, setTauxCfpOverride] = useState<string>('');

  const [resultat, setResultat] = useState<SimulationMicroResultat | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  function parseDecimal(input: string | number | undefined): number | undefined {
    if (input == null || input === '') return undefined;
    const n = typeof input === 'number' ? input : Number(String(input).replace(',', '.'));
    if (Number.isNaN(n)) return undefined;
    // if user entered 11 assume percent -> 0.11
    if (n > 1) return n / 100;
    return n;
  }

  function formatEuro(m: number) {
    return m.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' €';
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setResultat(null);

    const ca = Number(caAnnuel);
    if (!ca || ca <= 0) {
      setErreur("Merci de saisir un chiffre d'affaires annuel valide.");
      return;
    }

    // For 'classique' regime we DO NOT calculate IR here (insufficient data).
    // We pass tauxIrMoyen = 0 to the simulator so it returns revenuImposable but
    // an impot.montant = 0. For versement libératoire we let the function use
    // the fixed VL rates.
    const tauxCfp = parseDecimal(tauxCfpOverride);
    const tauxIrToPass = regimeFiscal === 'classique' ? 0 : undefined;

    const input: SimulationMicroInput = {
      caAnnuel: ca,
      activite,
      regimeFiscal,
      tauxIrMoyen: tauxIrToPass,
      tauxCfpOverride: tauxCfp,
    };

    try {
      const res = simulerMicroEntreprise(input);
      setResultat(res);
    } catch (err) {
      console.error(err);
      setErreur('Erreur lors du calcul.');
    }
  }

  return (
  <section id="simulateur" className="py-16 bg-brand-cream">
      <div className="container mx-auto px-6">
  <h2 className="text-3xl font-bold text-center text-brand-sage-dark mb-8">Simulateur — micro-entreprise</h2>
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-brand-sage-light">
          <h3 className="text-2xl font-semibold mb-2 text-brand-sage-dark">Estimation rapide</h3>
          <p className="text-sm text-brand-sage-gray mb-6">Estimez vos cotisations sociales, CFP et impôt (indication).</p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-brand-sage-dark mb-1">Chiffre d'affaires annuel (TTC)</label>
              <input
                type="number"
                min={0}
                value={caAnnuel}
                onChange={(e) => setCaAnnuel(e.target.value)}
                className="w-full rounded-lg border border-brand-sage-light px-3 py-2 text-sm focus:ring-brand-sage-medium focus:border-brand-sage-medium"
                placeholder="Ex : 30000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-sage-dark mb-1">Nature de l'activité</label>
              <select value={activite} onChange={(e) => setActivite(e.target.value as ActiviteMicro)} className="w-full rounded-lg border border-brand-sage-light px-3 py-2 text-sm focus:ring-brand-sage-medium focus:border-brand-sage-medium">
                <option value="vente">Vente / Restauration / Hébergement</option>
                <option value="prestations_bic">Prestations de service (BIC)</option>
                <option value="prestations_bnc">Prestations (BNC)</option>
                <option value="liberal_cipav">Libéral (CIPAV)</option>
                <option value="location_meuble_tourisme">Location meublée tourisme</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-brand-sage-dark mb-1">Régime fiscal</label>
                <select value={regimeFiscal} onChange={(e) => setRegimeFiscal(e.target.value as RegimeFiscal)} className="w-full rounded-lg border border-brand-sage-light px-3 py-2 text-sm focus:ring-brand-sage-medium focus:border-brand-sage-medium">
                  <option value="versement_liberatoire">Versement libératoire</option>
                  <option value="classique">Régime classique</option>
                </select>
              </div>

              {/* ACRE option temporarily removed */}
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-brand-sage-dark mb-1">Taux CFP (optionnel en %)</label>
                <input type="number" min={0} step="0.01" value={tauxCfpOverride} onChange={(e) => setTauxCfpOverride(e.target.value)} className="w-full rounded-lg border border-brand-sage-light px-3 py-2 text-sm focus:ring-brand-sage-medium focus:border-brand-sage-medium" placeholder="laisser vide pour défaut" />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-brand-sage-medium text-white text-sm font-medium px-4 py-2 hover:bg-brand-sage-dark transition-colors">Lancer la simulation</button>
              <button type="button" onClick={() => { setCaAnnuel(''); setResultat(null); setErreur(null); setTauxCfpOverride(''); }} className="inline-flex items-center justify-center rounded-lg bg-transparent border border-brand-sage-light text-brand-sage-dark text-sm px-4 py-2 hover:bg-brand-sage-light transition-colors">Réinitialiser</button>
            </div>
          </form>

          {erreur && <div className="mb-4 text-sm text-red-600">{erreur}</div>}

          {resultat && (
            <div className="space-y-4">
              <div className="text-xs font-medium text-brand-sage-gray uppercase tracking-wide">Résultats</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-sage-gray">Cotisations sociales</span>
                  <span className="font-semibold text-brand-sage-dark">{formatEuro(resultat.cotisationsSociales)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-sage-gray">Contribution formation professionnelle (CFP)</span>
                  <span className="font-semibold text-brand-sage-dark">{formatEuro(resultat.cfp)}</span>
                </div>
                {regimeFiscal === 'versement_liberatoire' ? (
                  <div className="flex justify-between">
                    <span className="text-brand-sage-gray">Impôt (Versement libératoire)</span>
                    <span className="font-semibold text-brand-sage-dark">{formatEuro(resultat.impot.montant)}</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-brand-sage-gray">Revenu imposable (après abattement)</span>
                      <span className="font-semibold text-brand-sage-dark">{formatEuro(resultat.impot.revenuImposable)}</span>
                    </div>
                    <div className="text-xs text-brand-sage-gray">Ce revenu imposable doit être ajouté à vos autres revenus pour calculer l'impôt selon votre situation familiale et le barème progressif (non calculé ici).</div>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-brand-sage-gray">Total prélèvements</span>
                  <span className="font-semibold text-brand-sage-dark">{formatEuro(resultat.totalPrelevements)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-sage-gray">Net avant impôts</span>
                  <span className="font-semibold text-brand-sage-dark">{formatEuro(resultat.netAvantImpots)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-sage-gray">Net après impôts</span>
                  <span className="font-semibold text-brand-sage-dark">{formatEuro(resultat.netApresImpots)}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-brand-sage-light/30 rounded-lg text-xs text-brand-sage-gray">💡 Simulation indicative. Ne remplace pas un calcul personnalisé.</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
