import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ProductCard } from "@/components/products/product-card";
import { PrimaryButton } from "@/components/ui/button";
import {
  Container,
  EmptyState,
  Eyebrow,
  MediaFrame,
  ResponsiveGrid,
  Section,
  SectionHeader,
} from "@/components/ui/system";
import {
  accessories,
  products,
  publishedProjects,
  sectors,
  spaces,
} from "@/content";
import { routes } from "@/lib/routes";
import { ProjectJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = publishedProjects.find((item) => item.slug === slug);
  return project
    ? createPageMetadata({
        title: project.seo.title,
        description: project.seo.description,
        path: routes.project(project.slug),
        type: "article",
        noIndex: project.dataStatus !== "verified",
      })
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = publishedProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  const sector = sectors.find((item) => item.id === project.sector);
  const projectSpaces = spaces.filter((item) =>
    project.spaces.includes(item.id),
  );
  const usedProducts = products.filter((item) =>
    project.productsUsed.includes(item.id),
  );
  const usedAccessories = accessories.filter((item) =>
    project.accessoriesUsed.includes(item.id),
  );
  const relatedProjects = publishedProjects.filter(
    (item) =>
      item.slug !== slug &&
      (item.sector === project.sector ||
        item.spaces.some((space) => project.spaces.includes(space))),
  );
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <ProjectJsonLd project={project} sectorName={sector?.name} />
      <section className="bg-surface">
        <Container className="py-12 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Projects", href: routes.projects },
              { label: project.projectName },
            ]}
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-end lg:col-span-5">
              <Eyebrow>{sector?.name ?? "Project"}</Eyebrow>
              <h1 className="type-h1 mt-7">{project.projectName}</h1>
              <p className="type-body-lg text-ink-muted mt-6">
                {project.summary}
              </p>
              <dl className="border-line mt-8 grid grid-cols-2 gap-6 border-t pt-6">
                <Meta label="Location" value={project.location} />
                <Meta label="Project type" value={project.projectType} />
                <Meta
                  label="Space"
                  value={projectSpaces.map((item) => item.name).join(", ")}
                />
                <Meta label="Status" value="Placeholder record" />
              </dl>
            </div>
            <MediaFrame className="grid place-items-center lg:col-span-7">
              <span className="type-model text-ink-muted">
                PROJECT HERO — PLACEHOLDER
              </span>
            </MediaFrame>
          </div>
        </Container>
      </section>
      <Section tone="dark">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Eyebrow className="text-emerald-300 md:col-span-3">
              Project overview
            </Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">{project.summary}</h2>
              <p className="type-body mt-7 text-white/60">
                This placeholder record contains no client identity, endorsement
                or performance claim.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-14 md:grid-cols-2">
            <Story
              eyebrow="Client challenge"
              title="The project requirement"
              copy={project.challenge}
            />
            <Story
              eyebrow="Design approach"
              title="The response"
              copy={project.approach}
            />
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Technology requirements"
            title="Technology considered in the brief"
          />
          {project.technologyRequirements.length ? (
            <EditorialList items={project.technologyRequirements} />
          ) : (
            <EmptyState
              title="Requirements not yet published"
              description="Verified technology requirements will be added when approved project information is available."
            />
          )}
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Products used"
            title="Technology-furniture platforms"
          />
          {usedProducts.length ? (
            <ResponsiveGrid columns={3}>
              {usedProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  entry={product}
                  href={routes.product(product.slug)}
                />
              ))}
            </ResponsiveGrid>
          ) : (
            <EmptyState
              title="Products not yet published"
              description="Verified product selections will appear here."
            />
          )}
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Accessories and integrations"
                title="Supporting components"
              />
              {usedAccessories.length ? (
                <EditorialList
                  items={usedAccessories.map((item) => item.name)}
                />
              ) : (
                <EmptyState
                  title="No verified integrations published"
                  description="Accessory and integration details require project approval."
                />
              )}
            </div>
            <div>
              <SectionHeader
                eyebrow="Technical highlights"
                title="Verified project detail"
              />
              <EmptyState
                title="Technical highlights pending"
                description="Dimensions, equipment details, compatibility and performance information have not been published for this placeholder project."
              />
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader eyebrow="Gallery" title="Project imagery" />
          {project.gallery.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((media, index) => (
                <MediaFrame
                  key={`${media.type}-${index}`}
                  className="grid place-items-center"
                >
                  <span className="type-model text-ink-muted">
                    {media.type} MEDIA
                  </span>
                </MediaFrame>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No approved project imagery"
              description="Gallery content will appear only after image rights and project approval are confirmed."
            />
          )}
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Outcomes"
                title="Published project outcomes"
              />
              {project.outcomes.length ? (
                <EditorialList items={project.outcomes} />
              ) : (
                <EmptyState
                  title="No outcomes claimed"
                  description="Outcomes will not be shown until they are verified and approved for publication."
                />
              )}
            </div>
            <div>
              <SectionHeader
                eyebrow="Testimonial"
                title="The client perspective"
              />
              {project.testimonial ? (
                <blockquote className="border-accent border-l-2 pl-6">
                  <p className="type-h4">{project.testimonial.quote}</p>
                  <footer className="type-caption text-ink-muted mt-5">
                    {project.testimonial.attribution}
                  </footer>
                </blockquote>
              ) : (
                <EmptyState
                  title="No testimonial published"
                  description="No client quotation has been supplied or approved."
                />
              )}
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Related spaces"
            title="Explore the application context"
          />
          <div className="flex flex-wrap gap-2">
            {projectSpaces.map((space) => (
              <Link
                key={space.slug}
                href={routes.space(space.slug)}
                className="border-line hover:border-accent min-h-11 border px-4 py-3 text-sm font-semibold"
              >
                {space.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow="Related projects" title="More applications" />
          {relatedProjects.length ? (
            <div className="border-line bg-line grid gap-px border md:grid-cols-3">
              {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={routes.project(item.slug)}
                  className="bg-surface grid min-h-52 content-between p-6"
                >
                  <span className="type-series text-accent">Project</span>
                  <div>
                    <h2 className="type-h3">{item.projectName}</h2>
                    <ArrowRight aria-hidden className="mt-5 size-4" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No related projects published"
              description="Additional approved project records will appear here."
            />
          )}
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
                Let’s create the right platform for your technology.
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
function Meta({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <dt className="type-spec-label">{label}</dt>
      <dd className="type-caption text-ink-muted mt-2">
        {value || "Not published"}
      </dd>
    </div>
  );
}
function Story({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <article>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="type-h2 mt-5">{title}</h2>
      <p className="type-body-lg text-ink-muted mt-6">{copy}</p>
    </article>
  );
}
function EditorialList({ items }: { items: string[] }) {
  return (
    <ol className="border-line border-t">
      {items.map((item, index) => (
        <li
          key={item}
          className="border-line grid min-h-20 grid-cols-[3rem_1fr] items-center border-b"
        >
          <span className="type-model text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="type-body-sm font-semibold">{item}</span>
        </li>
      ))}
    </ol>
  );
}
