import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/landing/Hero";

// framer-motion -> render estático en tests (filtra props propias de Motion)
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

describe("Hero", () => {
  it("renderiza el H1 y los dos CTAs", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /cuidar tu diabetes/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /descargar sugarcoach gratis/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver cómo funciona/i })).toBeInTheDocument();
  });
});
