import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AboutSection } from "@/components/landing/AboutSection";

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

describe("AboutSection", () => {
  it("renderiza el título y los integrantes del equipo", () => {
    render(<AboutSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: /conocé a nuestro equipo/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Isabel Berizzo")).toBeInTheDocument();
    expect(screen.getByText("Veronica Avendaño")).toBeInTheDocument();
    expect(screen.getByText("Debora Biain")).toBeInTheDocument();
    expect(screen.getByText("Agustina Olivo")).toBeInTheDocument();
    expect(screen.getByText("Karin Chmiel")).toBeInTheDocument();
  });

  it("permite seleccionar un integrante mediante los dots o tarjetas", () => {
    render(<AboutSection />);

    const veronicaDot = screen.getByRole("button", { name: /ver a veronica avendaño/i });
    expect(veronicaDot).toBeInTheDocument();

    fireEvent.click(veronicaDot);
    expect(veronicaDot).toHaveAttribute("aria-current", "true");

    const karinCard = screen.getByText("Karin Chmiel").closest("article");
    expect(karinCard).toBeInTheDocument();
    if (karinCard) {
      fireEvent.click(karinCard);
      expect(karinCard).toHaveAttribute("aria-current", "true");
    }
  });
});
