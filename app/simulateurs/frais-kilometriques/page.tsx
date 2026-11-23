'use client';

import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { Header } from '@/components/Header';
import { FooterWrapper } from '@/components/FooterWrapper';
import { CicadaBackground } from '@/components/CicadaBackground';
import { Car, Bike, Zap, Calculator } from 'lucide-react';
import baremeData from '@/data/bareme-kilometrique-2025.json';

interface Coefficients {
    a: number;
    b: number;
}

interface PowerBand {
    label: string;
    min_cv: number;
    max_cv: number | null;
    coefficients: Record<string, Coefficients>;
}

interface DistanceBand {
    id: string;
    min_km: number;
    max_km: number | null;
}

interface Vehicle {
    label: string;
    distance_bands: DistanceBand[];
    power_bands: PowerBand[];
}

type VehicleType = keyof typeof baremeData.vehicles;

export default function SimulateurFraisKilometriques() {
    const [vehicleType, setVehicleType] = useState<VehicleType>('car_thermal_hybrid_hydrogen');
    const [powerCV, setPowerCV] = useState<number>(5);
    const [distance, setDistance] = useState<number>(10000);

    const vehicleIcons: Record<VehicleType, ReactElement> = {
        car_thermal_hybrid_hydrogen: <Car className="w-6 h-6" />,
        car_electric: <><Car className="w-6 h-6" /><Zap className="w-4 h-4 absolute -top-1 -right-1" /></>,
        motorcycle_thermal: <Bike className="w-6 h-6" />,
        motorcycle_electric: <><Bike className="w-6 h-6" /><Zap className="w-4 h-4 absolute -top-1 -right-1" /></>,
        moped_thermal: <Bike className="w-5 h-5" />,
        moped_electric: <><Bike className="w-5 h-5" /><Zap className="w-4 h-4 absolute -top-1 -right-1" /></>,
    };

    const calculateMileageAllowance = (): number | null => {
        const vehicle: Vehicle = baremeData.vehicles[vehicleType];

        // Find the appropriate power band
        const powerBand = vehicle.power_bands.find(band => {
            if (band.max_cv === null) return powerCV >= band.min_cv;
            return powerCV >= band.min_cv && powerCV <= band.max_cv;
        });

        if (!powerBand) return null;

        // Find the appropriate distance band
        const distanceBand = vehicle.distance_bands.find(band => {
            if (band.max_km === null) return distance >= band.min_km;
            return distance >= band.min_km && distance <= band.max_km;
        });

        if (!distanceBand) return null;

        const coeffs = powerBand.coefficients[distanceBand.id];
        if (!coeffs) return null;

        // Calculate: (a × d) + b or a × d depending on b value
        const calculatedAmount = coeffs.b > 0
            ? (coeffs.a * distance) + coeffs.b
            : coeffs.a * distance;

        return Math.round(calculatedAmount * 100) / 100;
    };

    const result = calculateMileageAllowance();
    const currentVehicle = baremeData.vehicles[vehicleType];

    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden bg-brand-cream">
            <CicadaBackground />
            <Header />
            <main className="pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-blue-main/10 to-brand-sage-light/50 border border-brand-blue-main/20 mb-6">
                                <Calculator className="w-4 h-4 text-brand-blue-main" />
                                <span className="text-sm font-medium text-brand-blue-main">Barème 2025</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-brand-sage-dark mb-4">
                                Simulateur Frais Kilométriques
                            </h1>
                            <p className="text-lg md:text-xl text-brand-sage-gray max-w-3xl mx-auto">
                                Calculez vos frais kilométriques déductibles selon le barème fiscal 2025.
                            </p>
                        </div>

                        {/* Info Section */}
                        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-brand-sage-light/30">
                            <h2 className="text-xl font-semibold text-brand-sage-dark mb-3">
                                💡 Comment ça marche ?
                            </h2>
                            <p className="text-brand-sage-gray mb-3">
                                Ce simulateur utilise le barème kilométrique officiel 2025 de l'administration fiscale française.
                                Sélectionnez votre type de véhicule, sa puissance fiscale et la distance parcourue pour obtenir le montant déductible.
                            </p>
                            <p className="text-brand-sage-gray">
                                Pour optimiser votre fiscalité et votre comptabilité,{' '}
                                <Link href="/#contact" className="text-brand-blue-main hover:text-brand-blue-soft font-semibold underline">
                                    contactez-nous
                                </Link>.
                            </p>
                        </div>

                        {/* Calculator */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-brand-sage-light/30">
                            {/* Vehicle Type Selection */}
                            <div className="mb-8">
                                <label className="block text-lg font-semibold text-brand-sage-dark mb-4">
                                    Type de véhicule
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Object.entries(baremeData.vehicles).map(([key, vehicle]) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setVehicleType(key as VehicleType);
                                                // Reset power to a valid value for the new vehicle type
                                                const firstBand = vehicle.power_bands[0];
                                                setPowerCV(firstBand.min_cv || 1);
                                            }}
                                            className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${vehicleType === key
                                                ? 'border-brand-blue-main bg-brand-blue-main/5 shadow-md'
                                                : 'border-brand-sage-light/30 hover:border-brand-blue-main/30 hover:bg-brand-sage-light/20'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="relative text-brand-blue-main mt-1">
                                                    {vehicleIcons[key as VehicleType]}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-brand-sage-dark text-sm leading-tight">
                                                        {vehicle.label}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Power Selection */}
                            <div className="mb-8">
                                <label className="block text-lg font-semibold text-brand-sage-dark mb-4">
                                    Puissance fiscale
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {currentVehicle.power_bands.map((band, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setPowerCV(band.min_cv || 0)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${powerCV >= band.min_cv && (band.max_cv === null || powerCV <= band.max_cv)
                                                ? 'border-brand-blue-main bg-brand-blue-main/5 shadow-md'
                                                : 'border-brand-sage-light/30 hover:border-brand-blue-main/30 hover:bg-brand-sage-light/20'
                                                }`}
                                        >
                                            <div className="text-center">
                                                <div className="font-semibold text-brand-sage-dark">{band.label}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Distance Input */}
                            <div className="mb-8">
                                <label className="block text-lg font-semibold text-brand-sage-dark mb-4">
                                    Distance annuelle professionnelle (km)
                                </label>
                                <input
                                    type="number"
                                    value={distance}
                                    onChange={(e) => setDistance(Number(e.target.value))}
                                    min="0"
                                    step="100"
                                    className="w-full p-4 text-lg rounded-xl border-2 border-brand-sage-light/30 focus:border-brand-blue-main focus:outline-none transition-colors"
                                    placeholder="Ex: 10000"
                                />
                                <div className="mt-3 flex gap-2 flex-wrap">
                                    {[5000, 10000, 15000, 20000, 25000].map((preset) => (
                                        <button
                                            key={preset}
                                            onClick={() => setDistance(preset)}
                                            className="px-4 py-2 text-sm rounded-lg bg-brand-sage-light/30 hover:bg-brand-sage-light/50 text-brand-sage-dark transition-colors"
                                        >
                                            {preset.toLocaleString('fr-FR')} km
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Result */}
                            {result !== null && (
                                <div className="bg-gradient-to-br from-brand-blue-main to-brand-sage-medium rounded-2xl p-8 text-white">
                                    <div className="text-center">
                                        <div className="text-lg font-medium mb-2 opacity-90">
                                            Montant déductible
                                        </div>
                                        <div className="text-5xl md:text-6xl font-bold mb-2">
                                            {result.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                                        </div>
                                        <div className="text-sm opacity-75">
                                            Pour {distance.toLocaleString('fr-FR')} km parcourus
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 bg-brand-sage-light/30 rounded-xl p-6 border border-brand-sage-light/30">
                            <h3 className="text-lg font-semibold text-brand-sage-dark mb-3">
                                📋 Informations importantes
                            </h3>
                            <ul className="space-y-2 text-brand-sage-gray">
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-blue-main mt-1">•</span>
                                    <span>Le barème kilométrique s'applique aux déplacements professionnels uniquement.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-blue-main mt-1">•</span>
                                    <span>Les véhicules électriques bénéficient d'un barème majoré de 20%.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-blue-main mt-1">•</span>
                                    <span>La puissance fiscale (CV) est indiquée sur votre carte grise.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-blue-main mt-1">•</span>
                                    <span>Ce simulateur est fourni à titre indicatif. Consultez votre expert-comptable pour une analyse personnalisée.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <FooterWrapper />
        </div>
    );
}
