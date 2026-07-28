import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { PrimaryButton } from "@/components/ui/button";
import {
  Container,
  Eyebrow,
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
import { mediaAssets, productConceptMediaBySlug } from "@/content/media";
import {
  ImageReveal,
  MaskedHeading,
  ViewportReveal,
} from "@/components/motion";
import { sharedElementStyle } from "@/lib/motion/shared-elements";

type RelatedProduct = ReturnType<typeof getRelatedProducts>[number];

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
  const spaceEnvironmentMedia = getSpaceEnvironmentMedia(space.group);
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
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow className="text-emerald-300">What happens here</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <h2 className="type-h2 max-w-3xl">
                Room activity and planning focus
              </h2>
              <p className="type-body-lg mt-5 max-w-3xl text-white/65">
                {space.description}
              </p>
              <ul className="mt-7 grid gap-px border-y border-white/20 sm:grid-cols-2">
                {space.activities.map((activity, index) => (
                  <li
                    key={activity}
                    className="min-h-20 border-white/20 p-4 sm:odd:border-r"
                  >
                    <span className="type-model text-emerald-300">
                      0{index + 1}
                    </span>
                    <p className="type-body-sm mt-4 font-semibold text-white">
                      {activity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
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
                className="motion-card group bg-surface hover:bg-accent-light grid min-h-52 content-between p-5"
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
          <SpaceProductEnvironment
            spaceName={space.name}
            products={relatedProducts}
            image={spaceEnvironmentMedia}
          />
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
                className="bg-brand-950 min-h-52 p-5"
              >
                <span className="type-model text-emerald-300">
                  0{index + 1}
                </span>
                <h2 className="type-h3 mt-10">{configuration.name}</h2>
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
          <div className="border-line bg-line grid gap-px border-y lg:grid-cols-2">
            <div className="bg-surface px-5 py-8 sm:px-8 lg:py-10">
              <Eyebrow>Related sectors</Eyebrow>
              <h2 className="type-h3 mt-5 max-w-xl">
                Where this space is commonly used
              </h2>
              <p className="type-body-sm text-ink-muted mt-3 max-w-xl">
                Connect this room type to the sector environments where the same
                furniture, AV and service requirements often appear.
              </p>
              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {relatedSectors.map((sector) => (
                  <Link
                    key={sector.slug}
                    href={routes.sector(sector.slug)}
                    className="border-line bg-canvas hover:border-accent hover:bg-accent-light flex min-h-12 items-center border px-4 text-sm font-semibold"
                  >
                    {sector.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-surface px-5 py-8 sm:px-8 lg:py-10">
              <Eyebrow>Projects</Eyebrow>
              <h2 className="type-h3 mt-5 max-w-xl">
                Applications in practice
              </h2>
              <p className="type-body-sm text-ink-muted mt-3 max-w-xl">
                Review real project contexts or use Design Support to discuss a
                comparable application for this space.
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
                    Public case studies are being prepared. TEVORA can still
                    help compare this space with similar project requirements.
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
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Resources"
            title="Plan the space"
            description="Use a TEVORA-issued login to download planning documents, drawings and technical files for the space."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-4">
            {resources.map((resource) => (
              <Link
                key={resource}
                href={routes.resources}
                className="bg-canvas grid min-h-36 content-between p-5"
              >
                <Download aria-hidden className="text-accent size-4" />
                <div>
                  <h2 className="type-h5">{resource}</h2>
                  <p className="type-caption text-ink-muted mt-2">
                    TEVORA login required
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

const environmentCalloutPositions = [
  "left-[18%] top-[38%]",
  "left-[46%] top-[48%]",
  "left-[72%] top-[35%]",
  "left-[62%] top-[68%]",
  "left-[31%] top-[66%]",
  "left-[83%] top-[58%]",
];

function getSpaceEnvironmentMedia(group: string) {
  if (group === "Education Spaces")
    return mediaAssets.educationSpaceEnvironment;
  if (group === "Corporate Spaces")
    return mediaAssets.corporateSpaceEnvironment;
  if (group === "Specialist Spaces")
    return mediaAssets.specialistSpaceEnvironment;
  return mediaAssets.publicSelfServiceSpaceEnvironment;
}

function SpaceProductEnvironment({
  spaceName,
  products,
  image,
}: {
  spaceName: string;
  products: RelatedProduct[];
  image: typeof mediaAssets.homepageHero;
}) {
  const visibleProducts = products.slice(0, environmentCalloutPositions.length);

  return (
    <div className="border-line border-t pt-5">
      <div className="grid gap-5 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow>Products in this space</Eyebrow>
        </div>
        <div className="md:col-span-7">
          <h2 className="type-section text-balance">
            A room-led product plan for {spaceName.toLowerCase()}
          </h2>
          <p className="type-body-lg text-ink-muted mt-5 max-w-2xl">
            See the space first, then review the TEVORA product series that
            usually support the room activity, equipment and service access.
          </p>
        </div>
      </div>
      <div className="bg-line border-line mt-8 grid gap-px border lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)]">
        <ImageReveal className="relative aspect-[16/10] overflow-hidden bg-white">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width:1024px) 63vw, 100vw"
            className="object-cover"
          />
          <div className="from-brand-950/80 via-brand-950/30 absolute inset-x-0 bottom-0 bg-linear-to-t to-transparent p-5 text-white">
            <p className="type-series text-emerald-300">Application view</p>
            <p className="type-body-sm mt-2 max-w-lg text-white/75">
              Numbered callouts connect typical product positions with the
              specification schedule.
            </p>
          </div>
          <div className="absolute inset-0 hidden sm:block">
            {visibleProducts.map((product, index) => (
              <Link
                key={product.slug}
                href={routes.product(product.slug)}
                className={`absolute ${environmentCalloutPositions[index]} group focus-visible:outline-accent text-brand-950 ring-brand-950/20 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white text-sm font-bold shadow-[0_14px_35px_rgba(0,0,0,.22)] ring-4 transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2`}
                aria-label={`${index + 1}. ${product.name}`}
              >
                {index + 1}
                <span className="text-ink border-line pointer-events-none absolute top-12 left-1/2 hidden w-48 -translate-x-1/2 border bg-white px-3 py-2 text-left text-xs font-semibold shadow-xl group-hover:block group-focus-visible:block">
                  {product.name}
                </span>
              </Link>
            ))}
          </div>
        </ImageReveal>
        <aside className="bg-surface">
          <div className="border-line border-b p-5">
            <Eyebrow>Specification schedule</Eyebrow>
            <h3 className="type-h3 mt-5">Products to discuss first</h3>
            <p className="type-body-sm text-ink-muted mt-3">
              These are planning recommendations. Final selection depends on
              room size, user workflow, AV equipment, mounting and service
              access.
            </p>
          </div>
          <ol>
            {visibleProducts.map((product, index) => {
              const family = productFamilies.find(
                (item) => item.id === product.productFamily,
              );

              return (
                <li key={product.slug} className="border-line border-b">
                  <Link
                    href={routes.product(product.slug)}
                    className="motion-card group hover:bg-accent-light grid grid-cols-[2.75rem_1fr] gap-4 p-5"
                  >
                    <span className="bg-brand-950 flex size-9 items-center justify-center rounded-full text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span>
                      <span className="type-series text-accent">
                        {family?.name ?? product.series}
                      </span>
                      <span className="type-h5 mt-2 block">{product.name}</span>
                      <span className="type-body-sm text-ink-muted mt-2 block">
                        {product.summary}
                      </span>
                      <span className="motion-link mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                        View product
                        <ArrowRight
                          aria-hidden
                          className="motion-arrow size-4"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </div>
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
