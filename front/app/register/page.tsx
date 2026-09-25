import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="Creá tu cuenta" subtitle="Empezá gratis a registrar, sumar puntos y conectar a tu familia.">
      <RegisterForm />
    </AuthLayout>
  );
}
