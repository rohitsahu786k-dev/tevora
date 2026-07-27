import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui/system";
import { accessories } from "@/content";
import { accessoryToProducts } from "@/content/relationships";
import { accessoryConceptMediaBySlug } from "@/content/media";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata({
  title: "Accessories",
  description:
    "Mounting, power, connectivity, cable management and equipment-support accessories for TEVORA products.",
  path: routes.accessories,
});
export default function AccessoriesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section tone="dark">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Accessories" }]}
          />
          <Eyebrow className="mt-16 text-emerald-300">Accessories</Eyebrow>
          <h1 className="type-hero mt-7 max-w-5xl">
            Extend the product around the technology.
          </h1>
          <p className="type-body-lg mt-7 max-w-2xl text-white/65">
            Accessory groups organise mounting, equipment support, power,
            connectivity, mobility, security, accessibility and cooling
            requirements.
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Accessory categories"
            title="Twelve groups for configuration"
            description="Relationships shown here are provisional until product and model compatibility is technically verified."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2">
            {accessories.map((accessory, index) => (
              <Link
                key={accessory.slug}
                href={routes.accessory(accessory.slug)}
                className="group bg-canvas hover:bg-accent-light"
              >
                {(() => {
                  const media = accessoryConceptMediaBySlug[accessory.slug];
                  return media?.kind === "image" ? (
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
                      <span className="type-model text-graphite absolute right-3 bottom-3 bg-white/90 px-2 py-1">
                        CONCEPT IMAGE
                      </span>
                    </div>
                  ) : null;
                })()}
                <div className="grid min-h-72 content-between p-6 md:p-8">
                  <div className="flex justify-between gap-4">
                    <span className="type-model text-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="type-series text-accent text-right">
                      {accessoryToProducts[accessory.slug]?.length ?? 0}{" "}
                      PROVISIONAL PRODUCT LINKS
                    </span>
                  </div>
                  <div>
                    <h2 className="type-h2">{accessory.name}</h2>
                    <p className="type-body-sm text-ink-muted mt-4 max-w-xl">
                      {accessory.description}
                    </p>
                    <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                      Explore accessories{" "}
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Eyebrow className="md:col-span-3">Compatibility</Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">
                Check the combination, not just the category.
              </h2>
              <p className="type-body-lg text-ink-muted mt-6 max-w-2xl">
                The configuration workflow distinguishes verified, provisional,
                review-required and explicitly incompatible combinations.
              </p>
              <Link
                href={routes.configure}
                className="bg-brand-900 mt-8 inline-flex min-h-12 items-center px-5 text-sm font-semibold text-white"
              >
                Open Configure{" "}
                <ArrowRight aria-hidden className="ml-3 size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
