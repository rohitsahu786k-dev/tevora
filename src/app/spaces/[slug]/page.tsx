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
import { mediaAssets } from "@/content/media";

type RelatedProduct = ReturnType<typeof getRelatedProducts>[number];
type SpaceEnvironmentImage = Pick<
  typeof mediaAssets.homepageHero,
  "src" | "alt"
>;

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
  const spaceEnvironmentMedia = getSpaceEnvironmentMedia(space);
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
      <section className="bg-brand-950 relative min-h-[72svh] overflow-hidden text-white md:min-h-[76svh]">
        <Image
          src={spaceEnvironmentMedia.src}
          alt={spaceEnvironmentMedia.alt}
          fill
          priority
          quality={78}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,22,19,.9)_0%,rgba(10,22,19,.68)_42%,rgba(10,22,19,.12)_82%)]" />
        <Container className="relative flex min-h-[72svh] flex-col pt-28 pb-12 md:min-h-[76svh] md:pb-16">
          <div className="[&_a:hover]:text-white [&_ol]:text-white/65 [&_span]:text-white">
            <Breadcrumbs items={getContentBreadcrumbs("space", slug)} />
          </div>
          <div className="mt-auto max-w-3xl pt-16">
            <Eyebrow className="text-emerald-300">{space.group}</Eyebrow>
            <h1 className="type-h1 mt-7 text-balance">{space.name}</h1>
            <p className="type-body-lg mt-6 max-w-2xl text-white/75">
              {space.summary}
            </p>
            <PrimaryButton
              asChild
              className="text-brand-950! hover:border-accent hover:bg-accent! mt-9 self-start border-white bg-white! hover:text-white!"
            >
              <Link href={routes.contact}>
                Discuss Your Project{" "}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </PrimaryButton>
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

const environmentPopoverPositions = [
  "bottom-9 left-0",
  "bottom-9 left-1/2 -translate-x-1/2",
  "right-0 bottom-9",
  "bottom-9 left-1/2 -translate-x-1/2",
  "bottom-9 left-1/2 -translate-x-1/2",
  "right-0 bottom-9",
];

function getSpaceEnvironmentMedia(space: (typeof spaces)[number]) {
  return {
    src: `/media/spaces/generated/${space.slug}.png`,
    alt: `${space.name} environment with recommended TEVORA technology furniture products integrated into the room`,
  };
}

function SpaceProductEnvironment({
  spaceName,
  products,
  image,
}: {
  spaceName: string;
  products: RelatedProduct[];
  image: SpaceEnvironmentImage;
}) {
  const visibleProducts = products.slice(0, environmentCalloutPositions.length);

  return (
    <div className="space-product-plan border-line border-t pt-5">
      <style>
        {`
          .space-product-plan [data-marker-pulse] {
            opacity: 0;
            transform: scale(.8);
          }
          .space-product-plan [data-marker-core] {
            transition:
              background-color .18s ease,
              box-shadow .18s ease,
              transform .18s ease;
          }
          .space-product-plan [data-marker]:hover [data-marker-pulse],
          .space-product-plan [data-marker][open] [data-marker-pulse],
          .space-product-plan:has([data-product-trigger="0"]:hover) [data-marker="0"] [data-marker-pulse],
          .space-product-plan:has([data-product-trigger="1"]:hover) [data-marker="1"] [data-marker-pulse],
          .space-product-plan:has([data-product-trigger="2"]:hover) [data-marker="2"] [data-marker-pulse],
          .space-product-plan:has([data-product-trigger="3"]:hover) [data-marker="3"] [data-marker-pulse],
          .space-product-plan:has([data-product-trigger="4"]:hover) [data-marker="4"] [data-marker-pulse],
          .space-product-plan:has([data-product-trigger="5"]:hover) [data-marker="5"] [data-marker-pulse] {
            animation: tevora-marker-ping 1.15s cubic-bezier(0, 0, .2, 1) infinite;
            opacity: 1;
          }
          .space-product-plan [data-marker]:hover [data-marker-core],
          .space-product-plan [data-marker][open] [data-marker-core],
          .space-product-plan:has([data-product-trigger="0"]:hover) [data-marker="0"] [data-marker-core],
          .space-product-plan:has([data-product-trigger="1"]:hover) [data-marker="1"] [data-marker-core],
          .space-product-plan:has([data-product-trigger="2"]:hover) [data-marker="2"] [data-marker-core],
          .space-product-plan:has([data-product-trigger="3"]:hover) [data-marker="3"] [data-marker-core],
          .space-product-plan:has([data-product-trigger="4"]:hover) [data-marker="4"] [data-marker-core],
          .space-product-plan:has([data-product-trigger="5"]:hover) [data-marker="5"] [data-marker-core] {
            background: var(--color-accent);
            box-shadow:
              0 0 0 6px rgba(67, 176, 151, .24),
              0 0 28px rgba(67, 176, 151, .52);
            transform: scale(1.45);
          }
          @keyframes tevora-marker-ping {
            0% {
              opacity: .85;
              transform: scale(.85);
            }
            80%, 100% {
              opacity: 0;
              transform: scale(3.15);
            }
          }
        `}
      </style>
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
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)]">
        <div className="relative aspect-[16/10] overflow-visible">
          <div className="border-line absolute inset-0 overflow-hidden border bg-white">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width:1024px) 63vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 hidden sm:block">
            {visibleProducts.map((product, index) => (
              <details
                key={product.slug}
                data-marker={index}
                className={`group absolute ${environmentCalloutPositions[index]} -translate-x-1/2 -translate-y-1/2`}
              >
                <summary
                  className="focus-visible:outline-accent ring-brand-950/15 relative flex size-7 cursor-pointer list-none items-center justify-center rounded-full border border-white/80 bg-white/55 shadow-[0_10px_30px_rgba(0,0,0,.22)] ring-4 backdrop-blur-sm transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden"
                  aria-label={`Show ${product.name} details`}
                >
                  <span
                    data-marker-pulse
                    className="bg-accent/60 absolute inset-0 rounded-full"
                  />
                  <span
                    data-marker-core
                    className="bg-brand-950/80 relative size-2 rounded-full"
                  />
                </summary>
                <div
                  className={`glass-panel ring-brand-950/10 absolute z-10 w-72 max-w-[min(18rem,82vw)] rounded-2xl p-4 text-left ring-1 ${environmentPopoverPositions[index]}`}
                >
                  <p className="type-series text-accent">0{index + 1}</p>
                  <h3 className="type-h5 mt-2">{product.name}</h3>
                  <p className="type-body-sm text-ink-muted mt-2">
                    {product.summary}
                  </p>
                  <Link
                    href={routes.product(product.slug)}
                    className="motion-link mt-4 inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    View product
                    <ArrowRight aria-hidden className="motion-arrow size-4" />
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
        <aside className="border-line bg-surface flex h-full flex-col border">
          <div className="border-line border-b p-4">
            <Eyebrow>Specification schedule</Eyebrow>
            <h3 className="type-h5 mt-3">Recommended products</h3>
            <p className="type-caption text-ink-muted mt-2">
              Click a room marker for context, or open a product directly.
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
                    data-product-trigger={index}
                    className="motion-card group hover:bg-accent-light grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5"
                  >
                    <span>
                      <span className="type-series text-accent">
                        {family?.name ?? product.series}
                      </span>
                      <span className="mt-1 block text-sm font-semibold">
                        {product.name}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="motion-arrow text-ink-muted size-4"
                    />
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
