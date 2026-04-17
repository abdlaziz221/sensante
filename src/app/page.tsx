import PatientCard from "@/components/PatientCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">
        SénSanté
      </h1>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Patients
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PatientCard nom="Alioune Badara Barry" role="Bouclier" groupe={8} />
        <PatientCard nom="Sirima Mbodj" role="Oracle" groupe={8} />
        <PatientCard nom="Moctar Niang" role="Pilote" groupe={8} />
      </div>
    </main>
  );
}