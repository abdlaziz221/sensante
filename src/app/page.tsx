// src/app/page.tsx
import Header from "@/components/Header";
import PatientCard from "@/components/PatientCard";
import LoginButton from "@/components/LoginButton";
import ConsultationCard from "@/components/ConsultationCard";
import AlerteIA from "@/components/AlerteIA";
import StatCard from "@/components/StatCard";

export default function Home() {
  // Données d'exemple pour tester les composants
  const stats = [
    { titre: "Patients suivis", valeur: 1247, unite: "patients", couleur: "border-teal-500" },
    { titre: "Consultations", valeur: 342, unite: "ce mois", couleur: "border-blue-500" },
    { titre: "Alertes IA", valeur: 8, unite: "urgentes", couleur: "border-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - 7.1 */}
      <Header />

      <main className="container mx-auto p-6">
        {/* Section des statistiques - 7.6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Section principale avec 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche : Patients récents - 7.2 */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              👥 Patients récents
            </h2>
            <PatientCard 
              nom="Aminata Diallo"
              region="Dakar"
              age={34}
              sexe="F"
            />
            <PatientCard 
              nom="Mamadou Sow"
              region="Thiès"
              age={45}
              sexe="M"
            />
            <PatientCard 
              nom="Fatou Ndiaye"
              region="Saint-Louis"
              age={28}
              sexe="F"
            />
          </div>

          {/* Colonne centrale : Consultations - 7.4 */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                📋 Consultations
              </h2>
              <LoginButton /> {/* 7.3 */}
            </div>
            <ConsultationCard 
              patient="Oumar Fall"
              date="15 mars 2025 - 14:30"
              symptomes="Fièvre, toux, fatigue depuis 3 jours"
              statut="en_attente"
            />
            <ConsultationCard 
              patient="Marie Diop"
              date="15 mars 2025 - 11:00"
              symptomes="Douleurs thoraciques, essoufflement"
              statut="termine"
            />
          </div>

          {/* Colonne droite : Alertes IA - 7.5 */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🤖 Alertes IA
            </h2>
            <AlerteIA 
              diagnostic="Risque modéré d'hypertension"
              confiance={85}
              niveau="moyen"
            />
            <AlerteIA 
              diagnostic="Suspicion de paludisme - Test recommandé"
              confiance={92}
              niveau="urgent"
            />
            <AlerteIA 
              diagnostic="Anomalie bénigne détectée"
              confiance={67}
              niveau="faible"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
