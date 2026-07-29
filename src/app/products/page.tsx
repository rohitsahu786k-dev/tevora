import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui/system";
import { productFamilies, products, sectors, spaces } from "@/content";
import { productConceptMediaBySlug } from "@/content/media";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  ImageReveal,
  MaskedHeading,
  ViewportReveal,
} from "@/components/motion";
import { SingleHeroImage } from "@/components/media/single-hero-image";
import { sharedElementStyle } from "@/lib/motion/shared-elements";
export const metadata = createPageMetadata({
  title: "Products",
  description:
    "Explore TEVORA technology-integrated furniture product families for presentation, display, collaboration and equipment integration.",
  path: routes.products,
});

const familyTiles = [
  ...productFamilies.map((family) => ({
    name: family.name,
    slug: family.slug,
    description: family.shortDescription,
    href: routes.productFamily(family.slug),
    series: `${family.series.length} series`,
  })),
  {
    name: "Accessories",
    slug: "accessories",
    description:
      "Mounting, power, connectivity, cable management and equipment-support accessories.",
    href: routes.accessories,
    series: "12 groups",
  },
];
const browseSpaces = [
  "lecture-theatre",
  "classroom",
  "boardroom",
  "conference-room",
  "collaboration-space",
  "control-room",
]
  .map((slug) => spaces.find((space) => space.slug === slug))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const browseSectors = sectors.slice(0, 8);
