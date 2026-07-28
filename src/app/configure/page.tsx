import { Suspense } from "react";
import { ConfigureExperience } from "@/components/configuration/configure-experience";
import { ProductBrowserSkeleton } from "@/components/products/product-browser-skeleton";
import { Container, Section, SectionHeader } from "@/components/ui/system";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/routes";
export const metadata = createPageMetadata({
  title: "Configure",
  description:
    "Find a product direction and organise a preliminary TEVORA technology-furniture configuration.",
  path: routes.configure,
  noIndex: true,
});
export default function ConfigurePage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Configure"
            title="Build around your technology."
            description="Capture the room, equipment and product direction so TEVORA can help shape the right configuration."
          />
          <Suspense fallback={<ProductBrowserSkeleton />}>
            <ConfigureExperience />
          </Suspense>
        </Container>
      </Section>
    </main>
  );
}
