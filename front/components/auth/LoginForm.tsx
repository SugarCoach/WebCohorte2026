"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, type LoginSchema } from "@/lib/schemas";
import { useLogin } from "@/hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const mutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginSchema) => {
    toast.loading("Iniciando sesión…", { id: "login" });
    mutation.mutate(values, {
      onSuccess: (res) => {
        toast.success(`¡Hola de nuevo, ${res.user.email}!`, { id: "login" });
        router.push("/dashboard");
      },
      onError: (e) => {
        toast.error(e instanceof Error ? e.message : "No pudimos iniciar sesión", { id: "login" });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="vos@email.com" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-red-600 dark:text-red-300">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" {...register("password")} />
        {errors.password && <p className="text-xs text-red-600 dark:text-red-300">{errors.password.message}</p>}
      </div>
      <Button type="submit" variant="gradient" disabled={mutation.isPending} className="mt-2 w-full">
        {mutation.isPending && <Loader2 className="animate-spin" />}
        {mutation.isPending ? "Ingresando…" : "Iniciar sesión"}
      </Button>
      <p className="text-center text-sm text-body">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="font-bold text-ink underline decoration-[#DA44AF] underline-offset-4">
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
