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
import { mediaAssets, productConceptMediaBySlug } from "@/content/media";
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
    "Explore ONESPACE technology-integrated furniture product families for presentation, display, collaboration and equipment integration.",
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
const productHeroImage = mediaAssets.productsMainHero;
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
    title: "Move technology between rooms",
    concepts: mobileAvCartConcepts,
  },
  {
    eyebrow: "Technology Credenzas",
    title: "Conceal and service AV equipment",
    concepts: technologyCredenzaConcepts,
  },
  {
    eyebrow: "Learning Furniture",
    title: "Teaching and learning",
    concepts: learningConcepts,
  },
  {
    eyebrow: "Collaboration Tables",
    title: "Tables ready for devices and displays",
    concepts: collaborationConcepts,
  },
  {
    eyebrow: "Media Walls & Space Dividers",
    title: "Divide space and support displays",
    concepts: mediaWallConcepts,
  },
  {
    eyebrow: "AV Equipment Enclosures",
    title: "Secure equipment",
    concepts: avEquipmentEnclosureConcepts,
  },
  {
    eyebrow: "Room Control & Scheduling",
    title: "Control, book and manage rooms",
    concepts: roomControlConcepts,
  },
  {
    eyebrow: "Interactive Kiosks",
    title: "Self-service points",
    concepts: interactiveKioskConcepts,
  },
  {
    eyebrow: "Technical Workstations",
    title: "Workstations for specialist operators",
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
                Find the right product family for presentation, display,
                collaboration, equipment storage, room control and
                technology-ready spaces.
              </p>
            </ViewportReveal>
          </div>
          {productHeroImage && (
            <ImageReveal priority className="min-w-0 lg:col-span-7">
              <SingleHeroImage
                image={productHeroImage}
                priority
                fit="cover"
                aspect="16/9"
                className="border-white/10 bg-white/5 shadow-2xl shadow-black/25"
              />
            </ImageReveal>
          )}
        </Container>
      </section>
      <Section className="py-10 md:py-12">
        <Container>
          <SectionHeader
            eyebrow="Product approach"
            title="Furniture designed around the technology people need to use."
            description="ONESPACE helps project teams place screens, devices, controls, equipment and cables into clean, serviceable furniture."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {[
              [
                "01",
                "Connected",
                "Furniture, displays, controls and equipment work as one room system.",
              ],
              [
                "02",
                "Adaptable",
                "Product families, series and accessories support different room sizes and use cases.",
              ],
              [
                "03",
                "Easy to support",
                "Service access, cable routing and equipment ventilation are planned from the start.",
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
            title="Choose the family that matches the job."
            description="Start with what the room needs to do, then open the product family that fits the presentation, display, storage, control or collaboration requirement."
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
            title="See the range at a glance."
            description="Scan each family quickly, compare the product direction and open the series that fits your project."
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
            eyebrow="How to specify"
            title="Move from product choice to a clear order request."
            description="Select a core product, confirm the equipment it must support, then add the modules and accessories needed for installation."
          />
          <div className="grid gap-5 md:grid-cols-3">
            <div className="border-t border-white/20 pt-5">
              <p className="type-model text-emerald-300">01 / CORE PRODUCT</p>
              <h2 className="type-h4 mt-6">
                Choose the product family and series.
              </h2>
            </div>
            <div className="border-t border-white/20 pt-5">
              <p className="type-model text-emerald-300">02 / EQUIPMENT</p>
              <h2 className="type-h4 mt-6">
                Add the screens, devices and room conditions.
              </h2>
            </div>
            <div className="border-t border-white/20 pt-5">
              <p className="type-model text-emerald-300">03 / EXTENSION</p>
              <h2 className="type-h4 mt-6">
                Include the required modules and accessories.
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
            title="Find products by room type"
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
            title="Find products by customer sector"
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
              title="Build your order request."
              copy="Select products, add key requirements and review estimated pricing."
              href={routes.configure}
              cta="Configure a Product"
            />
            <Callout
              eyebrow="Design Support"
              title="Get specification support."
              copy="Share the room requirement with ONESPACE for product and integration guidance."
              href={routes.designSupport}
              cta="Explore Design Support"
            />
            <Callout
              eyebrow="Resources"
              title="Download project files."
              copy="Access brochures, data sheets, drawings and planning files for active projects."
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
