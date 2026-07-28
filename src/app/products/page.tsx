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
export default function ProductsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 relative min-h-[72svh] overflow-hidden text-white">
        <ImageReveal priority className="absolute inset-0">
          <Image
            src="/media/home/technology-learning-hero.png"
            alt="Integrated presentation and collaboration furniture in a technology-enabled learning environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] opacity-60"
          />
        </ImageReveal>
        <div className="from-brand-950 via-brand-950/80 absolute inset-0 bg-gradient-to-r to-transparent" />
        <Container className="relative flex min-h-[72svh] flex-col justify-end pt-32 pb-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Products" }]}
          />
          <ViewportReveal>
            <Eyebrow className="mt-16 text-emerald-300">Products</Eyebrow>
            <MaskedHeading as="h1" className="type-hero mt-7 max-w-5xl">
              Technology furniture, clearly organised.
            </MaskedHeading>
            <p className="type-body-lg mt-7 max-w-2xl text-white/70">
              Explore twelve product families for presenting, displaying,
              collaborating, integrating equipment and supporting technology-led
              spaces.
            </p>
          </ViewportReveal>
        </Container>
      </section>
      <Section>
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
              <article key={number} className="bg-canvas min-h-64 p-6">
                <span className="type-model text-accent">{number}</span>
                <h2 className="type-h3 mt-16">{title}</h2>
                <p className="type-body-sm text-ink-muted mt-4">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Product Families"
            title="Twelve clear ways into the range"
            description="Large product families organise furniture by use, form and technology role—not by abstract system language."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {familyTiles.map((family, index) => (
              <Link
                key={family.slug}
                href={family.href as never}
                style={sharedElementStyle("family", family.slug)}
                className="group bg-surface hover:bg-accent-light grid min-h-[23rem] content-between p-6 md:p-9"
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
                  <h2 className="type-section">{family.name}</h2>
                  <p className="type-body-sm text-ink-muted mt-5 max-w-xl">
                    {family.description}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                    Explore family{" "}
                    <ArrowRight aria-hidden className="motion-arrow size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Presentation Station Concepts"
            title="Different formats for different presenter positions."
            description="Concept views help compare presenter positions, equipment access and room-control approaches before specification."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {presentationConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      Presentation Stations
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Display Stand Concepts"
            title="Structures that make display technology part of the space."
            description="Review display structures by screen format, peripheral placement and the amount of architecture the room needs."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {displayStandConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">Display Stands</p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Mobile AV Cart Concepts"
            title="Technology that can move with the space."
            description="Compare mobile formats for flexible rooms, shared displays and video-collaboration setups."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {mobileAvCartConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">Mobile AV Carts</p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Technology Credenza Concepts"
            title="Equipment infrastructure behind a calm architectural exterior."
            description="Use these concepts to discuss equipment storage, ventilation, cable routing and service access inside architectural furniture."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {technologyCredenzaConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      Technology Credenzas
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Learning Furniture Concepts"
            title="Furniture for teaching, demonstration and group learning."
            description="Explore teaching and learning formats for classrooms, labs, training spaces and device-supported group work."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {learningConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      Learning Furniture
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Collaboration Table Concepts"
            title="Tables designed around shared technology."
            description="Compare table formats for hybrid meetings, boardrooms, huddle rooms, teamwork and training."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {collaborationConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      Collaboration Tables
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Media Walls & Space Divider Concepts"
            title="Architectural structure for technology and spatial definition."
            description="Review ways to combine display technology with room division, spatial focus and flexible collaboration zones."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {mediaWallConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      Media Walls &amp; Space Dividers
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="AV Equipment Enclosure Concepts"
            title="Secure, serviceable furniture for supporting equipment."
            description="Compare enclosure formats for protecting hardware while keeping airflow, cable routing and service access in view."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {avEquipmentEnclosureConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      AV Equipment Enclosures
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Room Control & Scheduling Concepts"
            title="Dedicated positions for room interfaces."
            description="Explore stands, mounts and docks for placing room controls and booking panels where people naturally use them."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {roomControlConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      Room Control &amp; Scheduling
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Interactive Kiosk Concepts"
            title="Purpose-built furniture for self-service and public interaction."
            description="Compare kiosk formats for touchscreens, tablets, wayfinding, check-in and public-facing digital workflows."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {interactiveKioskConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      Interactive Kiosks
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Technical Workstation Concepts"
            title="Focused furniture for monitoring, editing and specialist work."
            description="Review workstation concepts for multi-display work, equipment-heavy tasks and focused technical environments."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {technicalWorkstationConcepts.map(({ product, media }) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className="group bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder={media.blurDataURL ? "blur" : "empty"}
                    blurDataURL={media.blurDataURL}
                    className="object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.015] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="type-series text-accent">
                      Technical Workstations
                    </p>
                    <h2 className="type-h3 mt-3">{product.name}</h2>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="motion-arrow size-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Product architecture"
            title="A product, extended through modules and accessories."
            description="Product series provide the core furniture form. Accessories extend mounting, equipment support, power, connectivity, cable management, mobility and service requirements."
          />
          <div className="grid gap-8 md:grid-cols-12">
            <div className="border-t border-white/20 pt-5 md:col-span-4">
              <p className="type-model text-emerald-300">01 / CORE PRODUCT</p>
              <h2 className="type-h3 mt-12">
                Select the product family and series.
              </h2>
            </div>
            <div className="border-t border-white/20 pt-5 md:col-span-4">
              <p className="type-model text-emerald-300">02 / EQUIPMENT</p>
              <h2 className="type-h3 mt-12">
                Define the technology categories and room conditions.
              </h2>
            </div>
            <div className="border-t border-white/20 pt-5 md:col-span-4">
              <p className="type-model text-emerald-300">03 / EXTENSION</p>
              <h2 className="type-h3 mt-12">
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
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Browse by Space"
            title="Start with the room"
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {browseSpaces.map((space) => (
              <Link
                key={space.slug}
                href={routes.space(space.slug)}
                className="group bg-canvas hover:bg-accent-light grid min-h-52 content-between p-6"
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
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Browse by Sector"
            title="Products for different project contexts"
          />
          <div className="border-line grid gap-px border-y md:grid-cols-4">
            {browseSectors.map((sector, index) => (
              <Link
                key={sector.slug}
                href={routes.sector(sector.slug)}
                className={`group min-h-44 p-5 ${index % 4 !== 3 ? "md:border-line md:border-r" : ""}`}
              >
                <span className="type-model text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="type-h4 mt-12">{sector.name}</h2>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
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
    <article className="bg-canvas min-h-80 p-7">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="type-h2 mt-14">{title}</h2>
      <p className="type-body-sm text-ink-muted mt-4">{copy}</p>
      <SecondaryButton asChild className="mt-8">
        <Link href={href as never}>
          {cta} <ArrowRight aria-hidden className="size-4" />
        </Link>
      </SecondaryButton>
    </article>
  );
}
