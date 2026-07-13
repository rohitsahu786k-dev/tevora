import type { ReactNode } from "react";
export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto min-h-[65vh] max-w-7xl px-5 py-16 outline-none sm:px-8 md:py-24"
    >
      {eyebrow && <p className="type-eyebrow text-accent mb-5">{eyebrow}</p>}
      <h1 className="type-h1 max-w-4xl text-balance">{title}</h1>
      {description && (
        <p className="type-body-lg text-ink-muted mt-6 max-w-2xl">
          {description}
        </p>
      )}
      {children && <div className="mt-12">{children}</div>}
    </main>
  );
}
