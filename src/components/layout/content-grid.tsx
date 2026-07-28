import Link from "next/link";
import type { ContentEntry } from "@/types/content";
export function ContentGrid({
  entries,
  href,
}: {
  entries: readonly ContentEntry[];
  href: (slug: string) => string;
}) {
  return (
    <div className="border-line bg-line grid gap-px border md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <Link
          href={href(entry.slug) as never}
          key={entry.slug}
          className="motion-card bg-surface hover:bg-accent-light min-h-48 p-6 transition-colors"
        >
          <h2 className="text-xl font-medium">{entry.title}</h2>
          <p className="type-body-sm text-ink-muted mt-3">{entry.summary}</p>
        </Link>
      ))}
    </div>
  );
}
