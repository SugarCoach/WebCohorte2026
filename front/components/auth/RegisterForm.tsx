"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { registerSchema, type RegisterSchema } from "@/lib/schemas";
import { useRegister } from "@/hooks/useRegister";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const router = useRouter();
  const mutation = useRegister();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { terms: false },
  });

  const onSubmit = (values: RegisterSchema) => {
    toast.loading("Creando tu cuenta…", { id: "register" });
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("¡Cuenta creada! Te damos la bienvenida 💜", { id: "register" });
        router.push("/dashboard");
      },
      onError: (e) => {
        toast.error(e instanceof Error ? e.message : "No pudimos crear tu cuenta", { id: "register" });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" placeholder="Tu nombre" autoComplete="name" {...register("name")} />
        {errors.name && <p className="text-xs text-red-600 dark:text-red-300">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="vos@email.com" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-red-600 dark:text-red-300">{errors.email.message}</p>}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" placeholder="Mínimo 8 caracteres" autoComplete="new-password" {...register("password")} />
          {errors.password && <p className="text-xs text-red-600 dark:text-red-300">{errors.password.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Confirmar</Label>
          <Input id="confirmPassword" type="password" placeholder="Repetila" autoComplete="new-password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-xs text-red-600 dark:text-red-300">{errors.confirmPassword.message}</p>}
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <div className="flex flex-col">
          <Label htmlFor="terms" className="text-sm font-normal text-body">
            Acepto los términos y la política de privacidad
          </Label>
          {errors.terms && <p className="text-xs text-red-600 dark:text-red-300">{errors.terms.message}</p>}
        </div>
      </div>
      <Button type="submit" variant="gradient" disabled={mutation.isPending} className="mt-2 w-full">
        {mutation.isPending && <Loader2 className="animate-spin" />}
        {mutation.isPending ? "Creando cuenta…" : "Crear cuenta"}
      </Button>
      <p className="text-center text-sm text-body">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-bold text-ink underline decoration-[#DA44AF] underline-offset-4">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
