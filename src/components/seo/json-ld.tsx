import { brandSettings } from "@/config/brand";
import { getCanonicalUrl } from "@/lib/navigation/content-navigation";
import type { BreadcrumbItem } from "@/components/navigation/breadcrumbs";
import type { Product, Project } from "@/types/content";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function OrganisationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: brandSettings.brandName,
        url: getCanonicalUrl("/"),
        logo: getCanonicalUrl(brandSettings.logoDark),
        description: brandSettings.shortDescription,
      }}
    />
  );
}
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          ...(item.href ? { item: getCanonicalUrl(item.href) } : {}),
        })),
      }}
    />
  );
}
export function ProductJsonLd({
  product,
  familyName,
  image,
}: {
  product: Product;
  familyName: string;
  image?: string;
}) {
  return (
    <JsonLd data={buildProductStructuredData(product, familyName, image)} />
  );
}
export function buildProductStructuredData(
  product: Product,
  familyName: string,
  image?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.descriptor,
    url: getCanonicalUrl(`/product/${product.slug}`),
    brand: { "@type": "Brand", name: brandSettings.brandName },
    category: familyName,
    ...(image ? { image: [getCanonicalUrl(image)] } : {}),
  };
}
export function ProjectJsonLd({
  project,
  sectorName,
}: {
  project: Project;
  sectorName?: string;
}) {
  return <JsonLd data={buildProjectStructuredData(project, sectorName)} />;
}
export function buildProjectStructuredData(
  project: Project,
  sectorName?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.projectName,
    description: project.summary,
    url: getCanonicalUrl(`/projects/${project.slug}`),
    creator: { "@type": "Organization", name: brandSettings.brandName },
    ...(sectorName ? { about: sectorName } : {}),
    ...(project.completionDate ? { dateCreated: project.completionDate } : {}),
  };
}
