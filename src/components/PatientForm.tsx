"use client";

import { useState } from "react";

export default function PatientForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);

    const formData = new FormData(form);
    const data = {
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
      dateNaissance: formData.get("dateNaissance"),
      sexe: formData.get("sexe"),
      telephone: formData.get("telephone"),
      adresse: formData.get("adresse"),
      region: formData.get("region"),
    };

    const res = await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      form.reset();
      onSuccess();
    }

    setLoading(false);
  }

  const regions = [
    "Dakar", "Thiès", "Saint-Louis",
    "Ziguinchor", "Tambacounda", "Kaolack",
    "Louga", "Fatick", "Kolda", "Matam",
    "Kaffrine", "Kédougou", "Sédhiou", "Diourbel",
  ];

  const inputClass =
    "p-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-teal-50 rounded-xl shadow-md p-6 space-y-4 border border-teal-100"
    >
      {/* Titre */}
      <h3 className="text-lg font-bold text-teal-800">
        Nouveau patient
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Nom</label>
          <input name="nom" placeholder="Ex: Diop" required className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Prénom</label>
          <input name="prenom" placeholder="Ex: Aminata" required className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Date de naissance</label>
          <input name="dateNaissance" type="date" required className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Sexe</label>
          <select name="sexe" required className={inputClass}>
            <option value="">Sélectionner...</option>
            <option value="F">Femme</option>
            <option value="M">Homme</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Téléphone <span className="text-gray-400 font-normal">(optionnel)</span></label>
          <input name="telephone" placeholder="Ex: 77 000 00 00" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Région</label>
          <select name="region" required className={inputClass}>
            <option value="">Sélectionner...</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-600">Adresse <span className="text-gray-400 font-normal">(optionnel)</span></label>
        <input name="adresse" placeholder="Ex: Rue 10, Médina" className={`w-full ${inputClass}`} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50"
      >
        {loading ? "Enregistrement..." : "✚ Enregistrer le patient"}
      </button>
    </form>
  );
}