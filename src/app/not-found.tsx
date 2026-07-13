import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
export default function NotFound() {
  return (
    <PageShell
      eyebrow="404"
      title="Page not found"
      description="The page may have moved or is not yet available."
    >
      <Button asChild>
        <Link href={routes.home}>Return home</Link>
      </Button>
    </PageShell>
  );
}
