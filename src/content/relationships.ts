import {
  accessories,
  productFamilies,
  products,
  projects,
  sectors,
  spaces,
} from "@/content";

export const sectorToSpaces: Record<string, string[]> = {
  "higher-education": [
    "lecture-theatre",
    "classroom",
    "seminar-room",
    "teaching-laboratory",
    "education-training-room",
    "library",
    "collaborative-learning-space",
    "auditorium",
    "faculty-presentation-room",
  ],
  schools: [
    "classroom",
    "seminar-room",
    "teaching-laboratory",
    "library",
    "collaborative-learning-space",
    "auditorium",
  ],
  corporate: [
    "boardroom",
    "conference-room",
    "huddle-room",
    "corporate-training-room",
    "town-hall",
    "collaboration-space",
    "executive-briefing-centre",
    "innovation-lab",
    "reception",
  ],
  government: [
    "conference-room",
    "corporate-training-room",
    "town-hall",
    "courtroom",
    "council-chamber",
    "emergency-operations-centre",
    "visitor-registration",
    "wayfinding-point",
  ],
  healthcare: [
    "conference-room",
    "corporate-training-room",
    "collaboration-space",
    "simulation-room",
    "digital-information-point",
    "visitor-registration",
  ],
  hospitality: [
    "conference-room",
    "town-hall",
    "reception",
    "visitor-registration",
    "wayfinding-point",
    "digital-information-point",
  ],
  "public-spaces": [
    "visitor-registration",
    "wayfinding-point",
    "digital-information-point",
    "self-service-zone",
    "room-scheduling-point",
  ],
  "broadcast-media": [
    "broadcast-studio",
    "technical-workstation",
    "town-hall",
  ].filter((slug) => spaces.some((space) => space.slug === slug)),
  "control-command": [
    "control-room",
    "command-centre",
    "security-operations-centre",
    "network-operations-centre",
    "emergency-operations-centre",
  ],
  "training-centres": [
    "education-training-room",
    "corporate-training-room",
    "simulation-room",
    "auditorium",
  ],
  "events-venues": [
    "auditorium",
    "town-hall",
    "broadcast-studio",
    "visitor-registration",
    "wayfinding-point",
  ],
  "houses-of-worship": [
    "auditorium",
    "broadcast-studio",
    "digital-information-point",
  ],
};

const educationFamilies = [
  "presentation-stations",
  "display-stands",
  "mobile-av-carts",
  "learning-furniture",
  "av-equipment-enclosures",
];
const meetingFamilies = [
  "display-stands",
  "technology-credenzas",
  "collaboration-tables",
  "room-control-scheduling",
  "av-equipment-enclosures",
];
const specialistFamilies = [
  "technology-credenzas",
  "av-equipment-enclosures",
  "media-walls-space-dividers",
  "technical-workstations",
];
const publicFamilies = [
  "interactive-kiosks",
  "room-control-scheduling",
  "display-stands",
  "av-equipment-enclosures",
];
export const spaceToProductFamilies: Record<string, string[]> =
  Object.fromEntries(
    spaces.map((space) => [
      space.slug,
      space.group === "Education Spaces"
        ? educationFamilies
        : space.group === "Corporate Spaces"
          ? meetingFamilies
          : space.group === "Specialist Spaces"
            ? specialistFamilies
            : publicFamilies,
    ]),
  );

function stableHash(value: string) {
  return [...value].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
}