const presentationConcepts = [
  "arc",
  "arc-pro",
  "lift",
  "lift-access",
  "pivot",
  "edu-station",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const displayStandConcepts = [
  "vista",
  "vista-duo",
  "vista-xl",
  "frame",
  "frame-wall",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const mobileAvCartConcepts = [
  "move",
  "move-pro",
  "move-duo",
  "move-edu",
  "move-xl",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const technologyCredenzaConcepts = [
  "nexus",
  "nexus-compact",
  "nexus-rack",
  "nexus-edu",
  "nexus-wall",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const learningConcepts = ["edu", "learn", "lab", "flex", "flex-mobile"]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const collaborationConcepts = [
  "forum",
  "converge",
  "huddle",
  "link",
  "link-modular",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const mediaWallConcepts = [
  "mediawall",
  "mediawall-mobile",
  "boundary",
  "shift",
  "focus",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const avEquipmentEnclosureConcepts = [
  "core",
  "core-compact",
  "core-wall",
  "core-mobile",
  "core-rack",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const roomControlConcepts = [
  "panel",
  "panel-desk",
  "panel-wall",
  "schedule",
  "dock",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const interactiveKioskConcepts = [
  "touch",
  "touch-wall",
  "touch-mini",
  "way",
  "check",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const technicalWorkstationConcepts = [
  "analyst",
  "studio",
  "monitor",
  "techdesk",
  "techdesk-pro",
]
  .map((slug) => {
    const product = products.find((item) => item.slug === slug);
    const media = productConceptMediaBySlug[slug];
    return product && media?.kind === "image" ? { product, media } : null;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
const productHeroImage = productConceptMediaBySlug.arc;
const conceptGroups = [
  {
    eyebrow: "Presentation Stations",
    title: "Presenter positions",
    concepts: presentationConcepts,
  },
  {
    eyebrow: "Display Stands",
    title: "Display structures",
    concepts: displayStandConcepts,
  },
  {
    eyebrow: "Mobile AV Carts",
    title: "Flexible technology",
    concepts: mobileAvCartConcepts,
  },
  {
    eyebrow: "Technology Credenzas",
    title: "Equipment furniture",
    concepts: technologyCredenzaConcepts,
  },
  {
    eyebrow: "Learning Furniture",
    title: "Teaching and learning",
    concepts: learningConcepts,
  },
  {
    eyebrow: "Collaboration Tables",
    title: "Shared technology",
    concepts: collaborationConcepts,
  },
  {
    eyebrow: "Media Walls & Space Dividers",
    title: "Spatial technology",
    concepts: mediaWallConcepts,
  },
  {
    eyebrow: "AV Equipment Enclosures",
    title: "Secure equipment",
    concepts: avEquipmentEnclosureConcepts,
  },
  {
    eyebrow: "Room Control & Scheduling",
    title: "Room interfaces",
    concepts: roomControlConcepts,
  },
  {
    eyebrow: "Interactive Kiosks",
    title: "Self-service points",
    concepts: interactiveKioskConcepts,
  },
  {
    eyebrow: "Technical Workstations",
    title: "Focused work",
    concepts: technicalWorkstationConcepts,
  },
];
export default function ProductsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 overflow-hidden text-white">
        <Container className="grid gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Products" }]}
            />
            <ViewportReveal>
              <Eyebrow className="mt-8 text-emerald-300 md:mt-10">
                Products
              </Eyebrow>
              <MaskedHeading as="h1" className="type-h2 mt-5 max-w-4xl">
                Technology furniture, clearly organised.
              </MaskedHeading>
              <p className="type-body-lg mt-5 max-w-2xl text-white/70">
                Explore twelve product families for presenting, displaying,
                collaborating, integrating equipment and supporting
                technology-led spaces.
              </p>
            </ViewportReveal>
          </div>
          {productHeroImage && (
            <ImageReveal priority className="min-w-0 lg:col-span-7">
              <SingleHeroImage image={productHeroImage} priority />
            </ImageReveal>
          )}
        </Container>
      </section>
      <Section className="py-10 md:py-12">
        <Container>
          <SectionHeader
            eyebrow="Product philosophy"
            title="Begin with the technology. Resolve the furniture around it."
            description="TEVORA products bring equipment, infrastructure, user interaction and service requirements into one coordinated physical product."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {[
              [
                "01",
                "Integrated",
                "Furniture and room technology considered together.",
              ],
              [
                "02",
                "Modular",
                "Series and accessories organised for different project requirements.",
              ],
              [
                "03",
                "Serviceable",
                "Access, cable routing and equipment accommodation treated as part of the product architecture.",
              ],
            ].map(([number, title, copy]) => (
              <article key={number} className="bg-canvas min-h-36 p-5">
                <span className="type-model text-accent">{number}</span>
                <h2 className="type-h4 mt-6">{title}</h2>
                <p className="type-body-sm text-ink-muted mt-4">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white" className="py-10 md:py-12">
        <Container>
          <SectionHeader
            eyebrow="Product Families"
            title="Twelve clear ways into the range"
            description="Large product families organise furniture by use, form and technology role—not by abstract system language."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2 xl:grid-cols-3">
            {familyTiles.map((family, index) => (
              <Link
                key={family.slug}
                href={family.href as never}
                style={sharedElementStyle("family", family.slug)}
                className="motion-card group bg-surface hover:bg-accent-light grid min-h-48 content-between p-5"
              >
                <div className="flex justify-between">
                  <span className="type-model text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="type-series text-accent">
                    {family.series}
                  </span>
                </div>
                <div>
                  <h2 className="type-h3">{family.name}</h2>
                  <p className="type-body-sm text-ink-muted mt-3 max-w-xl">
                    {family.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    Explore family{" "}
                    <ArrowRight aria-hidden className="motion-arrow size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="muted" className="py-10 md:py-12">
        <Container>
          <SectionHeader
            eyebrow="Product Concepts"
            title="Compare product directions without endless scrolling."
            description="Each family stays visible as a compact row. Open the product when a concept looks relevant to the project."
            className="md:mb-6"
          />
          <div className="grid gap-5">
            {conceptGroups.map((group) => (
              <ConceptGroup key={group.eyebrow} {...group} />
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="dark" className="py-10 md:py-12">
        <Container>
          <SectionHeader
            eyebrow="Product architecture"
            title="A product, extended through modules and accessories."
            description="Product series provide the core furniture form. Accessories extend mounting, equipment support, power, connectivity, cable management, mobility and service requirements."
          />
          <div className="grid gap-5 md:grid-cols-3">
            <div className="border-t border-white/20 pt-5">
              <p className="type-model text-emerald-300">01 / CORE PRODUCT</p>
              <h2 className="type-h4 mt-6">
                Select the product family and series.
              </h2>
            </div>
            <div className="border-t border-white/20 pt-5">
              <p className="type-model text-emerald-300">02 / EQUIPMENT</p>
              <h2 className="type-h4 mt-6">
                Define the technology categories and room conditions.
              </h2>
            </div>
            <div className="border-t border-white/20 pt-5">
              <p className="type-model text-emerald-300">03 / EXTENSION</p>
              <h2 className="type-h4 mt-6">
                Add relevant modules and accessories.
              </h2>
            </div>
          </div>
          <PrimaryButton
            asChild
            className="text-brand-950! hover:border-accent hover:bg-accent! mt-12 border-white bg-white! hover:text-white!"
          >
            <Link href={routes.configure}>
              Configure a Product <ArrowRight aria-hidden className="size-4" />
            </Link>
          </PrimaryButton>
        </Container>
      </Section>
      <Section className="py-10 md:py-12">
        <Container>
          <SectionHeader
            eyebrow="Browse by Space"
            title="Start with the room"
          />
          <div className="border-line bg-line flex gap-px overflow-x-auto border md:grid md:grid-cols-3 md:overflow-visible">
            {browseSpaces.map((space) => (
              <Link
                key={space.slug}
                href={routes.space(space.slug)}
                className="motion-card group bg-canvas hover:bg-accent-light grid min-h-36 min-w-[16rem] content-between p-5 md:min-w-0"
              >
                <span className="type-caption text-ink-muted">
                  {space.group}
                </span>
                <div>
                  <h2 className="type-h3">{space.name}</h2>
                  <ArrowRight
                    aria-hidden
                    className="mt-5 size-4 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white" className="py-10 md:py-12">
        <Container>
          <SectionHeader
            eyebrow="Browse by Sector"
            title="Products for different project contexts"
          />
          <div className="border-line flex gap-px overflow-x-auto border-y md:grid md:grid-cols-4 md:overflow-visible">
            {browseSectors.map((sector, index) => (
              <Link
                key={sector.slug}
                href={routes.sector(sector.slug)}
                className={`group min-h-32 min-w-[13rem] p-5 md:min-w-0 ${index % 4 !== 3 ? "md:border-line md:border-r" : ""}`}
              >
                <span className="type-model text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="type-h4 mt-8">{sector.name}</h2>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="py-10 md:py-12">
        <Container>
          <div className="bg-line grid gap-px md:grid-cols-3">
            <Callout
              eyebrow="Configure"
              title="Build around your technology."
              copy="Create an initial product and project brief."
              href={routes.configure}
              cta="Configure a Product"
            />
            <Callout
              eyebrow="Design Support"
              title="Specify with confidence."
              copy="Support for integrators, architects and consultants."
              href={routes.designSupport}
              cta="Explore Design Support"
            />
            <Callout
              eyebrow="Resources"
              title="Information for project teams."
              copy="Request product files, drawings and planning information for your project stage."
              href={routes.resources}
              cta="Browse Resources"
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
function ConceptGroup({
  eyebrow,
  title,
  concepts,
}: {
  eyebrow: string;
  title: string;
  concepts: typeof presentationConcepts;
}) {
  return (
    <section className="border-line bg-surface border p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="type-series text-accent">{eyebrow}</p>
          <h2 className="type-h4 mt-2">{title}</h2>
        </div>
        <span className="type-model text-ink-muted">
          {concepts.length} concepts
        </span>
      </div>
      <div className="bg-line flex gap-px overflow-x-auto">
        {concepts.map(({ product, media }) => (
          <Link
            key={product.slug}
            href={routes.product(product.slug)}
            className="motion-card group bg-surface min-w-[13.5rem] md:min-w-[15rem]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="15rem"
                placeholder={media.blurDataURL ? "blur" : "empty"}
                blurDataURL={media.blurDataURL}
                className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
              />
            </div>
            <div className="flex min-h-20 items-end justify-between gap-3 p-4">
              <h3 className="text-base leading-tight font-semibold">
                {product.name}
              </h3>
              <ArrowRight
                aria-hidden
                className="motion-arrow size-4 shrink-0"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
function Callout({
  eyebrow,
  title,
  copy,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="bg-canvas min-h-64 p-6">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="type-h2 mt-10">{title}</h2>
      <p className="type-body-sm text-ink-muted mt-4">{copy}</p>
      <SecondaryButton asChild className="mt-8">
        <Link href={href as never}>
          {cta} <ArrowRight aria-hidden className="size-4" />
        </Link>
      </SecondaryButton>
    </article>
  );
}
