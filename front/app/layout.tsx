import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SugarCoach — Cuidar tu diabetes puede sentirse más simple",
  description:
    "Registrá controles, sumá puntos por tu constancia, organizá reportes médicos y mantené conectada a tu familia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Script pre-hidratación: respeta tema guardado en localStorage o arranca en modo Claro sin forzar a11y */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sugarcoach-theme');var e=document.documentElement;e.classList.remove('dark','a11y');if(t==='dark'){e.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Plus Jakarta Sans ahora se autohospeda (ver app/globals.css); se
            precarga para que el primer pintado ya la tenga lista y no
            aparezca la fuente de respaldo del sistema. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/PlusJakartaSans-variable.woff2"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
