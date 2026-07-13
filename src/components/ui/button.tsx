import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex min-h-12 items-center justify-center gap-3 px-5 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-45 active:scale-[.985] motion-reduce:transition-none motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        primary:
          "border border-brand-900 bg-brand-900 text-white hover:border-accent hover:bg-accent",
        secondary:
          "border border-graphite bg-transparent text-graphite hover:bg-graphite hover:text-white",
        ghost:
          "border border-transparent bg-transparent text-graphite hover:border-line hover:bg-surface-muted",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);
type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; arrow?: boolean };
export function Button({
  asChild,
  className,
  variant,
  arrow,
  children,
  ...props
}: Props) {
  if (asChild) {
    return (
      <Slot className={cn(buttonVariants({ variant }), className)} {...props}>
        {children}
      </Slot>
    );
  }
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
      {arrow && <ArrowRight aria-hidden className="motion-arrow size-4" />}
    </button>
  );
}
export const PrimaryButton = (props: Props) => (
  <Button variant="primary" {...props} />
);
export const SecondaryButton = (props: Props) => (
  <Button variant="secondary" {...props} />
);
export const GhostButton = (props: Props) => (
  <Button variant="ghost" {...props} />
);