function rotate<T>(items: T[], offset: number) {
  if (items.length < 2) return items;
  const start = offset % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

function orderProductsForSpace(spaceSlug: string, familySlugs: string[]) {
  const orderedFamilies = rotate(
    familySlugs,
    stableHash(spaceSlug) % familySlugs.length,
  );
  const familyQueues = orderedFamilies.map((familySlug) =>
    rotate(
      products.filter((product) => product.family === familySlug),
      stableHash(`${spaceSlug}:${familySlug}`),
    ),
  );
  const orderedProducts: string[] = [];
  const longestQueue = Math.max(...familyQueues.map((queue) => queue.length));

  for (let index = 0; index < longestQueue; index += 1) {
    familyQueues.forEach((queue) => {
      const product = queue[index];
      if (product) orderedProducts.push(product.slug);
    });
  }

  return orderedProducts;
}

export const spaceToProducts: Record<string, string[]> = Object.fromEntries(
  Object.entries(spaceToProductFamilies).map(([spaceSlug, familySlugs]) => [
    spaceSlug,
    orderProductsForSpace(spaceSlug, familySlugs),
  ]),
);
export const productToSpaces: Record<string, string[]> = Object.fromEntries(
  products.map((product) => [
    product.slug,
    Object.entries(spaceToProducts)
      .filter(([, productSlugs]) => productSlugs.includes(product.slug))
      .map(([spaceSlug]) => spaceSlug),
  ]),
);
export const productToSectors: Record<string, string[]> = Object.fromEntries(
  products.map((product) => [
    product.slug,
    Object.entries(sectorToSpaces)
      .filter(([, spaceSlugs]) =>
        spaceSlugs.some((spaceSlug) =>
          productToSpaces[product.slug]?.includes(spaceSlug),
        ),
      )
      .map(([sectorSlug]) => sectorSlug),
  ]),
);

const accessoryGroupsByFamily: Record<string, string[]> = {
  "presentation-stations": [
    "device-shelves",
    "power",
    "connectivity",
    "cable-management",
    "accessibility",
    "equipment-cooling",
  ],
  "display-stands": [
    "display-mounting",
    "camera-mounting",
    "soundbar-mounting",
    "device-shelves",
    "cable-management",
    "security",
  ],
  "mobile-av-carts": [
    "display-mounting",
    "camera-mounting",
    "soundbar-mounting",
    "power",
    "connectivity",
    "mobility",
    "security",
  ],
  "technology-credenzas": [
    "display-mounting",
    "camera-mounting",
    "soundbar-mounting",
    "rack-integration",
    "power",
    "cable-management",
    "equipment-cooling",
  ],
  "collaboration-tables": [
    "power",
    "connectivity",
    "cable-management",
    "device-shelves",
    "accessibility",
  ],
  "learning-furniture": [
    "power",
    "connectivity",
    "cable-management",
    "mobility",
    "accessibility",
  ],
  "interactive-kiosks": [
    "device-shelves",
    "power",
    "connectivity",
    "security",
    "accessibility",
    "equipment-cooling",
  ],
  "room-control-scheduling": [
    "power",
    "connectivity",
    "security",
    "cable-management",
  ],
  "av-equipment-enclosures": [
    "rack-integration",
    "power",
    "connectivity",
    "cable-management",
    "security",
    "equipment-cooling",
  ],
  "media-walls-space-dividers": [
    "display-mounting",
    "camera-mounting",
    "soundbar-mounting",
    "power",
    "connectivity",
    "cable-management",
  ],
  "technical-workstations": [
    "device-shelves",
    "rack-integration",
    "power",
    "connectivity",
    "cable-management",
    "equipment-cooling",
  ],
};
export const productToAccessories: Record<string, string[]> =
  Object.fromEntries(
    products.map((product) => [
      product.slug,
      accessoryGroupsByFamily[product.family] ?? [],
    ]),
  );
export const accessoryToProducts: Record<string, string[]> = Object.fromEntries(
  accessories.map((accessory) => [
    accessory.slug,
    products
      .filter((product) =>
        productToAccessories[product.slug]?.includes(accessory.slug),
      )
      .map((product) => product.slug),
  ]),
);

export const projectRelationships = Object.fromEntries(
  projects.map((project) => [
    project.slug,
    {
      sector: project.sector?.replace("sector-", "") ?? null,
      spaces: project.spaces.map((id) => id.replace("space-", "")),
      products: project.productsUsed.map((id) => id.replace("product-", "")),
    },
  ]),
);

export const relationshipGraph = {
  sectorToSpaces,
  spaceToProductFamilies,
  spaceToProducts,
  productToSpaces,
  productToSectors,
  productToAccessories,
  accessoryToProducts,
  projectRelationships,
} as const;
export const relationshipCounts = {
  sectors: sectors.length,
  spaces: spaces.length,
  families: productFamilies.length,
  products: products.length,
  accessories: accessories.length,
} as const;
