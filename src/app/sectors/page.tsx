import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import { sectors } from "@/content";
import { sectorToSpaces } from "@/content/relationships";
import { mediaAssets } from "@/content/media";
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
    "Explore ONESPACE product guidance for education, workplace, government, healthcare, public and specialist technology spaces.",
  path: routes.sectors,
});

export default function SectorsPage() {
  const sectorHeroImage = mediaAssets.sectorsMainHero;
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 text-white">
        <Container className="py-10 md:py-14">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Sectors" }]}
          />
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <ViewportReveal className="flex min-w-0 flex-col justify-end lg:col-span-5">
              <Eyebrow className="text-emerald-300">Sectors</Eyebrow>
              <MaskedHeading as="h1" className="type-h2 mt-5">
                Technology furniture across sectors.
              </MaskedHeading>
              <p className="type-body-lg mt-4 text-white/65">
                Start with your customer sector and find the spaces, products
                and technology furniture requirements most relevant to that
                environment.
              </p>
            </ViewportReveal>
            {sectorHeroImage && (
              <SingleHeroImage
                image={sectorHeroImage}
                priority
                fit="cover"
                aspect="16/9"
                className="min-w-0 border-white/10 bg-white/5 shadow-2xl shadow-black/25 lg:col-span-7"
              />
            )}
          </div>
        </Container>
      </section>
      <Section className="py-10 md:py-12">
        <Container>
          <StaggerContainer as="ol" className="border-line border-t">
            {sectors.map((sector, index) => (
              <StaggerItem key={sector.slug} className="border-line border-b">
                <Link
                  href={routes.sector(sector.slug)}
                  className="motion-card group hover:bg-accent-light grid min-h-28 gap-4 py-4 md:grid-cols-12 md:px-5"
                >
                  <span className="type-model text-ink-muted md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-4">
                    <h2 className="type-h4">{sector.name}</h2>
                    <p className="type-series text-accent mt-2">
                      {sectorToSpaces[sector.slug]?.length ?? 0} RELEVANT SPACES
                    </p>
                  </div>
                  <p className="type-body-sm text-ink-muted line-clamp-2 max-w-xl md:col-span-5">
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
