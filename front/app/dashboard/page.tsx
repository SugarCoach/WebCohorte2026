import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPlaceholder() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base px-4 text-center">
      <p className="text-5xl">🎉</p>
      <h1 className="text-3xl font-extrabold text-ink">¡Bienvenidx a tu panel!</h1>
      <p className="max-w-md text-body">
        Ruta placeholder (/dashboard). Acá vivirá el panel real cuando el backend esté conectado vía TanStack Query.
      </p>
      <Link href="/">
        <Button variant="gradient">Volver a la landing</Button>
      </Link>
    </main>
  );
}
