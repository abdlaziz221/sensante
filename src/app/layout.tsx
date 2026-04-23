import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import LoginButton from "@/components/LoginButton";  // ← À AJOUTER

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SénSanté - Application de santé",
  description: "Application de gestion de santé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8 bg-gray-50">
            <header className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-teal-800">
                    SénSanté
                  </h1>
                  <p className="text-gray-600">Application de gestion de santé</p>
                </div>
                <LoginButton />
              </div>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
