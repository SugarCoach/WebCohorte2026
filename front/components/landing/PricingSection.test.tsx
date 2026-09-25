import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PricingSection } from "@/components/landing/PricingSection";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => {
      const { initial, animate, variants, whileHover, whileInView, viewport, transition, ...rest } = props;
      void initial; void animate; void variants; void whileHover; void whileInView; void viewport; void transition;
      return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children as React.ReactNode}</div>;
    },
  },
  useReducedMotion: () => true,
}));

function renderWithClient() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <PricingSection />
    </QueryClientProvider>,
  );
}

describe("PricingSection", () => {
  it("el toggle mensual/anual cambia el precio mostrado", async () => {
    const user = userEvent.setup();
    renderWithClient();

    // Espera a que cargue el mock (latencia simulada 700ms)
    const monthlyPrice = await screen.findByText(/6,99/i, undefined, { timeout: 3000 });
    expect(monthlyPrice).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /anual/i }));
    expect(await screen.findByText(/69,90/i, undefined, { timeout: 3000 })).toBeInTheDocument();
  });
});
