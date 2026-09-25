import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "@/components/auth/LoginForm";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("LoginForm", () => {
  function renderForm() {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    return render(
      <QueryClientProvider client={client}>
        <LoginForm />
      </QueryClientProvider>,
    );
  }

  it("submit vacío muestra errores de Zod", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(await screen.findByText(/email es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/contraseña es obligatoria/i)).toBeInTheDocument();
  });

  it("campos válidos permiten el submit", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/email/i), "test@sugarcoach.app");
    await user.type(screen.getByLabelText(/contraseña/i), "password123");
    await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"), { timeout: 3000 });
  });
});
