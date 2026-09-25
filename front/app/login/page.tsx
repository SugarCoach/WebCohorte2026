import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Hola de nuevo 💜" subtitle="Iniciá sesión para seguir sumando puntos por tu constancia.">
      <LoginForm />
    </AuthLayout>
  );
}
