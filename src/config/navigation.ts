import { productFamilies, sectors, spaces } from "@/content";
import { routes } from "@/lib/routes";

export type MenuLink = {
  label: string;
  href: string;
  description?: string;
  image?: string;
};
export type MenuGroup = { label: string; items: MenuLink[] };
const familyLink = (slug: string): MenuLink => {
  const family = productFamilies.find((item) => item.slug === slug);
  if (!family) throw new Error(`Unknown navigation family: ${slug}`);
  return {
    label: family.name,
    href: routes.productFamily(family.slug),
    description: family.shortDescription,
  };
};
export const productMenuGroups: MenuGroup[] = [
  {
    label: "Present",
    items: [
      familyLink("presentation-stations"),
      familyLink("learning-furniture"),
    ],
  },
  {
    label: "Display",
    items: [
      familyLink("display-stands"),
      familyLink("mobile-av-carts"),
      familyLink("media-walls-space-dividers"),
    ],
  },
  {
    label: "Collaborate",
    items: [
      familyLink("collaboration-tables"),
      familyLink("technical-workstations"),
    ],
  },
  {
    label: "Integrate",
    items: [
      familyLink("technology-credenzas"),
      familyLink("av-equipment-enclosures"),
      familyLink("room-control-scheduling"),
    ],
  },
  {
    label: "Interact",
    items: [
      familyLink("interactive-kiosks"),
      {
        label: "Accessories",
        href: routes.accessories,
        description:
          "Mounting, power, connectivity, mobility and equipment-support accessories.",
      },
    ],
  },
];
const spaceGroupLabels: Record<string, string> = {
  "Education Spaces": "Education",
  "Corporate Spaces": "Corporate",
  "Specialist Spaces": "Specialist",
  "Public and Self-Service Spaces": "Public and Self-Service",
};
export const spaceMenuGroups: MenuGroup[] = Object.entries(
  spaceGroupLabels,
).map(([group, label]) => ({
  label,
  items: spaces
    .filter((space) => space.group === group)
    .map((space) => ({
      label: space.name,
      href: routes.space(space.slug),
      description: space.summary,
    })),
}));
export const sectorMenuItems: MenuLink[] = sectors.map((sector) => ({
  label: sector.name,
  href: routes.sector(sector.slug),
  description: sector.summary,
}));
export const mainNavigation = [
  { label: "Products", href: routes.products, menu: "products" as const },
  { label: "Spaces", href: routes.spaces, menu: "spaces" as const },
  { label: "Sectors", href: routes.sectors, menu: "sectors" as const },
  { label: "Configure", href: routes.configure },
  { label: "Projects", href: routes.projects },
  { label: "Resources", href: routes.resources },
  { label: "Design Support", href: routes.designSupport },
  { label: "Partners", href: routes.partners },
  { label: "Company", href: routes.company },
  { label: "Contact", href: routes.contact },
] as const;
