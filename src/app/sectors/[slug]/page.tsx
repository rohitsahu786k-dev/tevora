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
import { sectorHeroMediaBySlug } from "@/content/media";

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
  const heroMedia = sectorHeroMediaBySlug[slug];
  const relatedProjects = publishedProjects.filter(
    (project) => projectRelationships[project.slug]?.sector === slug,
  );

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 relative min-h-[72svh] overflow-hidden text-white md:min-h-[76svh]">
        <Image
          src={
            heroMedia?.kind === "image"
              ? heroMedia.src
              : "/media/home/technology-learning-hero.png"
          }
          alt={
            heroMedia?.kind === "image"
              ? heroMedia.alt
              : `Technology-enabled environment for ${sector.name}`
          }
          fill
          priority
          quality={78}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,22,19,.9)_0%,rgba(10,22,19,.68)_42%,rgba(10,22,19,.12)_82%)]" />
        <Container className="relative flex min-h-[72svh] flex-col pt-28 pb-12 md:min-h-[76svh] md:pb-16">
          <div className="[&_a:hover]:text-white [&_ol]:text-white/65 [&_span]:text-white">
            <Breadcrumbs items={getContentBreadcrumbs("sector", slug)} />
          </div>
          <div className="mt-auto max-w-3xl pt-16">
            <Eyebrow className="text-emerald-300">Sector</Eyebrow>
            <h1 className="type-h1 mt-7 text-balance">{sector.name}</h1>
            <p className="type-body-lg mt-6 max-w-2xl text-white/75">
              {sector.summary}
            </p>
            <PrimaryButton
              asChild
              className="text-brand-950! hover:border-accent hover:bg-accent! mt-9 self-start border-white bg-white! hover:text-white!"
            >
              <Link href={routes.contact}>
                Discuss Your Project
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </PrimaryButton>
          </div>
        </Container>
      </section>

      <Section tone="dark">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
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
            description="Use these themes to clarify the room, users, equipment and installation needs before selecting products."
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
                className="motion-card group bg-surface hover:bg-accent-light grid min-h-44 content-between p-5"
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
            title="Product families to consider"
            description="Compare the furniture families most relevant to the spaces and technology requirements in this sector."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {recommendedFamilies.map((family) => (
              <Link
                key={family.slug}
                href={routes.productFamily(family.slug)}
                className="motion-card group bg-canvas hover:bg-accent-light grid min-h-44 content-between p-5"
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
            description="Use these series as a starting point for the brief, then confirm fit against the room and device schedule."
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
            description="Bring these decisions forward so furniture, AV, power, data and service access are planned together."
          />
          <ol className="grid gap-px bg-white/20 md:grid-cols-5">
            {integrationConsiderations.map((item, index) => (
              <li key={item} className="bg-brand-950 min-h-40 p-5">
                <span className="type-model text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="type-h5 mt-10">{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="border-line bg-line grid gap-px border-y lg:grid-cols-2">
            <div className="bg-surface px-5 py-8 sm:px-8 lg:py-10">
              <Eyebrow>Projects</Eyebrow>
              <h2 className="type-h3 mt-5 max-w-xl">
                Applications in practice
              </h2>
              <p className="type-body-sm text-ink-muted mt-3 max-w-xl">
                Review project contexts for this sector or speak with TEVORA
                about a comparable application while public case studies are
                prepared.
              </p>
              {relatedProjects.length ? (
                <div className="mt-8">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={routes.project(project.slug)}
                      className="border-line group block border-t py-5 last:border-b"
                    >
                      <h3 className="type-h4">{project.projectName}</h3>
                      <p className="type-caption text-ink-muted mt-2">
                        Approved project application
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-canvas mt-8 p-6">
                  <h3 className="type-h4">Discuss a similar application</h3>
                  <p className="type-body-sm text-ink-muted mt-3 max-w-lg">
                    Public case studies are being prepared. TEVORA can help
                    compare this sector with similar project requirements.
                  </p>
                  <Link
                    href={routes.contact}
                    className="motion-link mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                  >
                    Speak with Design Support
                    <ArrowRight aria-hidden className="motion-arrow size-4" />
                  </Link>
                </div>
              )}
            </div>
            <div className="bg-surface px-5 py-8 sm:px-8 lg:py-10">
              <Eyebrow>Resources</Eyebrow>
              <h2 className="type-h3 mt-5 max-w-xl">Plan with project teams</h2>
              <p className="type-body-sm text-ink-muted mt-3 max-w-xl">
                Use these resource types to align furniture, technology and
                coordination requirements before specification.
              </p>
              <div className="border-line bg-line mt-8 grid gap-px border sm:grid-cols-2">
                {resourceTypes.map((resource) => (
                  <Link
                    key={resource}
                    href={routes.resources}
                    className="bg-canvas grid min-h-32 content-between p-5"
                  >
                    <Download aria-hidden className="text-accent size-4" />
                    <div>
                      <h3 className="type-h5">{resource}</h3>
                      <p className="type-caption text-ink-muted mt-2">
                        TEVORA login required
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
