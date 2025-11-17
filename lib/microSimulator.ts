export type ActiviteMicro =
  | 'vente'
  | 'prestations_bic'
  | 'prestations_bnc'
  | 'liberal_cipav'
  | 'location_meuble_tourisme';

export type RegimeFiscal = 'versement_liberatoire' | 'classique';

export interface SimulationMicroInput {
  caAnnuel: number;
  activite: ActiviteMicro;
  regimeFiscal: RegimeFiscal;
  accre?: boolean;
  tauxIrMoyen?: number; // ex : 0.11 = 11 %
  tauxCfpOverride?: number;
}

export interface ImpotResultat {
  type: RegimeFiscal;
  montant: number;
  tauxUtilise: number;
  revenuImposable: number;
}

export interface TvaInfo {
  statut: 'franchise_en_base' | 'zone_intermediaire' | 'tva_obligatoire';
  seuilFranchise: number;
  seuilMajore: number;
}

export interface SimulationMicroResultat {
  input: SimulationMicroInput;
  cotisationsSociales: number;
  cfp: number;
  impot: ImpotResultat;
  totalPrelevements: number;
  netAvantImpots: number;
  netApresImpots: number;
  tauxGlobalPrelevements: number;
  tva: TvaInfo;
  detailTaux: {
    tauxSocial: number;
    tauxCfp: number;
    tauxVersementLiberatoire: number;
    abattementIr: number;
  };
}

const TAUX_SOCIAL_NORMAL: Record<ActiviteMicro, number> = {
  vente: 0.123,
  prestations_bic: 0.212,
  prestations_bnc: 0.246,
  liberal_cipav: 0.232,
  location_meuble_tourisme: 0.06,
};

const TAUX_SOCIAL_ACRE: Record<ActiviteMicro, number> = {
  vente: 0.062,
  prestations_bic: 0.106,
  prestations_bnc: 0.123,
  liberal_cipav: 0.139,
  location_meuble_tourisme: 0.03,
};

const TAUX_VL: Record<ActiviteMicro, number> = {
  vente: 0.01,
  prestations_bic: 0.017,
  prestations_bnc: 0.022,
  liberal_cipav: 0.022,
  location_meuble_tourisme: 0.017,
};

const ABATTEMENT_IR: Record<ActiviteMicro, number> = {
  vente: 0.71,
  prestations_bic: 0.5,
  prestations_bnc: 0.34,
  liberal_cipav: 0.34,
  location_meuble_tourisme: 0.5,
};

const TAUX_CFP_DEFAULT: Record<ActiviteMicro, number> = {
  vente: 0.001,
  prestations_bic: 0.003,
  prestations_bnc: 0.002,
  liberal_cipav: 0.002,
  location_meuble_tourisme: 0.003,
};

export function simulerMicroEntreprise(
  input: SimulationMicroInput
): SimulationMicroResultat {
  const {
    caAnnuel,
    activite,
    regimeFiscal,
    accre = false,
    tauxIrMoyen,
    tauxCfpOverride,
  } = input;

  if (caAnnuel <= 0) {
    const zero: SimulationMicroResultat = {
      input,
      cotisationsSociales: 0,
      cfp: 0,
      impot: {
        type: regimeFiscal,
        montant: 0,
        tauxUtilise: 0,
        revenuImposable: 0,
      },
      totalPrelevements: 0,
      netAvantImpots: 0,
      netApresImpots: 0,
      tauxGlobalPrelevements: 0,
      tva: {
        statut: 'franchise_en_base',
        seuilFranchise: activite === 'vente' || activite === 'location_meuble_tourisme' ? 85000 : 37500,
        seuilMajore: activite === 'vente' || activite === 'location_meuble_tourisme' ? 93500 : 41250,
      },
      detailTaux: {
        tauxSocial: 0,
        tauxCfp: 0,
        tauxVersementLiberatoire: 0,
        abattementIr: 0,
      },
    };
    return zero;
  }

  const tauxSocial = accre ? TAUX_SOCIAL_ACRE[activite] : TAUX_SOCIAL_NORMAL[activite];
  const tauxCfp = tauxCfpOverride ?? TAUX_CFP_DEFAULT[activite];

  const seuilFranchise =
    activite === 'vente' || activite === 'location_meuble_tourisme' ? 85000 : 37500;
  const seuilMajore =
    activite === 'vente' || activite === 'location_meuble_tourisme' ? 93500 : 41250;

  let tvaStatut: TvaInfo['statut'];
  if (caAnnuel <= seuilFranchise) {
    tvaStatut = 'franchise_en_base';
  } else if (caAnnuel >= seuilMajore) {
    tvaStatut = 'tva_obligatoire';
  } else {
    tvaStatut = 'zone_intermediaire';
  }

  const cotisationsSociales = caAnnuel * tauxSocial;
  const cfp = caAnnuel * tauxCfp;

  const tauxVL = TAUX_VL[activite];
  const abattementIr = ABATTEMENT_IR[activite];

  let impot: ImpotResultat;
  if (regimeFiscal === 'versement_liberatoire') {
    const montant = caAnnuel * tauxVL;
    impot = {
      type: regimeFiscal,
      montant,
      tauxUtilise: tauxVL,
      revenuImposable: 0,
    };
  } else {
    const baseImposable = caAnnuel * (1 - abattementIr);
    const tauxIrEffectif = tauxIrMoyen ?? 0.11;
    const montant = baseImposable * tauxIrEffectif;
    impot = {
      type: regimeFiscal,
      montant,
      tauxUtilise: tauxIrEffectif,
      revenuImposable: baseImposable,
    };
  }

  const totalPrelevements = cotisationsSociales + cfp + impot.montant;
  const netAvantImpots = caAnnuel - cotisationsSociales - cfp;
  const netApresImpots = caAnnuel - totalPrelevements;
  const tauxGlobalPrelevements = totalPrelevements / caAnnuel;

  return {
    input,
    cotisationsSociales,
    cfp,
    impot,
    totalPrelevements,
    netAvantImpots,
    netApresImpots,
    tauxGlobalPrelevements,
    tva: {
      statut: tvaStatut,
      seuilFranchise,
      seuilMajore,
    },
    detailTaux: {
      tauxSocial,
      tauxCfp,
      tauxVersementLiberatoire: tauxVL,
      abattementIr,
    },
  };
}
