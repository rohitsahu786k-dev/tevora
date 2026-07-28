import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ProductCard } from "@/components/products/product-card";
import { PrimaryButton } from "@/components/ui/button";
import {
  Container,
  EmptyState,
  Eyebrow,
  ResponsiveGrid,
  Section,
  SectionHeader,
} from "@/components/ui/system";
import {
  accessories,
  productFamilies,
  publishedProjects,
  spaces,
} from "@/content";
import {
  productToAccessories,
  projectRelationships,
  spaceToProductFamilies,
} from "@/content/relationships";
import {
  getRelatedProducts,
  getRelatedSectors,
} from "@/lib/content/relationships";
import { getContentBreadcrumbs } from "@/lib/navigation/content-navigation";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
import { productConceptMediaBySlug } from "@/content/media";
import {
  ImageReveal,
  MaskedHeading,
  ViewportReveal,
} from "@/components/motion";
import { sharedElementStyle } from "@/lib/motion/shared-elements";

const resources = [
  "Space planning guide",
  "Product-family overview",
  "CAD and BIM resources",
  "Technology furniture checklist",
];
export function generateStaticParams() {
  return spaces.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const space = spaces.find((item) => item.slug === slug);
  return space
    ? createPageMetadata({
        title: space.seo.title,
        description: space.seo.description,
        path: routes.space(space.slug),
        noIndex: space.dataStatus !== "verified",
      })
    : {};
}
export default async function SpacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const space = spaces.find((item) => item.slug === slug);
  if (!space) notFound();
  const relatedProducts = getRelatedProducts({ space: slug }).slice(0, 6);
  const heroMedia = relatedProducts
    .map((product) => productConceptMediaBySlug[product.slug])
    .find((media) => media?.kind === "image");
  const relatedSectors = relatedProducts
    .flatMap((product) => getRelatedSectors(product.slug))
    .filter(
      (sector, index, all) =>
        all.findIndex((item) => item.slug === sector.slug) === index,
    );
  const recommendedFamilies = (spaceToProductFamilies[slug] ?? [])
    .map((familySlug) =>
      productFamilies.find((family) => family.slug === familySlug),
    )
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const accessorySlugs = [
    ...new Set(
      relatedProducts.flatMap(
        (product) => productToAccessories[product.slug] ?? [],
      ),
    ),
  ];
  const recommendedAccessories = accessorySlugs
    .map((accessorySlug) =>
      accessories.find((accessory) => accessory.slug === accessorySlug),
    )
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 8);
  const relatedProjects = publishedProjects.filter((project) =>
    projectRelationships[project.slug]?.spaces.includes(slug),
  );
  const configurations = [
    {
      name: "Presentation-led",
      copy: "A presenter position, shared display and supporting equipment categories organised for the room.",
    },
    {
      name: "Collaboration-led",
      copy: "Furniture and shared technology arranged around in-room and remote participation.",
    },
    {
      name: "Flexible deployment",
      copy: "Mobile or adaptable product formats considered for spaces that change between activities.",
    },
  ];
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-surface">
        <Container className="py-12 md:py-20">
          <Breadcrumbs items={getContentBreadcrumbs("space", slug)} />
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <ViewportReveal className="flex flex-col justify-end lg:col-span-5">
              <Eyebrow>{space.group}</Eyebrow>
              <MaskedHeading as="h1" className="type-h1 mt-7">
                {space.name}
              </MaskedHeading>
              <p className="type-body-lg text-ink-muted mt-6">
                {space.summary}
              </p>
              <PrimaryButton asChild className="mt-9 self-start">
                <Link href={routes.contact}>
                  Discuss Your Project{" "}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </PrimaryButton>
            </ViewportReveal>
            <ImageReveal
              priority
              className="relative aspect-[4/3] bg-white lg:col-span-7"
            >
              <div
                className="absolute inset-0"
                style={sharedElementStyle("space", space.slug)}
              >
                <Image
                  src={
                    heroMedia?.kind === "image"
                      ? heroMedia.src
                      : "/media/home/technology-learning-hero.png"
                  }
                  alt={
                    heroMedia?.kind === "image"
                      ? heroMedia.alt
                      : `Technology-enabled ${space.name.toLowerCase()} environment`
                  }
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
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow className="text-emerald-300">What happens here</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="type-section">{space.description}</h2>
              <ul className="mt-10 grid gap-px border-y border-white/20 sm:grid-cols-2">
                {space.activities.map((activity, index) => (
                  <li
                    key={activity}
                    className="min-h-28 border-white/20 p-4 sm:odd:border-r"
                  >
                    <span className="type-model text-emerald-300">
                      0{index + 1}
                    </span>
                    <p className="type-h5 mt-7">{activity}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-3">
            <EditorialList
              eyebrow="Primary users"
              title="People in the space"
              items={space.primaryUsers}
            />
            <EditorialList
              eyebrow="Technology requirements"
              title="Technology categories"
              items={space.technologyRequirements}
            />
            <EditorialList
              eyebrow="Design priorities"
              title="What the design must consider"
              items={space.designPriorities}
            />
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Recommended product families"
            title="Product families that fit this space"
            description="Start with the room activity, then compare the furniture families most likely to support the users, equipment and layout."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {recommendedFamilies.map((family) => (
              <Link
                key={family.slug}
                href={routes.productFamily(family.slug)}
                className="motion-card group bg-surface hover:bg-accent-light grid min-h-64 content-between p-6"
              >
                <span className="type-series text-accent">
                  {family.series.length} series
                </span>
                <div>
                  <h2 className="type-h2">{family.name}</h2>
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
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Recommended products"
            title={`Product series for ${space.name}`}
            description="Use these series as a shortlist for discussion. Final dimensions, equipment fit and accessories are confirmed with the project team."
          />
          <ResponsiveGrid columns={3}>
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.slug}
                entry={product}
                href={routes.product(product.slug)}
              />
            ))}
          </ResponsiveGrid>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Example configurations"
            title="Three ways to begin planning"
            description="Choose the planning direction that best matches how the room will be used, then refine the equipment and furniture details."
          />
          <div className="grid gap-px bg-white/20 md:grid-cols-3">
            {configurations.map((configuration, index) => (
              <article
                key={configuration.name}
                className="bg-brand-950 min-h-64 p-6"
              >
                <span className="type-model text-emerald-300">
                  0{index + 1}
                </span>
                <h2 className="type-h3 mt-16">{configuration.name}</h2>
                <p className="type-body-sm mt-4 text-white/55">
                  {configuration.copy}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Recommended accessories"
            title="Extend the selected product"
            description="Plan the supporting details early: mounting, power, connectivity, cable routing, mobility, access and security."
          />
          <div className="flex flex-wrap gap-2">
            {recommendedAccessories.map((accessory) => (
              <Link
                key={accessory.slug}
                href={routes.accessory(accessory.slug)}
                className="border-line bg-surface hover:border-accent min-h-11 border px-4 py-3 text-sm font-semibold"
              >
                {accessory.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Related sectors"
                title="Where this space appears"
              />
              <div className="flex flex-wrap gap-2">
                {relatedSectors.map((sector) => (
                  <Link
                    key={sector.slug}
                    href={routes.sector(sector.slug)}
                    className="border-line hover:border-accent min-h-11 border px-4 py-3 text-sm font-semibold"
                  >
                    {sector.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <SectionHeader
                eyebrow="Projects"
                title="Applications in practice"
              />
              {relatedProjects.length ? (
                <div>
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={routes.project(project.slug)}
                      className="border-line block border-y py-5"
                    >
                      <h3 className="type-h4">{project.projectName}</h3>
                      <p className="type-caption text-ink-muted mt-2">
                        Approved project application
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Project examples are coming"
                  description="Speak with TEVORA about similar applications while public case studies are being prepared."
                />
              )}
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader eyebrow="Resources" title="Plan the space" />
          <div className="border-line bg-line grid gap-px border md:grid-cols-4">
            {resources.map((resource) => (
              <Link
                key={resource}
                href={routes.resources}
                className="bg-canvas grid min-h-44 content-between p-5"
              >
                <Download aria-hidden className="text-accent size-4" />
                <div>
                  <h2 className="type-h5">{resource}</h2>
                  <p className="type-caption text-ink-muted mt-2">
                    Available on request
                  </p>
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
              Project support
            </Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">
                Create the right technology-furniture approach for this space.
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
function EditorialList({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="type-h3 mt-5">{title}</h2>
      <ol className="border-line mt-8 border-t">
        {items.map((item, index) => (
          <li
            key={item}
            className="border-line grid min-h-16 grid-cols-[3rem_1fr] items-center border-b"
          >
            <span className="type-model text-ink-muted">0{index + 1}</span>
            <span className="type-body-sm font-semibold">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
