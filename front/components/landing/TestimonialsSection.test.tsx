import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

// framer-motion -> mock estático
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) => {
      const {
        initial,
        animate,
        variants,
        whileHover,
        whileInView,
        viewport,
        transition,
        ...rest
      } = props;
      void initial;
      void animate;
      void variants;
      void whileHover;
      void whileInView;
      void viewport;
      void transition;
      return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children as React.ReactNode}</div>;
    },
  },
  useReducedMotion: () => true,
}));

describe("TestimonialsSection", () => {
  it("renderiza el título y las historias de los pacientes", () => {
    render(<TestimonialsSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: /lo que dicen nuestros pacientes/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Mariana López")).toBeInTheDocument();
    expect(screen.getByText("Diego Fernández")).toBeInTheDocument();
    expect(screen.getByText("Valentina Rojas")).toBeInTheDocument();
    expect(screen.getByText("Sofía Acosta")).toBeInTheDocument();
    expect(screen.getByText("Julián Méndez")).toBeInTheDocument();
  });

  it("permite navegar secuencialmente por todas las reseñas sin saltos bruscos", () => {
    render(<TestimonialsSection />);

    const nextBtn = screen.getAllByRole("button", { name: /siguiente testimonio/i })[0];
    const prevBtn = screen.getAllByRole("button", { name: /testimonio anterior/i })[0];

    // En el inicio, prev está deshabilitado
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // Avanzamos hasta el final (4 clics para 5 tarjetas)
    fireEvent.click(nextBtn); // -> 1
    fireEvent.click(nextBtn); // -> 2
    fireEvent.click(nextBtn); // -> 3
    fireEvent.click(nextBtn); // -> 4 (Julián Méndez)

    // En el final, next está deshabilitado y prev habilitado
    expect(nextBtn).toBeDisabled();
    expect(prevBtn).not.toBeDisabled();

    // Podemos retroceder perfectamente
    fireEvent.click(prevBtn); // -> 3
    fireEvent.click(prevBtn); // -> 2
    expect(nextBtn).not.toBeDisabled();

    // Clic en dot de Mariana López
    const marianaDot = screen.getByRole("button", { name: /ir al testimonio de mariana lópez/i });
    fireEvent.click(marianaDot);
    expect(prevBtn).toBeDisabled();
  });
});
