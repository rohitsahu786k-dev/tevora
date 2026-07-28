import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ProductActionBar } from "@/components/products/product-action-bar";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import {
  Container,
  EmptyState,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui/system";
import {
  accessories,
  productFamilies,
  products,
  sectors,
  spaces,
} from "@/content";
import { getProductDetailContent } from "@/content/product-detail-content";
import {
  productToAccessories,
  productToSectors,
  productToSpaces,
} from "@/content/relationships";
import { getContentBreadcrumbs } from "@/lib/navigation/content-navigation";
import { routes } from "@/lib/routes";
import { ProductJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  ImageReveal,
  MaskedHeading,
  ProductGallery,
  StickyProductStory,
  ViewportReveal,
} from "@/components/motion";
import { sharedElementStyle } from "@/lib/motion/shared-elements";
import { productConceptMediaBySlug } from "@/content/media";

const specificationGroups = [
  "Overall dimensions",
  "Display compatibility",
  "VESA compatibility",
  "Device compatibility",
  "Camera compatibility",
  "Soundbar compatibility",
  "Equipment capacity",
  "Rack capacity",
  "Power and data",
  "Cable management",
  "Ventilation",
  "Service access",
  "Mobility",
  "Height adjustment",
  "Accessibility",
  "Materials",
  "Finishes",
  "Installation",
  "Compliance",
  "Sustainability",
];
const accessoryGroupOrder = [
  "display-mounting",
  "camera-mounting",
  "soundbar-mounting",
  "device-shelves",
  "rack-integration",
  "power",
  "connectivity",
  "cable-management",
  "mobility",
  "security",
  "accessibility",
  "equipment-cooling",
];
const resourceTypes = [
  "Product brochure",
  "Technical data sheet",
  "CAD",
  "BIM",
  "Revit",
  "STEP",
  "Installation guide",
  "Care guide",
  "Finish card",
  "Certifications",
];
export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product
    ? createPageMetadata({
        title: product.seo.title,
        description: product.seo.description,
        path: routes.product(product.slug),
        noIndex: product.dataStatus !== "verified",
      })
    : {};
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const family = productFamilies.find(
    (item) => item.id === product.productFamily,
  );
  if (!family) notFound();
  const detail = getProductDetailContent(product);
  const conceptMedia = productConceptMediaBySlug[product.slug];
  const supportedSpaces = (productToSpaces[product.slug] ?? [])
    .map((item) => spaces.find((space) => space.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const supportedSectors = (productToSectors[product.slug] ?? [])
    .map((item) => sectors.find((sector) => sector.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const mappedAccessories = new Set(productToAccessories[product.slug] ?? []);
  const orderedAccessories = accessoryGroupOrder
    .map((item) => accessories.find((accessory) => accessory.slug === item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <ProductJsonLd
        product={product}
        familyName={family.name}
        image={detail.heroMedia}
      />
      <section className="bg-surface">
        <Container className="py-10 md:py-16">
          <Breadcrumbs items={getContentBreadcrumbs("product", product.slug)} />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <ViewportReveal className="flex flex-col justify-end lg:col-span-5">
              <p className="type-eyebrow text-accent">{family.name}</p>
              <p className="type-series mt-6">{product.series} SERIES</p>
              <MaskedHeading as="h1" className="type-hero mt-4" delay={0.08}>
                {product.name}
              </MaskedHeading>
              <p className="type-body-lg text-ink-muted mt-5">
                {product.descriptor}
              </p>
              <dl className="border-line mt-8 grid grid-cols-2 gap-5 border-y py-5">
                <div>
                  <dt className="type-spec-label text-ink-muted">Model</dt>
                  <dd className="type-technical mt-2">
                    {product.model ?? "Project configured"}
                  </dd>
                </div>
                <div>
                  <dt className="type-spec-label text-ink-muted">Status</dt>
                  <dd className="type-technical mt-2">
                    {product.productStatus === "placeholder"
                      ? "Project configured"
                      : product.productStatus}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton asChild>
                  <Link
                    href={
                      `${routes.configure}?product=${product.slug}` as never
                    }
                  >
                    Configure <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </PrimaryButton>
                <SecondaryButton asChild>
                  <a href="#resources">
                    Downloads <Download aria-hidden className="size-4" />
                  </a>
                </SecondaryButton>
                <SecondaryButton asChild>
                  <Link href={routes.contact}>Discuss Your Project</Link>
                </SecondaryButton>
              </div>
            </ViewportReveal>
            <ImageReveal
              priority
              className="relative aspect-[4/3] bg-white lg:col-span-7"
            >
              <div
                className="absolute inset-0"
                style={sharedElementStyle("product", product.slug)}
              >
                <Image
                  src={detail.heroMedia}
                  alt={detail.heroAlt}
                  fill
                  priority
                  sizes="(min-width:1024px) 58vw, 100vw"
                  className="object-contain"
                />
              </div>
            </ImageReveal>
          </div>
        </Container>
      </section>
      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Product introduction"
            title="A clear physical position for technology."
          />
          <div className="grid gap-px border-y border-white/20 md:grid-cols-2">
            <IntroBlock label="What it is" copy={detail.introduction} />
            <IntroBlock label="Who uses it" copy={detail.users} />
            <IntroBlock label="Technology context" copy={detail.technology} />
            <IntroBlock label="Problem addressed" copy={detail.problem} />
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {supportedSpaces.slice(0, 6).map((space) => (
              <Link
                key={space.slug}
                href={routes.space(space.slug)}
                className="min-h-11 border border-white/25 px-4 py-3 text-sm hover:border-emerald-300"
              >
                {space.name}
              </Link>
            ))}
            {supportedSectors.slice(0, 4).map((sector) => (
              <Link
                key={sector.slug}
                href={routes.sector(sector.slug)}
                className="min-h-11 border border-white/25 px-4 py-3 text-sm hover:border-emerald-300"
              >
                {sector.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Feature stories"
            title="Technology considered through the furniture"
            description="See how the series supports equipment, users and room planning before the final specification is confirmed."
          />
          <StickyProductStory
            items={detail.featureStories.map((story) => ({
              title: story.title,
              eyebrow: story.topic,
              body: story.explanation,
              note: story.technicalNote,
              media: story.media,
              alt: `${story.title} — representative product environment`,
            }))}
          />
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Product views"
            title="Concept views for planning"
            description="These views show the intended form and integration direction so the product can be discussed clearly."
          />
          <ProductGallery
            items={[
              {
                src: detail.heroMedia,
                alt: detail.heroAlt,
                label: "Environment",
              },
              ...detail.featureStories.map((story) => ({
                src: story.media,
                alt: `${story.title} — representative product environment`,
                label: story.title,
              })),
            ]}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Variants"
            title="Options discussed during specification"
            description="Sizes, finishes, mounting details and equipment fit are selected with the project team."
          />
          {product.variants.length ||
          product.finishes.length ||
          product.model ? (
            <div className="border-line border p-6">
              Configured options are available for this series.
            </div>
          ) : (
            <EmptyState
              title="Project-specific options are reviewed with TEVORA"
              description="Share the room, equipment list and installation goals so the right size, finish and configuration can be selected."
            />
          )}
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Technical specifications"
            title="Technical information for project review"
            description="Dimensions, equipment capacity and compatibility are confirmed against the room and device schedule."
          />
          <div className="grid gap-px border border-white/20 bg-white/20 md:grid-cols-2">
            {specificationGroups.map((group, index) => (
              <section key={group} className="bg-brand-950 min-h-36 p-5">
                <div className="flex justify-between">
                  <h2 className="type-h5">{group}</h2>
                  <span className="type-model text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="type-technical mt-10 text-white/50">
                  Confirmed during project review.
                </p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Compatible accessories"
            title="Accessory groups that extend this series"
            description="These groups help adapt the product for displays, cameras, power, cable routing, mobility and service needs."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {orderedAccessories.map((accessory) => (
              <Link
                key={accessory.slug}
                href={routes.accessory(accessory.slug)}
                className="bg-canvas hover:bg-accent-light min-h-44 p-5"
              >
                <h2 className="type-h4">{accessory.name}</h2>
                <p className="type-technical text-ink-muted mt-12">
                  {mappedAccessories.has(accessory.slug)
                    ? "Commonly paired - confirm final fit during project review."
                    : "Available when project requirements call for it."}
                </p>
              </Link>
            ))}
          </div>
          <dl className="bg-line mt-8 grid gap-px md:grid-cols-3">
            <div className="bg-canvas p-5">
              <dt className="type-spec-label text-ink-muted">
                Required components
              </dt>
              <dd className="type-body-sm mt-4">
                Base product required; accessory selections depend on room and
                device requirements.
              </dd>
            </div>
            <div className="bg-canvas p-5">
              <dt className="type-spec-label text-ink-muted">
                Compatibility notes
              </dt>
              <dd className="type-body-sm mt-4">
                Compatibility is confirmed during project review.
              </dd>
            </div>
            <div className="bg-canvas p-5">
              <dt className="type-spec-label text-ink-muted">
                Excluded combinations
              </dt>
              <dd className="type-body-sm mt-4">
                Exclusions are checked against selected equipment and
                installation conditions.
              </dd>
            </div>
          </dl>
        </Container>
      </Section>
      <section
        id="resources"
        className="bg-surface scroll-mt-24 py-16 md:py-24"
      >
        <Container>
          <SectionHeader
            eyebrow="Resources"
            title="Product files and documentation"
            description="Download drawings, data sheets and project files after signing in with a TEVORA-issued login."
          />
          <div className="border-line bg-line grid gap-px border sm:grid-cols-2 lg:grid-cols-5">
            {resourceTypes.map((resource) => (
              <div
                key={resource}
                className="bg-surface grid min-h-40 content-between p-5"
              >
                <Download aria-hidden className="text-accent size-4" />
                <div>
                  <h2 className="type-h5">{resource}</h2>
                  <p className="type-caption text-ink-muted mt-2">
                    TEVORA login required
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Section tone="dark">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Eyebrow className="text-emerald-300 md:col-span-3">
              Project support
            </Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">
                Discuss {product.name} for your technology environment.
              </h2>
              <PrimaryButton
                asChild
                className="text-brand-950! hover:border-accent hover:bg-accent! mt-9 border-white bg-white! hover:text-white!"
              >
                <Link href={routes.contact}>
                  Discuss Your Project{" "}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </Container>
      </Section>
      <ProductActionBar productName={product.name} productSlug={product.slug} />
    </main>
  );
}
function IntroBlock({ label, copy }: { label: string; copy: string }) {
  return (
    <article className="min-h-64 border-white/20 p-6 md:odd:border-r">
      <p className="type-spec-label text-emerald-300">{label}</p>
      <p className="type-body-lg mt-14 text-white/75">{copy}</p>
    </article>
  );
}
