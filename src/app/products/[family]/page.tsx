import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ProductBrowser } from "@/components/products/product-browser";
import { ProductBrowserSkeleton } from "@/components/products/product-browser-skeleton";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import {
  Container,
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
import {
  productToAccessories,
  productToSectors,
  productToSpaces,
} from "@/content/relationships";
import { productConceptMediaBySlug } from "@/content/media";
import { getFamilyFilterDefinitions } from "@/lib/products/filtering";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  ImageReveal,
  MaskedHeading,
  ViewportReveal,
} from "@/components/motion";
import { sharedElementStyle } from "@/lib/motion/shared-elements";

const engineeringCapabilities = [
  "Equipment accommodation",
  "Mounting integration",
  "Power and data pathways",
  "Cable routing",
  "Ventilation planning",
  "Service access",
];
const technologyCategories = [
  "Displays and interactive displays",
  "Cameras and soundbars",
  "Controllers and user interfaces",
  "Computers, codecs and AV equipment",
  "Power and data",
  "Cable management and equipment access",
];
export function generateStaticParams() {
  return productFamilies.map(({ slug }) => ({ family: slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string }>;
}): Promise<Metadata> {
  const { family: slug } = await params;
  const family = productFamilies.find((item) => item.slug === slug);
  return family
    ? createPageMetadata({
        title: family.seo.title,
        description: family.seo.description,
        path: routes.productFamily(family.slug),
        noIndex: family.dataStatus !== "verified",
      })
    : {};
}
export default async function ProductFamilyPage({
  params,
}: {
  params: Promise<{ family: string }>;
}) {
  const { family: slug } = await params;
  const family = productFamilies.find((item) => item.slug === slug);
  if (!family) notFound();
  const familyProducts = products.filter(
    (product) => product.family === family.slug,
  );
  const familyConceptMedia = familyProducts
    .map((product) => productConceptMediaBySlug[product.slug])
    .find((media) => media?.kind === "image");
  const featured = familyProducts[0];
  const spaceSlugs = [
    ...new Set(
      familyProducts.flatMap((product) => productToSpaces[product.slug] ?? []),
    ),
  ];
  const sectorSlugs = [
    ...new Set(
      familyProducts.flatMap((product) => productToSectors[product.slug] ?? []),
    ),
  ];
  const supportedSpaces = spaceSlugs
    .map((spaceSlug) => spaces.find((space) => space.slug === spaceSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 8);
  const supportedSectors = sectorSlugs
    .map((sectorSlug) => sectors.find((sector) => sector.slug === sectorSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 8);
  const accessorySlugs = [
    ...new Set(
      familyProducts.flatMap(
        (product) => productToAccessories[product.slug] ?? [],
      ),
    ),
  ];
  const compatibleAccessories = accessorySlugs
    .map((accessorySlug) =>
      accessories.find((accessory) => accessory.slug === accessorySlug),
    )
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const relatedFamilies = productFamilies
    .filter((item) => item.slug !== family.slug)
    .sort((a, b) => {
      const aProducts = products.filter((product) => product.family === a.slug);
      const bProducts = products.filter((product) => product.family === b.slug);
      const aSpaces = new Set(
        aProducts.flatMap((product) => productToSpaces[product.slug] ?? []),
      );
      const bSpaces = new Set(
        bProducts.flatMap((product) => productToSpaces[product.slug] ?? []),
      );
      return (
        spaceSlugs.filter((item) => bSpaces.has(item)).length -
        spaceSlugs.filter((item) => aSpaces.has(item)).length
      );
    })
    .slice(0, 3);
  const filterDefinitions = getFamilyFilterDefinitions(family.slug);
  const spaceNames = Object.fromEntries(
    spaces.map((space) => [space.slug, space.name]),
  );
  const familyImage =
    familyConceptMedia?.kind === "image"
      ? familyConceptMedia.src
      : "/media/home/technology-learning-hero.png";
  const familyImageAlt =
    familyConceptMedia?.kind === "image"
      ? familyConceptMedia.alt
      : `${family.name} shown in a representative technology-enabled environment`;
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-surface">
        <Container className="py-12 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: family.name },
            ]}
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <ViewportReveal className="flex flex-col justify-end lg:col-span-5">
              <Eyebrow>Product Family</Eyebrow>
              <MaskedHeading as="h1" className="type-h1 mt-6">
                {family.name}
              </MaskedHeading>
              <p className="type-body-lg text-ink-muted mt-6">
                {family.shortDescription}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton asChild>
                  <a href="#product-browser">
                    Browse Products{" "}
                    <ArrowRight aria-hidden className="size-4" />
                  </a>
                </PrimaryButton>
                <SecondaryButton asChild>
                  <Link href={routes.contact}>Discuss Your Project</Link>
                </SecondaryButton>
              </div>
            </ViewportReveal>
            <ImageReveal
              priority
              className="relative aspect-video bg-white lg:col-span-7"
            >
              <div
                className="absolute inset-0"
                style={sharedElementStyle("family", family.slug)}
              >
                <Image
                  src={familyImage}
                  alt={familyImageAlt}
                  fill
                  priority
                  sizes="(min-width:1024px) 58vw, 100vw"
                  className="object-contain"
                />
                {familyConceptMedia?.kind === "image" && (
                  <span className="type-model text-graphite absolute right-4 bottom-4 bg-white/90 px-3 py-2">
                    REPRESENTATIVE CONCEPT IMAGE
                  </span>
                )}
              </div>
            </ImageReveal>
          </div>
        </Container>
      </section>
      <Section tone="dark">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Eyebrow className="text-emerald-300 md:col-span-3">
              Family statement
            </Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">{family.shortDescription}</h2>
              <p className="type-body-lg mt-7 max-w-2xl text-white/65">
                {family.statement}
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Product types"
            title="Applications within the family"
          />
          <div className="flex flex-wrap gap-2">
            {family.productTypes.map((type) => (
              <span
                key={type}
                className="border-line bg-surface min-h-11 border px-4 py-3 text-sm font-semibold"
              >
                {type}
              </span>
            ))}
          </div>
        </Container>
      </Section>
      <section
        id="product-browser"
        className="bg-surface scroll-mt-24 py-16 md:py-24"
      >
        <Container>
          <SectionHeader
            eyebrow="Product browser"
            title={`Browse ${family.name}`}
            description="Use the relevant taxonomy filters below. Filter selections are stored in the URL so this view can be shared or revisited."
          />
          <Suspense fallback={<ProductBrowserSkeleton />}>
            <ProductBrowser
              products={familyProducts}
              definitions={filterDefinitions}
              familyName={family.name}
              spaceNames={spaceNames}
            />
          </Suspense>
        </Container>
      </section>
      {featured && (
        <Section>
          <Container>
            <SectionHeader
              eyebrow="Featured product"
              title={`${featured.series} series`}
              description="Explore the series within this product family. Technical details are published only after product verification."
            />
            <div className="border-line grid gap-8 border-y py-8 md:grid-cols-12">
              <div className="bg-surface-muted grid min-h-80 place-items-center md:col-span-7">
                <span className="type-model text-ink-muted">
                  PRODUCT VIEW NOT PUBLISHED
                </span>
              </div>
              <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
                <p className="type-series text-accent">{family.name}</p>
                <h2 className="type-product mt-4">{featured.name}</h2>
                <p className="type-body text-ink-muted mt-5">
                  {featured.overview}
                </p>
                <SecondaryButton asChild className="mt-8 self-start">
                  <Link href={routes.product(featured.slug)}>
                    View Product <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </SecondaryButton>
              </div>
            </div>
          </Container>
        </Section>
      )}
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Engineering capabilities"
            title="Designed for integration and access"
            description="Capability areas indicate the intended product-development framework, not product-specific performance claims."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {engineeringCapabilities.map((capability, index) => (
              <article key={capability} className="bg-surface min-h-44 p-5">
                <span className="type-model text-ink-muted">0{index + 1}</span>
                <h3 className="type-h4 mt-16">{capability}</h3>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Supported spaces"
            title="Considered in context"
          />
          <div className="border-line grid gap-px border-y sm:grid-cols-2 lg:grid-cols-4">
            {supportedSpaces.map((space) => (
              <Link
                key={space.slug}
                href={routes.space(space.slug)}
                className="group hover:bg-accent-light min-h-40 p-5"
              >
                <p className="type-caption text-ink-muted">{space.group}</p>
                <h3 className="type-h4 mt-10">{space.name}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Supported sectors"
            title="Relevant project environments"
          />
          <div className="flex flex-wrap gap-2">
            {supportedSectors.map((sector) => (
              <Link
                key={sector.slug}
                href={routes.sector(sector.slug)}
                className="border-line hover:border-accent min-h-11 border px-4 py-3 text-sm font-semibold"
              >
                {sector.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Technology integration"
            title="Physical products built around technology categories"
          />
          <ol className="border-t border-white/20">
            {technologyCategories.map((category, index) => (
              <li
                key={category}
                className="grid min-h-20 grid-cols-[4rem_1fr] items-center border-b border-white/20"
              >
                <span className="type-model text-emerald-300">
                  0{index + 1}
                </span>
                <h3 className="type-h4">{category}</h3>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Materials and finishes"
                title="A coordinated architectural palette"
                description="Finish names, materials, samples and environmental information will appear only after product-level verification."
              />
              <Link
                href={routes.resources}
                className="border-graphite inline-flex min-h-11 items-center gap-2 border-b text-sm font-semibold"
              >
                Finish cards <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <div>
              <SectionHeader
                eyebrow="Compatible accessories"
                title="Extend the product"
                description="Accessory-group relationships are for early navigation and require configuration-level verification."
              />
              <div className="flex flex-wrap gap-2">
                {compatibleAccessories.map((accessory) => (
                  <Link
                    key={accessory.slug}
                    href={routes.accessory(accessory.slug)}
                    className="border-line bg-surface hover:border-accent min-h-11 border px-4 py-3 text-sm font-semibold"
                  >
                    {accessory.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Resources"
            title="Information for design and installation"
            description="Files will be published as verified product resources become available."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-4">
            {[
              "Product literature",
              "Technical data",
              "CAD and BIM",
              "Installation guidance",
            ].map((resource) => (
              <Link
                key={resource}
                href={routes.resources}
                className="group bg-surface min-h-48 p-5"
              >
                <Download aria-hidden className="text-accent size-4" />
                <h3 className="type-h4 mt-20">{resource}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Related product families"
            title="Continue exploring"
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {relatedFamilies.map((related) => (
              <Link
                key={related.slug}
                href={routes.productFamily(related.slug)}
                className="group bg-canvas hover:bg-accent-light grid min-h-64 content-between p-6"
              >
                <span className="type-series text-accent">
                  {related.series.length} series
                </span>
                <div>
                  <h3 className="type-h2">{related.name}</h3>
                  <ArrowRight
                    aria-hidden
                    className="mt-6 size-5 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Eyebrow className="text-emerald-300 md:col-span-3">
              Start a project
            </Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">
                Discuss {family.name.toLowerCase()} for your project.
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
    </main>
  );
}
