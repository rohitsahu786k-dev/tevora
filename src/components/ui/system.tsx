import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, Download, ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ViewportReveal } from "@/components/motion/reveal";

export function Container({
  className,
  size = "default",
  ...props
}: ComponentPropsWithoutRef<"div"> & { size?: "narrow" | "default" | "wide" }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-[96rem]",
        className,
      )}
      {...props}
    />
  );
}
export function Section({
  className,
  tone = "light",
  ...props
}: ComponentPropsWithoutRef<"section"> & {
  tone?: "light" | "white" | "dark" | "muted";
}) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 lg:py-32",
        tone === "white" && "bg-surface",
        tone === "dark" && "bg-brand-950 text-white",
        tone === "muted" && "bg-surface-muted",
        className,
      )}
      {...props}
    />
  );
}
export function ResponsiveGrid({
  className,
  columns = 3,
  ...props
}: ComponentPropsWithoutRef<"div"> & { columns?: 2 | 3 | 4 }) {
  return (
    <div
      className={cn(
        "grid gap-x-5 gap-y-8 md:gap-x-8",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}
export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("type-eyebrow text-accent", className)} {...props} />;
}
export function DisplayHeading({
  as: Tag = "h2",
  className,
  ...props
}: ComponentPropsWithoutRef<"h2"> & { as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag className={cn("type-section text-balance", className)} {...props} />
  );
}
export function BodyCopy({
  className,
  large,
  ...props
}: ComponentPropsWithoutRef<"p"> & { large?: boolean }) {
  return (
    <p
      className={cn(
        large ? "type-body-lg" : "type-body",
        "text-ink-muted max-w-2xl",
        className,
      )}
      {...props}
    />
  );
}
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <ViewportReveal>
      <header
        className={cn(
          "border-line mb-10 grid gap-5 border-t pt-5 md:mb-16 md:grid-cols-12",
          className,
        )}
      >
        <div className="md:col-span-3">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </div>
        <div className="md:col-span-7">
          <DisplayHeading>{title}</DisplayHeading>
          {description && (
            <BodyCopy large className="mt-5">
              {description}
            </BodyCopy>
          )}
        </div>
        {action && (
          <div className="md:col-span-2 md:justify-self-end">{action}</div>
        )}
      </header>
    </ViewportReveal>
  );
}
export function TextLink({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(
        "motion-link hover:text-accent inline-flex min-h-11 items-center gap-2 text-sm font-semibold",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="motion-arrow size-4" />
    </Link>
  );
}
export function Divider({
  className,
  ...props
}: ComponentPropsWithoutRef<"hr">) {
  return (
    <hr className={cn("border-line border-0 border-t", className)} {...props} />
  );
}
export function MediaFrame({
  ratio = "landscape",
  className,
  ...props
}: ComponentPropsWithoutRef<"figure"> & {
  ratio?: "landscape" | "square" | "portrait" | "wide";
}) {
  return (
    <figure
      className={cn(
        "bg-surface-muted relative overflow-hidden",
        ratio === "landscape" && "aspect-[4/3]",
        ratio === "square" && "aspect-square",
        ratio === "portrait" && "aspect-[3/4]",
        ratio === "wide" && "aspect-[16/7]",
        className,
      )}
      {...props}
    />
  );
}
export function SpecificationLabel({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="border-line border-t py-4">
      <dt className="type-spec-label text-ink-muted">{label}</dt>
      <dd className="type-numeric mt-3">
        {value}
        {unit && <span className="text-ink-muted ml-1 text-sm">{unit}</span>}
      </dd>
    </div>
  );
}
type BadgeTone = "neutral" | "accent" | "success" | "warning" | "error";
export function Badge({
  children,
  tone = "neutral",
  icon: Icon,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-1.5 border px-2.5 py-1 text-[.68rem] font-bold tracking-[.08em] uppercase",
        tone === "neutral" && "border-line bg-surface text-graphite",
        tone === "accent" && "border-accent/30 bg-accent-light text-brand-900",
        tone === "success" && "border-green-700/30 text-green-800",
        tone === "warning" && "border-amber-700/30 text-amber-800",
        tone === "error" && "border-red-700/30 text-red-800",
        className,
      )}
    >
      {Icon && <Icon aria-hidden className="size-3" />}
      {children}
    </span>
  );
}
export const StatusBadge = (p: ComponentPropsWithoutRef<typeof Badge>) => (
  <Badge {...p} />
);
export const ProductBadge = ({ children }: { children: ReactNode }) => (
  <Badge tone="accent">{children}</Badge>
);
export const TechnicalBadge = ({ children }: { children: ReactNode }) => (
  <Badge>{children}</Badge>
);
export const DownloadBadge = ({ children }: { children: ReactNode }) => (
  <Badge icon={Download}>{children}</Badge>
);
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="border-border-strong border border-dashed px-6 py-14 text-center">
      <ImageIcon aria-hidden className="text-ink-muted mx-auto size-7" />
      <h3 className="type-h4 mt-5">{title}</h3>
      <p className="type-body-sm text-ink-muted mx-auto mt-2 max-w-md">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
export function LoadingState({
  label = "Loading content",
}: {
  label?: string;
}) {
  return (
    <div role="status" className="space-y-3" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div className="bg-surface-muted h-3 w-1/4 animate-pulse motion-reduce:animate-none" />
      <div className="bg-surface-muted h-16 animate-pulse motion-reduce:animate-none" />
      <div className="bg-surface-muted h-16 animate-pulse motion-reduce:animate-none" />
    </div>
  );
}
export function ErrorState({
  title = "Unable to load content",
  description = "Please try again or contact the team if the problem continues.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div role="alert" className="border-error border-l-2 bg-red-50 p-5">
      <h3 className="type-h5 text-error">{title}</h3>
      <p className="type-body-sm text-ink-muted mt-1">{description}</p>
    </div>
  );
}
export function IconButton({
  label,
  icon: Icon,
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & { label: string; icon: LucideIcon }) {
  return (
    <button
      aria-label={label}
      className={cn(
        "border-line bg-surface hover:border-graphite hover:bg-surface-muted inline-flex size-11 items-center justify-center border transition-colors",
        className,
      )}
      {...props}
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}
