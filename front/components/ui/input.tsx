import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-line/10 bg-card px-3 py-2 text-sm text-ink placeholder:text-[#7A7A90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA44AF]/60 focus-visible:border-[#DA44AF] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
