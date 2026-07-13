import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { getBySlug, type CollectionName } from "@/lib/data";
export async function DetailPage({
  collection,
  slug,
  eyebrow,
}: {
  collection: CollectionName;
  slug: string;
  eyebrow: string;
}) {
  const entry = await getBySlug(collection, slug);
  if (!entry) notFound();
  return (
    <PageShell
      eyebrow={eyebrow}
      title={entry.title}
      description={entry.summary}
    >
      <div className="border-border-strong text-ink-muted border border-dashed p-8 text-sm">
        Detailed CMS-driven content will be introduced in the visual/content
        phase.
      </div>
    </PageShell>
  );
}
