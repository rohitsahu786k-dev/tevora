import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, Download } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import {
  Badge,
  Container,
  EmptyState,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui/system";
import { accessories, productFamilies, products } from "@/content";
import { compatibilityProfileByAccessoryId } from "@/content/compatibility";
import { accessoryConceptMediaBySlug } from "@/content/media";
import { compatibilityStatusLabel } from "@/lib/compatibility/engine";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
const resourceTypes = [
  "Accessory data sheet",
  "Installation guide",
  "CAD",
  "BIM",
  "Care information",
];
export function generateStaticParams() {
  return accessories.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const accessory = accessories.find((item) => item.slug === slug);
  return accessory
    ? createPageMetadata({
        title: accessory.seo.title,
        description: accessory.seo.description,
        path: routes.accessory(accessory.slug),
        noIndex: accessory.dataStatus !== "verified",
      })
    : {};
}
export default async function AccessoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const accessory = accessories.find((item) => item.slug === slug);
  if (!accessory) notFound();
  const profile = compatibilityProfileByAccessoryId[accessory.id];
  if (!profile) notFound();
  const compatibleProducts = profile.compatibleProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const compatibleFamilies = profile.compatibleProductFamilyIds
    .map((id) => productFamilies.find((family) => family.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const conceptMedia = accessoryConceptMediaBySlug[accessory.slug];
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Accessories", href: "/accessories" },
              { label: accessory.name },
            ]}
          />
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Accessory Group</Eyebrow>
              <h1 className="type-hero mt-7">{accessory.name}</h1>
              <p className="type-body-lg text-ink-muted mt-7">
                {accessory.description}
              </p>
              <div className="mt-8">
                <Badge
                  tone={
                    profile.status === "provisional" ? "warning" : "neutral"
                  }
                  icon={AlertTriangle}
                >
                  {compatibilityStatusLabel(profile.status)}
                </Badge>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton asChild>
                  <Link
                    href={
                      `${routes.configure}?accessory=${accessory.slug}` as never
                    }
                  >
                    Configure <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </PrimaryButton>
                <SecondaryButton asChild>
                  <Link href={routes.contact}>Technical Review</Link>
                </SecondaryButton>
              </div>
            </div>
            <figure className="bg-white lg:col-span-5 lg:col-start-8">
              {conceptMedia?.kind === "image" ? (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={conceptMedia.src}
                      alt={conceptMedia.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      placeholder={conceptMedia.blurDataURL ? "blur" : "empty"}
                      blurDataURL={conceptMedia.blurDataURL}
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="type-caption text-ink-muted border-line border-t p-4">
                    {conceptMedia.caption}
                  </figcaption>
                </>
              ) : (
                <div className="grid min-h-96 place-items-center">
                  <span className="type-model text-ink-muted">
                    ACCESSORY MEDIA PENDING
                  </span>
                </div>
              )}
            </figure>
          </div>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Compatibility status"
            title={compatibilityStatusLabel(profile.status)}
            description="This status describes the current evidence level, not verified product or model compatibility."
          />
          <div className="grid gap-px border border-white/20 bg-white/20 md:grid-cols-3">
            <StatusBlock
              label="Product relationship"
              value={`${compatibleProducts.length} provisional links`}
            />
            <StatusBlock
              label="Model-specific evidence"
              value={
                profile.modelSpecificRules.length
                  ? "Available"
                  : "Not published"
              }
            />
            <StatusBlock
              label="Technical review"
              value="Required before specification"
            />
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Compatible product families"
            title="Provisional family relationships"
            description="Family relationships support discovery. A product, model and equipment review is still required."
          />
          <div className="flex flex-wrap gap-2">
            {compatibleFamilies.map((family) => (
              <Link
                key={family.slug}
                href={routes.productFamily(family.slug)}
                className="border-line bg-surface hover:border-accent min-h-11 border px-4 py-3 text-sm font-semibold"
              >
                {family.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Compatible products"
            title="Products linked by taxonomy"
            description="These options are not published as technically verified compatibility."
          />
          {compatibleProducts.length ? (
            <div className="border-line bg-line grid gap-px border md:grid-cols-3">
              {compatibleProducts.slice(0, 18).map((product) => (
                <Link
                  key={product.slug}
                  href={routes.product(product.slug)}
                  className="group bg-surface hover:bg-accent-light grid min-h-48 content-between p-5"
                >
                  <span className="type-series text-accent">
                    {product.series}
                  </span>
                  <div>
                    <h2 className="type-h4">{product.name}</h2>
                    <span className="type-caption text-ink-muted mt-3 block">
                      Provisional — technical review required
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No product relationship published"
              description="Use Configure or contact the technical team to review this accessory group."
            />
          )}
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="type-h3">Installation requirements</h2>
              <p className="type-body text-ink-muted mt-5">
                Installation type and requirements are not yet published.
                Confirm the base product, equipment schedule and site
                conditions.
              </p>
            </div>
            <div>
              <h2 className="type-h3">Required components</h2>
              <dl className="border-line mt-5 border-t">
                <div className="border-line border-b py-4">
                  <dt className="type-spec-label text-ink-muted">
                    Base product
                  </dt>
                  <dd className="type-body-sm mt-2">Required</dd>
                </div>
                <div className="border-line border-b py-4">
                  <dt className="type-spec-label text-ink-muted">
                    Required accessories
                  </dt>
                  <dd className="type-body-sm mt-2">
                    {profile.requiredAccessoryIds.length
                      ? `${profile.requiredAccessoryIds.length} required`
                      : "None published"}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="type-h3">Compatibility notes</h2>
              <ul className="type-body-sm text-ink-muted mt-5 space-y-3">
                {profile.notes.map((note) => (
                  <li key={note} className="border-accent border-l-2 pl-4">
                    {note}
                  </li>
                ))}
              </ul>
              <p className="type-body-sm text-ink-muted mt-4">
                Excluded combinations:{" "}
                {profile.excludedAccessoryIds.length
                  ? `${profile.excludedAccessoryIds.length} published`
                  : "None published"}
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <section className="bg-surface py-16 md:py-24">
        <Container>
          <SectionHeader
            eyebrow="Compatibility evidence"
            title="Technical compatibility fields"
          />
          <div className="border-line bg-line grid gap-px border sm:grid-cols-2 lg:grid-cols-4">
            <Evidence
              label="Supported display range"
              value={
                profile.supportedDisplayRange ? "Published" : "Not published"
              }
            />
            <Evidence
              label="Supported device type"
              value={
                profile.supportedDeviceTypes.length
                  ? "Published"
                  : "Not published"
              }
            />
            <Evidence
              label="Supported VESA pattern"
              value={
                profile.supportedVesaPatterns.length
                  ? "Published"
                  : "Not published"
              }
            />
            <Evidence
              label="Installation type"
              value={
                profile.installationTypes.length ? "Published" : "Not published"
              }
            />
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Technical resources"
            title="Files for installation and specification"
            description="Resources remain unavailable until each document and revision is verified."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-5">
            {resourceTypes.map((resource) => (
              <div
                key={resource}
                className="bg-canvas grid min-h-40 content-between p-5"
              >
                <Download aria-hidden className="text-accent size-4" />
                <div>
                  <h2 className="type-h5">{resource}</h2>
                  <p className="type-caption text-ink-muted mt-2">
                    Not yet published
                  </p>
                </div>
              </div>
            ))}
          </div>
          <PrimaryButton asChild className="mt-10">
            <Link
              href={`${routes.configure}?accessory=${accessory.slug}` as never}
            >
              Check in Configure <ArrowRight aria-hidden className="size-4" />
            </Link>
          </PrimaryButton>
        </Container>
      </Section>
    </main>
  );
}
function StatusBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-brand-950 min-h-44 p-5">
      <p className="type-spec-label text-emerald-300">{label}</p>
      <p className="type-h4 mt-14">{value}</p>
    </div>
  );
}
function Evidence({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface min-h-36 p-5">
      <p className="type-spec-label text-ink-muted">{label}</p>
      <p className="type-h5 mt-10">{value}</p>
    </div>
  );
}
