import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import { productFamilies, spaces } from "@/content";
import { spaceToProductFamilies } from "@/content/relationships";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
import { MaskedHeading, ViewportReveal } from "@/components/motion";
import { sharedElementStyle } from "@/lib/motion/shared-elements";
export const metadata = createPageMetadata({
  title: "Spaces",
  description:
    "Explore technology-furniture requirements and product recommendations by space type.",
  path: routes.spaces,
});

const groups = [
  "Education Spaces",
  "Corporate Spaces",
  "Specialist Spaces",
  "Public and Self-Service Spaces",
] as const;
export default function SpacesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Spaces" }]}
          />
          <ViewportReveal className="mt-16 grid gap-8 md:grid-cols-12">
            <Eyebrow className="md:col-span-3">Spaces</Eyebrow>
            <div className="md:col-span-8">
              <MaskedHeading as="h1" className="type-h1">
                Spaces shaped by technology
              </MaskedHeading>
              <p className="type-body-lg text-ink-muted mt-6 max-w-2xl">
                Explore education, workplace, specialist and public environments
                with clear links to relevant TEVORA product families and series.
              </p>
            </div>
          </ViewportReveal>
        </Container>
      </Section>
      {groups.map((group, groupIndex) => (
        <Section
          key={group}
          id={group.toLowerCase().replaceAll(" ", "-")}
          tone={groupIndex % 2 ? "white" : "light"}
        >
          <Container>
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-3">
                <span className="type-model text-ink-muted">
                  0{groupIndex + 1}
                </span>
                <h2 className="type-h3 mt-4">{group}</h2>
              </div>
              <ol className="border-line bg-line grid gap-px border md:col-span-9 lg:grid-cols-2">
                {spaces
                  .filter((space) => space.group === group)
                  .map((space, index) => (
                    <li key={space.slug}>
                      <Link
                        href={routes.space(space.slug)}
                        style={sharedElementStyle("space", space.slug)}
                        className="motion-card group bg-surface hover:bg-accent-light grid min-h-80 content-between p-6"
                      >
                        <div>
                          <div className="flex justify-between">
                            <span className="type-model text-ink-muted">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <ArrowRight
                              aria-hidden
                              className="motion-arrow size-4"
                            />
                          </div>
                          <h3 className="type-h2 mt-12">{space.name}</h3>
                          <p className="type-body-sm text-ink-muted mt-2 max-w-2xl">
                            {space.summary}
                          </p>
                        </div>
                        <div className="border-line border-t pt-4">
                          <p className="type-spec-label text-ink-muted">
                            Primary users
                          </p>
                          <p className="type-caption mt-2">
                            {space.primaryUsers.slice(0, 3).join(" · ")}
                          </p>
                          <p className="type-spec-label text-ink-muted mt-4">
                            Recommended product families
                          </p>
                          <p className="type-caption mt-2">
                            {(spaceToProductFamilies[space.slug] ?? [])
                              .slice(0, 3)
                              .map(
                                (slug) =>
                                  productFamilies.find(
                                    (family) => family.slug === slug,
                                  )?.name,
                              )
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                          <span className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold">
                            View Space
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ol>
            </div>
          </Container>
        </Section>
      ))}
    </main>
  );
}
