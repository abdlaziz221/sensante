"use client";

import { useState } from "react";

interface DiagnosticIAProps {
  consultationId: number;
  diagnosticExistant: string | null;
  confianceExistante: number | null;
  onDiagnostic: () => void;
}

export default function DiagnosticIA({
  consultationId,
  diagnosticExistant,
  confianceExistante,
  onDiagnostic,
}: DiagnosticIAProps) {
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<{
    diagnostic: string;
    confiance: number;
    recommandation: string;
    urgence: string;
  } | null>(null);

  async function lancer() {
    setLoading(true);
    const res = await fetch("/api/ia/diagnostic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consultationId }),
    });
    if (res.ok) {
      const data = await res.json();
      setResultat(data);
      onDiagnostic();
    }
    setLoading(false);
  }

  // Cas 1 : pas encore lancé ET pas de diagnostic en BDD → bouton
  if (!resultat && !diagnosticExistant) {
    return (
      <div className="mt-3">
        <button
          onClick={lancer}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 text-sm"
        >
          {loading ? "Analyse en cours..." : "Lancer le diagnostic IA"}
        </button>
      </div>
    );
  }

  // Cas 2 : diagnostic déjà en BDD MAIS pas de résultat fraîchement reçu → affichage minimal
  if (diagnosticExistant && !resultat) {
    return (
      <div className="mt-3 p-4 rounded-lg border-l-4 border-teal-500 bg-teal-50">
        <p className="font-bold text-teal-800">Diagnostic IA</p>
        <p className="text-sm text-gray-700 mt-1">{diagnosticExistant}</p>
        <p className="text-xs text-gray-500 mt-1">
          Confiance : {confianceExistante}%
        </p>
        <p className="text-xs text-gray-400 italic mt-2">
          Ceci n'est pas un diagnostic médical.
        </p>
      </div>
    );
  }

  // Cas 3 : résultat fraîchement reçu (priorité absolue) → affichage complet
  // resultat est garanti non-null à ce stade
  const couleurClasse =
    resultat!.urgence === "urgent"
      ? "border-red-500 bg-red-50"
      : resultat!.urgence === "moyen"
      ? "border-orange-500 bg-orange-50"
      : "border-green-500 bg-green-50";

  const badgeClasse =
    resultat!.urgence === "urgent"
      ? "bg-red-200 text-red-800"
      : resultat!.urgence === "moyen"
      ? "bg-orange-200 text-orange-800"
      : "bg-green-200 text-green-800";

  return (
    <div className="mt-3">
      <div className={`p-4 rounded-lg border-l-4 ${couleurClasse}`}>
        <div className="flex justify-between items-center">
          <p className="font-bold text-gray-800">Diagnostic IA</p>
          <span className={`text-xs px-2 py-1 rounded-full font-bold ${badgeClasse}`}>
            {resultat!.urgence.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-2">{resultat!.diagnostic}</p>
        <p className="text-sm text-gray-600 mt-2">{resultat!.recommandation}</p>
        <div className="mt-2">
          <p className="text-xs text-gray-500">
            Confiance : {resultat!.confiance}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${resultat!.confiance}%` }}
            ></div>
          </div>
        </div>
        <p className="text-xs text-gray-400 italic mt-3">
          Ceci n'est pas un diagnostic médical. Consultez un professionnel de santé.
        </p>
      </div>
    </div>
  );
}