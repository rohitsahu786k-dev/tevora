import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import { sectors } from "@/content";
import { sectorToSpaces } from "@/content/relationships";
import { productConceptMediaBySlug } from "@/content/media";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  MaskedHeading,
  StaggerContainer,
  StaggerItem,
  ViewportReveal,
} from "@/components/motion";
import { SingleHeroImage } from "@/components/media/single-hero-image";
export const metadata = createPageMetadata({
  title: "Sectors",
  description:
    "Explore TEVORA technology-furniture applications across education, workplace, public and specialist sectors.",
  path: routes.sectors,
});

export default function SectorsPage() {
  const sectorHeroImage = productConceptMediaBySlug.forum;
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 text-white">
        <Container className="py-12 md:py-20 lg:py-24">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Sectors" }]}
          />
          <div className="mt-16 grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
            <ViewportReveal className="flex min-w-0 flex-col justify-end lg:col-span-5">
              <Eyebrow className="text-emerald-300">Sectors</Eyebrow>
              <MaskedHeading as="h1" className="type-h1 mt-7">
                Technology furniture across sectors.
              </MaskedHeading>
              <p className="type-body-lg mt-6 text-white/65">
                Clear application pathways for education, workplace, government,
                healthcare, public, media and specialist environments.
              </p>
            </ViewportReveal>
            {sectorHeroImage && (
              <SingleHeroImage
                image={sectorHeroImage}
                priority
                className="min-w-0 lg:col-span-7"
              />
            )}
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <StaggerContainer as="ol" className="border-line border-t">
            {sectors.map((sector, index) => (
              <StaggerItem key={sector.slug} className="border-line border-b">
                <Link
                  href={routes.sector(sector.slug)}
                  className="motion-card group hover:bg-accent-light grid min-h-56 gap-6 py-7 md:grid-cols-12 md:px-5"
                >
                  <span className="type-model text-ink-muted md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-4">
                    <h2 className="type-h2">{sector.name}</h2>
                    <p className="type-series text-accent mt-4">
                      {sectorToSpaces[sector.slug]?.length ?? 0} TYPICAL SPACES
                    </p>
                  </div>
                  <p className="type-body-sm text-ink-muted max-w-xl md:col-span-5">
                    {sector.summary}
                  </p>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 md:col-span-2 md:justify-self-end"
                  />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>
    </main>
  );
}
