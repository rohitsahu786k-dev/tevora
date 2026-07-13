import { Suspense } from "react";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { ProductBrowserSkeleton } from "@/components/products/product-browser-skeleton";
import { Container, Section, SectionHeader } from "@/components/ui/system";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/routes";
export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Explore published TEVORA technology-furniture applications across professional spaces.",
  path: routes.projects,
});

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Projects"
            title="Technology, put into practice."
            description="Explore approved technology-furniture applications across education, corporate and specialist spaces."
          />
          <Suspense fallback={<ProductBrowserSkeleton />}>
            <ProjectBrowser />
          </Suspense>
        </Container>
      </Section>
    </main>
  );
}
