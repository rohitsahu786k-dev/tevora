import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { PrimaryButton } from "@/components/ui/button";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui/system";
import { productFamilies, products, spaces } from "@/content";
import { routes } from "@/lib/routes";
import { ResponsiveMedia } from "@/components/media/responsive-media";
import { mediaAssets } from "@/content/media";
import { HomeHero } from "@/components/motion/home-hero";
import { sharedElementStyle } from "@/lib/motion/shared-elements";

const familySlugs = [
  "presentation-stations",
  "display-stands",
  "mobile-av-carts",
  "technology-credenzas",
  "collaboration-tables",
  "interactive-kiosks",
];
const featuredFamilies = familySlugs
  .map((slug) => productFamilies.find((family) => family.slug === slug))
  .filter((family): family is NonNullable<typeof family> => Boolean(family));
const spaceSlugs = [
  "lecture-theatre",
  "classroom",
  "boardroom",
  "conference-room",
  "corporate-training-room",
  "control-room",
];
const featuredSpaces = spaceSlugs
  .map((slug) => spaces.find((space) => space.slug === slug))
  .filter((space): space is NonNullable<typeof space> => Boolean(space));
const integrations = [
  "Display integration",
  "Camera integration",
  "Equipment housing",
  "Power and connectivity",
  "Cable management",
  "Service access",
];
const modules = [
  "Camera mounts",
  "Soundbar mounts",
  "Device shelves",
  "Display kits",
  "Rack modules",
  "Controller mounts",
  "Power modules",
  "Connectivity modules",
  "Mobility kits",
  "Cable-management modules",
];
const professionals = [
  "AV Integrators",
  "Architects",
  "AV Consultants",
  "Education Teams",
  "Corporate Project Teams",
  "Dealers and Partners",
];
const applications = [
  "Education",
  "Corporate",
  "Government",
  "Public spaces",
  "Specialist environments",
];
const resourceTypes = [
  "Brochures",
  "Technical data",
  "CAD",
  "BIM",
  "STEP files",
  "Installation guides",
  "Finish cards",
];
const storyProduct =
  products.find((product) => product.slug === "move-pro") ?? products[0]!;

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <HomeHero />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Product Families"
            title="Furniture for the way technology is used."
            description="Six starting points for presentation, display, mobility, equipment integration, collaboration and interaction."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {featuredFamilies.map((family, index) => (
              <Link
                key={family.slug}
                href={routes.productFamily(family.slug)}
                style={sharedElementStyle("family", family.slug)}
                className="group bg-canvas hover:bg-accent-light grid min-h-[18rem] content-between p-5 transition-colors sm:min-h-[21rem] sm:p-6 md:min-h-[25rem] md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="type-model text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight aria-hidden className="motion-arrow size-5" />
                </div>
                <div className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-enter)] group-hover:-translate-y-1 motion-reduce:transition-none">
                  <p className="type-series text-accent">
                    {family.series
                      .slice(0, 3)
                      .map(({ name }) => name)
                      .join(" / ")}
                  </p>
                  <h2 className="type-section mt-5">{family.name}</h2>
                  <p className="type-body-sm text-ink-muted mt-5 max-w-xl">
                    {family.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Integration"
            title="Designed around the technology."
            description="The furniture begins with the equipment, infrastructure and access requirements that shape a working room."
          />
          <ol className="border-t border-white/20">
            {integrations.map((item, index) => (
              <li
                key={item}
                className="grid min-h-20 items-center gap-3 border-b border-white/20 py-4 sm:min-h-24 sm:grid-cols-[5rem_1fr] sm:gap-4 sm:py-5"
              >
                <span className="type-model text-emerald-300">
                  0{index + 1}
                </span>
                <h2 className="type-h3">{item}</h2>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Explore by Space"
            title="Products considered in context."
            description="Start with the environment, then explore relevant product families and series. Control Room is one specialist application within a much wider range of spaces."
          />
          <div className="border-line bg-line grid gap-px border sm:grid-cols-2 lg:grid-cols-3">
            {featuredSpaces.map((space, index) => (
              <Link
                key={space.slug}
                href={routes.space(space.slug)}
                style={sharedElementStyle("space", space.slug)}
                className="group bg-surface hover:bg-accent-light grid min-h-48 content-between p-5 sm:min-h-64 sm:p-6"
              >
                <div className="flex justify-between">
                  <span className="type-model text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="type-caption text-ink-muted">
                    {space.group}
                  </span>
                </div>
                <div>
                  <h2 className="type-h2">{space.name}</h2>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow mt-6 size-5"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Modular Product Architecture</Eyebrow>
              <h2 className="type-section mt-7">
                Extend the product around the requirement.
              </h2>
              <p className="type-body-lg text-ink-muted mt-6">
                A coordinated module structure prepares products for different
                devices, mounting arrangements, infrastructure and room
                conditions.
              </p>
            </div>
            <ol className="border-line border-t lg:col-span-6 lg:col-start-7">
              {modules.map((module, index) => (
                <li
                  key={module}
                  className="border-line grid min-h-16 grid-cols-[3rem_1fr] items-center border-b"
                >
                  <span className="type-model text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold">{module}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <section className="bg-surface">
        <Container className="py-16 md:py-24 lg:py-32">
          <SectionHeader
            eyebrow="Featured Product Story"
            title="Technology that can move with the room."
            description="A mobile AV cart provides a flexible furniture format for display, video collaboration and learning environments. Product-level details remain subject to project verification."
          />
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:sticky lg:top-28 lg:col-span-7 lg:h-fit">
              <ResponsiveMedia
                asset={mediaAssets.mobileAvStory}
                sizes="(min-width:1024px) 58vw, 100vw"
                showCaption
              />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="type-series text-accent">
                {storyProduct.series} SERIES
              </p>
              <h2 className="type-product mt-5">
                Mobile AV furniture for changing spaces.
              </h2>
              <div className="mt-10 space-y-10 sm:space-y-16">
                {[
                  [
                    "01",
                    "Position",
                    "Bring display and collaboration technology to the point of use.",
                  ],
                  [
                    "02",
                    "Integrate",
                    "Create a coordinated location for screen, camera, audio and connected devices.",
                  ],
                  [
                    "03",
                    "Adapt",
                    "Support rooms that change between teaching, training and collaboration.",
                  ],
                ].map(([number, title, copy]) => (
                  <article key={number} className="border-line border-t pt-5">
                    <span className="type-model text-ink-muted">{number}</span>
                    <h3 className="type-h3 mt-6 sm:mt-10">{title}</h3>
                    <p className="type-body text-ink-muted mt-4">{copy}</p>
                  </article>
                ))}
              </div>
              <Link
                href={routes.product(storyProduct.slug)}
                className="border-graphite mt-12 inline-flex min-h-12 items-center gap-3 border-b text-sm font-semibold"
              >
                Explore {storyProduct.series}{" "}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Designed for Professionals"
            title="Clear information for every project team."
            description="TEVORA supports the people who design, specify, integrate, procure and operate technology-enabled spaces."
          />
          <div className="border-line grid border-y md:grid-cols-2">
            {professionals.map((professional, index) => (
              <div
                key={professional}
                className={`border-line flex min-h-20 items-center gap-4 py-4 md:min-h-28 md:gap-5 md:py-5 ${index % 2 === 0 ? "md:border-r md:pr-8" : "md:pl-8"} ${index < professionals.length - 2 ? "border-b" : ""}`}
              >
                <span className="type-model text-accent">0{index + 1}</span>
                <h2 className="type-h3">{professional}</h2>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow className="text-emerald-300">Configure</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="type-section">Build around your technology.</h2>
              <p className="type-body-lg mt-6 max-w-2xl text-white/65">
                Start with the room, product family and equipment categories to
                create an initial project brief.
              </p>
              <PrimaryButton
                asChild
                className="text-brand-950! hover:border-accent hover:bg-accent! mt-9 border-white bg-white! hover:text-white!"
              >
                <Link href={routes.configure}>
                  Configure a Product{" "}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Projects"
            title="Technology furniture across applications."
            description="Applications span education, corporate, government, public and specialist environments. Published project stories require client approval."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-5">
            {applications.map((application, index) => (
              <Link
                key={application}
                href={routes.projects}
                className="group bg-surface hover:bg-accent-light grid min-h-44 content-between p-5 md:min-h-56"
              >
                <span className="type-model text-ink-muted">0{index + 1}</span>
                <div>
                  <h2 className="type-h4">{application}</h2>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow mt-5 size-4"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Resources"
            title="Information for design and specification."
            description="The library organises product literature, technical files and planning information for professional project teams."
            action={
              <Link
                href={routes.resources}
                className="border-graphite inline-flex min-h-11 items-center gap-2 border-b text-sm font-semibold"
              >
                View Resources <ArrowRight aria-hidden className="size-4" />
              </Link>
            }
          />
          <ul className="border-line border-t">
            {resourceTypes.map((resource, index) => (
              <li
                key={resource}
                className="border-line grid min-h-16 grid-cols-[3rem_1fr_auto] items-center border-b"
              >
                <span className="type-model text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold">{resource}</span>
                <Download aria-hidden className="text-ink-muted size-4" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="border-line grid gap-10 border-t pt-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>Start a Project</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="type-section">
                Let’s create the right platform for your technology.
              </h2>
              <PrimaryButton asChild className="mt-9">
                <Link href={routes.contact}>
                  Discuss Your Project{" "}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
