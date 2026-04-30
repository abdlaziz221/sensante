"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: formData.get("nom"),
        prenom: formData.get("prenom"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Erreur d'inscription");
    }
    setLoading(false);
  }

  const inputClass =
    "w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white transition";

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-teal-50 p-8 rounded-xl shadow-md w-full max-w-md border border-teal-100">

        <h1 className="text-2xl font-bold text-teal-800 mb-2 text-center">
          Inscription
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Créez votre compte SénSanté
        </p>

        {error && (
          <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
            ⚠️ {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Nom</label>
              <input
                name="nom"
                placeholder="Ex: Diop"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Prénom</label>
              <input
                name="prenom"
                placeholder="Ex: Aminata"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              placeholder="exemple@email.com"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Mot de passe</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50"
          >
            {loading ? "Inscription..." : "✚ Créer mon compte"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-teal-600 hover:underline font-semibold">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}