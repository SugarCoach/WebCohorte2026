import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { UserTypesSection } from "@/components/landing/UserTypesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { GamificationSection } from "@/components/landing/GamificationSection";
import { DayInLifeSection } from "@/components/landing/DayInLifeSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TreatmentSection } from "@/components/landing/TreatmentSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { AwardsSection } from "@/components/landing/AwardsSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CtaSection, FaqSection } from "@/components/landing/FaqCta";
import { Footer } from "@/components/landing/Footer";
import {DoctorPreview} from "@/components/landing/DoctorPreview"


// Orden 1:1 con `index.html`: Hero(1) → Tres tipos de usuario(2) → Cómo
// funciona(3) → Gamificación(4) → Un día con SugarCoach(5) →
// Estadísticas(6) → Tratamiento(7) → Privacidad(8) → Reconocimientos(9) →
// Quiénes somos + equipo(10) → Testimonios(11) → CTA final(12) → FAQ(13).
export default function HomePage() {
  return (
    <main className="relative isolate w-full overflow-x-clip bg-bg-deep pt-20 font-body-md ...">
     <div aria-hidden className="page-ambient pointer-events-none absolute inset-0 -z-10" />
      <Navbar />
      <Hero />
      <UserTypesSection />
      <HowItWorksSection />
      <GamificationSection />
      <DayInLifeSection />
      <StatsSection />
      <TreatmentSection />
      <DoctorPreview />
      <PrivacySection />
      <AboutSection />
      <AwardsSection />
      <TestimonialsSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
