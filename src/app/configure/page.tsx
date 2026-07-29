import { Suspense } from "react";
import { ConfigureExperience } from "@/components/configuration/configure-experience";
import { ProductBrowserSkeleton } from "@/components/products/product-browser-skeleton";
import { Container, Section, SectionHeader } from "@/components/ui/system";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/routes";
export const metadata = createPageMetadata({
  title: "Configure",
  description:
    "Configure TEVORA technology furniture, add products to a basket and prepare an order request for project review.",
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
            title="Configure products and build your project basket."
            description="Choose the space, select TEVORA products, set the main equipment and finish requirements, then place an order request for review."
          />
          <Suspense fallback={<ProductBrowserSkeleton />}>
            <ConfigureExperience />
          </Suspense>
        </Container>
      </Section>
    </main>
  );
}
