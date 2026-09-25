"use client"

import Image from "next/image"
import { Zap, Clock, LayoutDashboard, ArrowRight } from "lucide-react"
import { MaterialIcon } from "@/components/ui/MaterialIcon"
import { useLanguage } from "@/lib/i18n"

export function DoctorPreview() {
  const { t } = useLanguage()

  return (
    <section id="doctor-preview" className="mx-auto max-w-[1200px] px-gutter-mobile py-space-2xl md:px-gutter-tablet lg:px-gutter-desktop">

      <div className="theme-panel-gamification relative overflow-hidden rounded-3xl border border-border-subtle p-space-xl shadow-2xl md:p-space-3xl">

        {/* Título */}
        <div className="relative z-10 mb-space-2xl text-center">
          <h2 className="theme-panel-text font-display-lg text-display-lg-mobile font-extrabold leading-tight tracking-tight md:text-headline-lg">
            {t("doctorPreview.title")}
          </h2>

          <p className="theme-panel-muted mt-space-md font-body-lg text-body-lg">
            {t("doctorPreview.descriptionLine1")}
            <br />
            {t("doctorPreview.descriptionLine2")}
          </p>
        </div>

        {/* Fuente estilo manuscrito */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

          .sc-marker {
            font-family: 'Permanent Marker', cursive;
          }
        `}</style>

        {/* App paciente + flechas + Dashboard */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">

          {/* APP PACIENTE */}
          <div className="flex flex-col items-center lg:col-span-3">

            <h3 className="theme-panel-text mb-space-md font-headline-sm text-[18px] font-bold">
              {t("doctorPreview.appPatientTitle")}
            </h3>

            <div className="sc-hover-card overflow-hidden relative aspect-[9/19] w-full max-w-[280px]">
              <Image
                src="/images/preview_profesionales/celu_main.jpeg"
                alt={t("doctorPreview.appPatientAlt")}
                fill
                className="rounded-[30px] object-contain"
                sizes="280px"
              />
            </div>

          </div>

          {/* 3 FLECHAS CENTRALES */}
          <div className="flex flex-col items-center justify-center gap-6 lg:col-span-3">

            {/* Tiempo real */}
            <div className="flex flex-col items-center">
              <span className="sc-marker mb-1 whitespace-nowrap text-[22px] text-[#DC13A2]">
                {t("doctorPreview.realTimeLabel")}
              </span>

              <ArrowRight
                className="h-10 w-10 text-[#DC13A2]"
                strokeWidth={3}
              />
            </div>

            {/* Disponible 24/7 */}
            <div className="flex flex-col items-center">
              <span className="sc-marker mb-1 whitespace-nowrap text-[22px] text-[#DC13A2]">
                {t("doctorPreview.available247Label")}
              </span>

              <ArrowRight
                className="h-10 w-10 text-[#DC13A2]"
                strokeWidth={3}
              />
            </div>

            {/* Un solo lugar */}
            <div className="flex flex-col items-center">
              <span className="sc-marker mb-1 whitespace-nowrap text-[22px] text-[#DC13A2]">
                {t("doctorPreview.oneSinglePlaceLabel")}
              </span>

              <ArrowRight
                className="h-10 w-10 text-[#DC13A2]"
                strokeWidth={3}
              />
            </div>

          </div>

          {/* DASHBOARD DOCTOR */}
          <div className="flex flex-col items-center lg:col-span-6">

            <h3 className="theme-panel-text mb-space-md font-headline-sm text-[18px] font-bold">
              {t("doctorPreview.dashboardDoctorTitle")}
            </h3>

            <div className="sc-hover-card overflow-hidden relative aspect-[1180/820] w-full max-w-[680px]">
              <Image
                src="/images/preview_profesionales/dashboard_doctor.png"
                alt={t("doctorPreview.dashboardAlt")}
                fill
                className="rounded-[30px] object-contain"
                sizes="680px"
              />
            </div>

          </div>

        </div>

        {/* TARJETAS INFERIORES */}
        <div className="relative z-10 mt-space-2xl grid gap-space-lg md:grid-cols-3">

          {/* Tiempo real */}
          <div className="sc-hover-card overflow-hidden theme-panel-card rounded-2xl border p-space-md">

            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15">
              <Zap className="h-5 w-5 text-fuchsia-400" />
            </div>

            <h3 className="theme-panel-text mb-3 font-headline-sm text-[18px] font-bold">
              {t("doctorPreview.realTimeLabel")}
            </h3>

            <p className="theme-panel-muted font-body-sm text-body-sm leading-relaxed">
              {t("doctorPreview.realTimeDesc")}
            </p>

          </div>

          {/* Disponible 24/7 */}
          <div className="sc-hover-card overflow-hidden theme-panel-card rounded-2xl border p-space-md">

            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15">
              <Clock className="h-5 w-5 text-fuchsia-400" />
            </div>

            <h3 className="theme-panel-text mb-3 font-headline-sm text-[18px] font-bold">
              {t("doctorPreview.available247Label")}
            </h3>

            <p className="theme-panel-muted font-body-sm text-body-sm leading-relaxed">
              {t("doctorPreview.available247Desc")}
            </p>

          </div>

          {/* Un solo lugar */}
          <div className="sc-hover-card overflow-hidden theme-panel-card rounded-2xl border p-space-md">

            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15">
              <LayoutDashboard className="h-5 w-5 text-fuchsia-400" />
            </div>

            <h3 className="theme-panel-text mb-3 font-headline-sm text-[18px] font-bold">
              {t("doctorPreview.oneSinglePlaceLabel")}
            </h3>

            <p className="theme-panel-muted font-body-sm text-body-sm leading-relaxed">
              {t("doctorPreview.oneSinglePlaceDesc")}
            </p>

          </div>

        </div>

        {/* BOTÓN DEBAJO DE LAS CARDS */}
        <div className="relative z-10 mt-space-xl flex justify-center">
          <a
            className="inline-flex items-center gap-space-xs rounded-full btn-gradient border border-white/20 px-space-xl py-space-sm font-label-lg text-label-lg text-white transition-all"
            href="/profesionales"
          >
            <span>{t("doctorPreview.ctaLabel")}</span>

            <MaterialIcon
              name="arrow_forward"
              style={{ fontSize: 18 }}
            />
          </a>
        </div>

      </div>

    </section>
  )
}
