import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
import { productFamilies, publishedProjects, sectors } from "@/content";
import {
  projectRelationships,
  spaceToProductFamilies,
} from "@/content/relationships";
import {
  getRelatedProducts,
  getRelatedSpaces,
} from "@/lib/content/relationships";
import { getContentBreadcrumbs } from "@/lib/navigation/content-navigation";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

const integrationConsiderations = [
  "Room layout and furniture coordination",
  "Display, camera and audio positions",
  "Power, data and cable pathways",
  "Equipment access and ventilation planning",
  "User interaction and service access",
];

const resourceTypes = [
  "Sector planning guide",
  "Product-family overview",
  "CAD and BIM resources",
  "Technology furniture checklist",
];

export function generateStaticParams() {
  return sectors.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((item) => item.slug === slug);
  return sector
    ? createPageMetadata({
        title: sector.seo.title,
        description: sector.seo.description,
        path: routes.sector(sector.slug),
        noIndex: sector.dataStatus !== "verified",
      })
    : {};
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((item) => item.slug === slug);
  if (!sector) notFound();

  const typicalSpaces = getRelatedSpaces({ sector: slug });
  const familySlugs = [
    ...new Set(
      typicalSpaces.flatMap(
        (space) => spaceToProductFamilies[space.slug] ?? [],
      ),
    ),
  ];
  const recommendedFamilies = familySlugs
    .map((familySlug) =>
      productFamilies.find((family) => family.slug === familySlug),
    )
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const recommendedProducts = getRelatedProducts({ sector: slug }).slice(0, 6);
  const relatedProjects = publishedProjects.filter(
    (project) => projectRelationships[project.slug]?.sector === slug,
  );

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-surface">
        <Container className="py-12 md:py-20">
          <Breadcrumbs items={getContentBreadcrumbs("sector", slug)} />
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-end lg:col-span-5">
              <Eyebrow>Sector</Eyebrow>
              <h1 className="type-h1 mt-7">{sector.name}</h1>
              <p className="type-body-lg text-ink-muted mt-6">
                {sector.summary}
              </p>
              <PrimaryButton asChild className="mt-9 self-start">
                <Link href={routes.contact}>
                  Discuss Your Project
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </PrimaryButton>
            </div>
            <div className="bg-surface-muted relative aspect-[4/3] overflow-hidden lg:col-span-7">
              <Image
                src="/media/home/technology-learning-hero.png"
                alt={`Representative technology-enabled environment for ${sector.name}`}
                fill
                priority
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="dark">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Eyebrow className="text-emerald-300 md:col-span-3">
              Sector overview
            </Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">{sector.description}</h2>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Common challenges"
            title="What project teams need to resolve"
            description="Planning themes are editorial starting points and must be assessed for each project."
          />
          <ol className="border-line grid border-y md:grid-cols-2">
            {sector.challenges.map((challenge, index) => (
              <li
                key={challenge}
                className="border-line grid min-h-36 grid-cols-[3rem_1fr] gap-4 border-b p-5 md:odd:border-r"
              >
                <span className="type-model text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="type-h5">{challenge}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Typical spaces"
            title={`Explore ${sector.name} environments`}
            description="Move from sector context into room-level requirements and product recommendations."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {typicalSpaces.map((space, index) => (
              <Link
                key={space.slug}
                href={routes.space(space.slug)}
                className="group bg-surface hover:bg-accent-light grid min-h-56 content-between p-6"
              >
                <span className="type-model text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="type-h3">{space.name}</h2>
                  <p className="type-body-sm text-ink-muted mt-3">
                    {space.summary}
                  </p>
                  <ArrowRight
                    aria-hidden
                    className="mt-6 size-4 transition-transform group-hover:translate-x-1"
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
            eyebrow="Recommended product families"
            title="Product architecture for the sector"
            description="Recommendations follow the mapped space taxonomy and require project-level verification."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {recommendedFamilies.map((family) => (
              <Link
                key={family.slug}
                href={routes.productFamily(family.slug)}
                className="group bg-canvas hover:bg-accent-light grid min-h-56 content-between p-6"
              >
                <span className="type-series text-accent">
                  {family.series.length} series
                </span>
                <div>
                  <h2 className="type-h3">{family.name}</h2>
                  <ArrowRight
                    aria-hidden
                    className="mt-6 size-4 transition-transform group-hover:translate-x-1"
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
            eyebrow="Recommended products"
            title={`Product series for ${sector.name}`}
            description="Initial recommendations support discovery, not final suitability or compatibility."
          />
          <ResponsiveGrid columns={3}>
            {recommendedProducts.map((product) => (
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
            eyebrow="Integration considerations"
            title="Coordinate furniture and technology early"
            description="A concise planning framework for integrators, consultants, architects and client teams."
          />
          <ol className="grid gap-px bg-white/20 md:grid-cols-5">
            {integrationConsiderations.map((item, index) => (
              <li key={item} className="bg-brand-950 min-h-52 p-5">
                <span className="type-model text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="type-h5 mt-16">{item}</p>
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
                  title="No verified projects published"
                  description="Project examples will appear when client approval and project content are available."
                />
              )}
            </div>
            <div>
              <SectionHeader
                eyebrow="Resources"
                title="Plan with project teams"
              />
              <div className="border-line bg-line grid gap-px border sm:grid-cols-2">
                {resourceTypes.map((resource) => (
                  <Link
                    key={resource}
                    href={routes.resources}
                    className="bg-canvas grid min-h-40 content-between p-5"
                  >
                    <Download aria-hidden className="text-accent size-4" />
                    <div>
                      <h3 className="type-h5">{resource}</h3>
                      <p className="type-caption text-ink-muted mt-2">
                        Available when published
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
                Create the right technology-furniture approach for your project.
              </h2>
              <PrimaryButton
                asChild
                className="text-brand-950! hover:border-accent hover:bg-accent! mt-9 border-white bg-white! hover:text-white!"
              >
                <Link href={routes.contact}>
                  Discuss Your Project
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
