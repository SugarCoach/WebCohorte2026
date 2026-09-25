import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardsSection, AWARDS } from "@/components/landing/AwardsSection";

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

// Mock Next Image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    priority,
    ...props
  }: Record<string, unknown>) => {
    void fill;
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src as string} alt={alt as string} {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

describe("AwardsSection", () => {
  it("renderiza el título de la sección y el badge", () => {
    render(<AwardsSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: /premios y reconocimientos/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/validación y confianza global/i)).toBeInTheDocument();
  });

  it("renderiza todas las instituciones y programas reconocidos", () => {
    render(<AwardsSection />);

    // Verifica que cada institución esté presente en el DOM
    AWARDS.forEach((award) => {
      const elements = screen.getAllByText(award.name);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("cuenta con el contenedor de carrusel con su label de accesibilidad", () => {
    render(<AwardsSection />);

    const region = screen.getByRole("region", {
      name: /carrusel continuo de premios y reconocimientos/i,
    });
    expect(region).toBeInTheDocument();
  });
});
