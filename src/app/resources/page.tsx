import { Suspense } from "react";
import { ResourceBrowser } from "@/components/resources/resource-browser";
import { ProductBrowserSkeleton } from "@/components/products/product-browser-skeleton";
import { Container, Section, SectionHeader } from "@/components/ui/system";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/routes";
export const metadata = createPageMetadata({
  title: "Resources",
  description:
    "Browse TEVORA product literature, technical resources, CAD, BIM and planning information.",
  path: routes.resources,
});
export default function ResourcesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Resources"
            title="Information for better specification."
            description="Find the literature, drawings and planning information you need, or request the right file for your project stage."
          />
          <Suspense fallback={<ProductBrowserSkeleton />}>
            <ResourceBrowser />
          </Suspense>
        </Container>
      </Section>
    </main>
  );
}
