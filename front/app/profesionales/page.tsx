import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ProfessionalHero } from "@/components/professional/ProfessionalHero";
import { DashboardTourSection } from "@/components/professional/DashboardTourSection";
import { ProfessionalFaqCta } from "@/components/professional/ProfessionalFaqCta";

export const metadata: Metadata = {
  title: "SugarCoach · Profesionales",
  description:
    "Dashboard SugarCoach para profesionales: Tiempo en Rango, glucosa vs. insulina y adherencia en modo solo lectura. Solicite acceso al panel profesional.",
};

// Orden 1:1 con `profesionales.html`: Hero(1) → Dashboard médico + flujo
// típico(2) → FAQ de profesionales + CTA de acceso(4, sin sección 3 propia).
export default function ProfesionalesPage() {
  return (
    <main className="w-full min-h-[calc(100vh-80px)] bg-surface pt-[124px] lg:pt-20">
      <Navbar />
      <div className="flex w-full flex-col">
        <ProfessionalHero />
        <DashboardTourSection />
        <ProfessionalFaqCta />
      </div>
      <Footer />
    </main>
  );
}
