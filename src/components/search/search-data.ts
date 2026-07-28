import {
  accessories,
  productFamilies,
  products,
  publishedProjects,
  publishedResources,
  sectors,
  spaces,
} from "@/content";
import { routes } from "@/lib/routes";
export type SearchCategory =
  | "Products"
  | "Product Families"
  | "Accessories"
  | "Spaces"
  | "Sectors"
  | "Projects"
  | "Resources"
  | "Company Pages";
export type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords: string;
};
export const searchIndex: SearchResult[] = [
  ...products.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.summary,
    href: routes.product(item.slug),
    category: "Products" as const,
    keywords: `${item.series} ${item.descriptor}`,
  })),
  ...productFamilies.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.shortDescription,
    href: routes.productFamily(item.slug),
    category: "Product Families" as const,
    keywords: item.productTypes.join(" "),
  })),
  ...accessories.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.description,
    href: routes.accessory(item.slug),
    category: "Accessories" as const,
    keywords: item.descriptor,
  })),
  ...spaces.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.summary,
    href: routes.space(item.slug),
    category: "Spaces" as const,
    keywords: item.group,
  })),
  ...sectors.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.summary,
    href: routes.sector(item.slug),
    category: "Sectors" as const,
    keywords: "",
  })),
  ...publishedProjects.map((item) => ({
    id: item.id,
    title: item.projectName,
    description: item.summary,
    href: routes.project(item.slug),
    category: "Projects" as const,
    keywords: item.location ?? "",
  })),
  ...publishedResources.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.summary,
    href: routes.resources,
    category: "Resources" as const,
    keywords: item.resourceType,
  })),
  {
    id: "projects-index",
    title: "Projects",
    description:
      "Approved technology-furniture applications across professional spaces.",
    href: routes.projects,
    category: "Projects" as const,
    keywords: "applications case studies education corporate specialist",
  },
  {
    id: "resources-index",
    title: "Resources",
    description:
      "Product literature, technical files and planning information.",
    href: routes.resources,
    category: "Resources" as const,
    keywords: "brochures data sheets cad bim step guides downloads",
  },
  {
    id: "login",
    title: "TEVORA Login",
    description: "Access technical downloads with a TEVORA-issued account ID.",
    href: routes.login,
    category: "Resources" as const,
    keywords: "login sign in downloads account tevora id access",
  },
  {
    id: "company",
    title: "Company",
    description:
      "TEVORA designs technology-integrated furniture for professional spaces.",
    href: routes.company,
    category: "Company Pages" as const,
    keywords: "about technology furniture brand",
  },
  {
    id: "design-support",
    title: "Design Support",
    description:
      "Planning support for integrators, consultants, architects and project teams.",
    href: routes.designSupport,
    category: "Company Pages" as const,
    keywords: "support specification cad bim",
  },
  {
    id: "contact",
    title: "Discuss Your Project",
    description: "Start a project conversation with TEVORA.",
    href: routes.contact,
    category: "Company Pages" as const,
    keywords: "contact proposal enquiry",
  },
];
export function searchContent(query: string) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return searchIndex
    .map((item) => ({
      item,
      score: terms.reduce((score, term) => {
        const title = item.title.toLocaleLowerCase();
        const haystack =
          `${title} ${item.description} ${item.keywords} ${item.category}`.toLocaleLowerCase();
        return (
          score +
          (title.startsWith(term)
            ? 5
            : title.includes(term)
              ? 3
              : haystack.includes(term)
                ? 1
                : 0)
        );
      }, 0),
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title),
    )
    .slice(0, 12)
    .map(({ item }) => item);
}
