import { Suspense } from "react";
import { ConfigureExperience } from "@/components/configuration/configure-experience";
import { ProductBrowserSkeleton } from "@/components/products/product-browser-skeleton";
import { Container, Eyebrow, Section } from "@/components/ui/system";
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
      <Section className="py-8 md:py-10 lg:py-12">
        <Container>
          <header className="mb-6 grid gap-4 md:grid-cols-[12rem_1fr] md:items-end">
            <Eyebrow>Configure</Eyebrow>
            <div>
              <h1 className="type-h2 max-w-4xl text-balance">
                Configure products. Build your basket.
              </h1>
              <p className="type-body text-ink-muted mt-3 max-w-3xl">
                Select products, see estimated pricing, add to basket and place
                an order request for TEVORA review.
              </p>
            </div>
          </header>
          <Suspense fallback={<ProductBrowserSkeleton />}>
            <ConfigureExperience />
          </Suspense>
        </Container>
      </Section>
    </main>
  );
}
