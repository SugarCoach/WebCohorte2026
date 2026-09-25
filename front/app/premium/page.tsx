"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Gift,
  ShieldCheck,
  Stethoscope,
  Building2,
  User,
  Mail,
  FileText,
  Calendar,
  Check,
  Copy,
  ChevronDown,
  X,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

interface PricingPlanFeature {
  text: string;
  included: boolean;
}

export default function PremiumPage() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Datos del formulario para vincular al médico
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientDni: "",
    doctorName: "",
    institutionOrLicense: "",
    province: "Buenos Aires",
  });

  const generatedCoupon = "SUGAR-ARG-6MESES-GRATIS";

  // Mismo texto en los dos planes salvo el ítem 6 (recompensas) y si está incluido o no.
  const SHARED_FEATURE_KEYS = [
    "premium.plans.feature1",
    "premium.plans.feature2",
    "premium.plans.feature3",
    "premium.plans.feature4",
    "premium.plans.feature5",
  ];

  const BASIC_FEATURES: PricingPlanFeature[] = [
    ...SHARED_FEATURE_KEYS.map((key) => ({ text: t(key), included: true })),
    { text: t("premium.plans.feature6Basic"), included: true },
    { text: t("premium.plans.feature7"), included: false },
    { text: t("premium.plans.feature8"), included: false },
    { text: t("premium.plans.feature9"), included: false },
    { text: t("premium.plans.feature10"), included: false },
  ];

  const PREMIUM_PLAN_FEATURES: PricingPlanFeature[] = [
    ...SHARED_FEATURE_KEYS.map((key) => ({ text: t(key), included: true })),
    { text: t("premium.plans.feature6Premium"), included: true },
    { text: t("premium.plans.feature7"), included: true },
    { text: t("premium.plans.feature8"), included: true },
    { text: t("premium.plans.feature9"), included: true },
    { text: t("premium.plans.feature10"), included: true },
  ];

  const PROVINCES: { value: string; labelKey: string }[] = [
    { value: "Buenos Aires", labelKey: "premium.form.province.buenosAires" },
    { value: "CABA", labelKey: "premium.form.province.caba" },
    { value: "Córdoba", labelKey: "premium.form.province.cordoba" },
    { value: "Santa Fe", labelKey: "premium.form.province.santaFe" },
    { value: "Mendoza", labelKey: "premium.form.province.mendoza" },
    { value: "Tucumán", labelKey: "premium.form.province.tucuman" },
    { value: "Entre Ríos", labelKey: "premium.form.province.entreRios" },
    { value: "Salta", labelKey: "premium.form.province.salta" },
    { value: "Otra provincia", labelKey: "premium.form.province.other" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientEmail || !formData.doctorName) return;
    setSubmitted(true);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(generatedCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-base text-text-primary">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        {/* Enlace para volver a la Home */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t("premium.backToHome")}</span>
          </Link>
        </div>

        {/* Header de la página Premium */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-500 dark:fill-amber-300 dark:text-amber-300" />
            {t("premium.badge")}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {t("premium.title")}
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-text-secondary">
            {t("premium.description")}
          </p>
        </div>

        {/* =========================================================================
         * BANNER DESTACADO: BENEFICIO PACIENTES EN ARGENTINA
         * ========================================================================= */}
        <div className="mb-12 overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent p-6 shadow-xl dark:border-sky-400/25 dark:bg-[#07132B] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-700 dark:text-sky-300 shadow-sm">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                  {t("premium.banner.badge")}
                </span>
                <h2 className="mt-1 text-lg sm:text-xl font-extrabold text-ink">
                  {t("premium.banner.headline")}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {t("premium.banner.descPrefix")}{" "}
                  <strong className="text-ink font-bold">{t("premium.banner.descBold")}</strong>{" "}
                  {t("premium.banner.descSuffix")}
                </p>
              </div>
            </div>

            <div className="flex shrink-0">
              <Button
                onClick={() => setShowForm((prev) => !prev)}
                className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 font-bold  !text-white shadow-md"
              >
                <span className=" !text-white font-bold">
                  {showForm ? t("premium.banner.toggleHide") : t("premium.banner.toggleShow")}
                </span>
                <ChevronDown className={`ml-2 h-4 w-4 !text-white transition-transform ${showForm ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>

          {/* =====================================================================
           * FORMULARIO DESPLEGABLE DE VINCULACIÓN CON EL MÉDICO
           * ===================================================================== */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 border-t border-sky-500/20 pt-6">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                      <div className="rounded-2xl bg-base/80 p-4 border border-line/10 dark:bg-black/20 text-center mb-6">
                        <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider block">
                          {t("premium.form.conditionsTitle")}
                        </span>
                        <p className="text-sm font-semibold text-ink mt-1">
                          {t("premium.form.conditionsDesc")}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold text-ink mb-1.5">
                            {t("premium.form.patientNameLabel")}
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted" />
                            <input
                              type="text"
                              required
                              placeholder={t("premium.form.patientNamePlaceholder")}
                              value={formData.patientName}
                              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                              className="w-full rounded-xl border border-line/20 bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-ink mb-1.5">
                            {t("premium.form.patientEmailLabel")}
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted" />
                            <input
                              type="email"
                              required
                              placeholder={t("premium.form.patientEmailPlaceholder")}
                              value={formData.patientEmail}
                              onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                              className="w-full rounded-xl border border-line/20 bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold text-ink mb-1.5">
                            {t("premium.form.patientDniLabel")}
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted" />
                            <input
                              type="text"
                              required
                              placeholder={t("premium.form.patientDniPlaceholder")}
                              value={formData.patientDni}
                              onChange={(e) => setFormData({ ...formData, patientDni: e.target.value })}
                              className="w-full rounded-xl border border-line/20 bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-ink mb-1.5">
                            {t("premium.form.provinceLabel")}
                          </label>
                          <select
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full rounded-xl border border-line/20 bg-card py-2.5 px-3 text-sm text-ink focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                          >
                            {PROVINCES.map((p) => (
                              <option key={p.value} value={p.value}>
                                {t(p.labelKey)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Datos para relacionar al médico */}
                      <div className="pt-2">
                        <div className="mb-2 flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                          <span className="text-xs font-extrabold uppercase tracking-wider text-ink">
                            {t("premium.form.doctorSectionLabel")}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-bold text-ink mb-1.5">
                              {t("premium.form.doctorNameLabel")}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={t("premium.form.doctorNamePlaceholder")}
                              value={formData.doctorName}
                              onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                              className="w-full rounded-xl border border-line/20 bg-card py-2.5 px-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-ink mb-1.5">
                              {t("premium.form.institutionLabel")}
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted" />
                              <input
                                type="text"
                                placeholder={t("premium.form.institutionPlaceholder")}
                                value={formData.institutionOrLicense}
                                onChange={(e) => setFormData({ ...formData, institutionOrLicense: e.target.value })}
                                className="w-full rounded-xl border border-line/20 bg-card py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button type="submit" variant="gradient" className="w-full sm:w-auto font-bold px-8 !text-white">
                          <span className=" !text-white font-bold">{t("premium.form.submit")}</span>
                        </Button>
                      </div>
                    </form>
                  ) : (
                    /* Confirmación de cupón otorgado */
                    <div className="max-w-xl mx-auto rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-4">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-extrabold text-ink">
                        {t("premium.success.title")}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {t("premium.success.descPart1")} <strong className="text-ink">{formData.patientName}</strong>{" "}
                        {t("premium.success.descPart2")} <strong className="text-ink">{formData.doctorName}</strong>
                        {t("premium.success.descPart3")}{" "}
                        <strong className="text-emerald-700 dark:text-emerald-400">{t("premium.success.descPart4")}</strong>.
                      </p>

                      <div className="inline-flex items-center gap-2 rounded-2xl border border-line/20 bg-card p-2 px-4 shadow-sm">
                        <span className="font-mono text-sm font-extrabold tracking-wider text-ink">
                          {generatedCoupon}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyCoupon}
                          className="flex items-center gap-1 rounded-lg bg-base px-2.5 py-1 text-xs font-bold text-ink hover:bg-tint/10"
                        >
                          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copied ? t("premium.success.copiedLabel") : t("premium.success.copyLabel")}</span>
                        </button>
                      </div>

                      <p className="text-xs text-muted">
                        {t("premium.success.emailNotePrefix")} <strong>{formData.patientEmail}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================================
         * COMPARATIVA DE PLANES (BASIC VS PREMIUM) + TRANQUILIDAD
         * ========================================================================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {/* Tarjeta Plan Basic */}
          <div className="sc-hover-card overflow-hidden flex flex-col justify-between rounded-3xl border border-line/15 bg-white p-6 sm:p-7 shadow-xl dark:bg-[#101026] dark:border-white/10">
            <div>
              <div className="border-b border-line/10 pb-4">
                <h3 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{t("premium.plans.basicName")}</h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-ink sm:text-4xl">$0</span>
                  <span className="text-xs sm:text-sm font-semibold text-muted">{t("premium.plans.perMonth")}</span>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {BASIC_FEATURES.map((item, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      "flex items-start gap-3 pb-2.5 border-b border-line/10 last:border-b-0",
                      idx === 5 && "min-h-[42px]",
                      !item.included && "opacity-45"
                    )}
                  >
                    {item.included ? (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-500 dark:text-rose-400 mt-0.5">
                        <X className="h-3 w-3 stroke-[3]" />
                      </div>
                    )}
                    <span
                      className={cn(
                        "text-xs sm:text-[13px] leading-relaxed",
                        item.included ? "text-ink font-medium" : "text-muted"
                      )}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-line/10">
              <Link href="#descargar" className="block w-full">
                <Button variant="outline" size="lg" className="w-full font-bold">
                  {t("premium.plans.basicCta")}
                </Button>
              </Link>
              <div className="mt-2.5 text-center text-[11px] text-muted">
                {t("premium.plans.noCard")}
              </div>
            </div>
          </div>

          {/* Tarjeta Plan Premium (Recomendado) */}
          <div className="sc-hover-card overflow-hidden relative flex flex-col justify-between rounded-3xl border-2 border-amber-400/50 bg-white p-6 sm:p-7 shadow-2xl shadow-amber-500/5 dark:bg-[#161233] dark:border-amber-400/50">
            {/* Badge Recomendado flotante */}
            <div className="absolute -top-3.5 right-6 z-10">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-950 shadow-md">
                {t("premium.plans.recommendedBadge")}
              </span>
            </div>

            <div>
              <div className="border-b border-line/10 pb-4">
                <h3 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{t("premium.plans.premiumName")}</h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-ink sm:text-4xl">$4.99</span>
                  <span className="text-xs sm:text-sm font-semibold text-muted">{t("premium.plans.perMonth")}</span>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {PREMIUM_PLAN_FEATURES.map((item, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      "flex items-start gap-3 pb-2.5 border-b border-line/10 last:border-b-0",
                      idx === 5 && "min-h-[42px]"
                    )}
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-[13px] leading-relaxed text-ink font-medium">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-line/10">
              <Link href="#descargar" className="block w-full">
                <Button variant="gradient" size="lg" className="w-full font-bold !text-white shadow-brand-glow">
                  <span className="!text-white font-bold">{t("premium.plans.premiumCta")}</span>
                </Button>
              </Link>
              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-muted text-center">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t("premium.plans.securePayment")}</span>
              </div>
            </div>
          </div>

          {/* Columna Lateral: Resumen de Tranquilidad */}
          <div className="flex flex-col justify-between rounded-3xl border border-line/15 bg-slate-50/80 p-6 sm:p-7 shadow-sm dark:bg-[#070D22] dark:border-line/10">
            <div className="space-y-6">
              <div className="sc-hover-card overflow-hidden flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DA44AF]/15 text-[#DA44AF]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">{t("premium.sidebar.noCommitmentTitle")}</h4>
                  <p className="mt-0.5 text-xs text-muted leading-relaxed">
                    {t("premium.sidebar.noCommitmentDesc")}
                  </p>
                </div>
              </div>

              <div className="sc-hover-card overflow-hidden flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2BC5C7]/15 text-[#2BC5C7]">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">{t("premium.sidebar.clinicalTitle")}</h4>
                  <p className="mt-0.5 text-xs text-muted leading-relaxed">
                    {t("premium.sidebar.clinicalDesc")}
                  </p>
                </div>
              </div>

              <div className="sc-hover-card overflow-hidden flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C45CFF]/15 text-[#C45CFF]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">{t("premium.sidebar.privacyTitle")}</h4>
                  <p className="mt-0.5 text-xs text-muted leading-relaxed">
                    {t("premium.sidebar.privacyDesc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-line/15 bg-white/80 p-5 text-center dark:bg-[#0E1530]">
              <span className="text-xs sm:text-sm font-semibold text-muted block">
                {t("premium.sidebar.contactQuestion")}
              </span>
              <a
                href="mailto:contacto@sugarcoach.app"
                className="mt-1.5 inline-block text-xs sm:text-sm font-bold text-brand-from hover:underline"
              >
                {t("premium.sidebar.contactLinkText")}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
