import { defineQuery } from "next-sanity";

export const PRODUCT_FAMILIES_QUERY = defineQuery(
  `*[_type == "productFamily" && status == "active"] | order(name asc){..., "slug": slug.current, "title": name, "summary": shortDescription}`,
);
export const PRODUCTS_QUERY = defineQuery(
  `*[_type == "product" && status == "active"] | order(name asc){..., "slug": slug.current, "title": name, "summary": coalesce(descriptor, "Product details"), "productFamily": productFamily->_id}`,
);
export const ACCESSORIES_QUERY = defineQuery(
  `*[_type == "accessory" && status == "active"] | order(name asc){..., "slug": slug.current, "title": name, "summary": coalesce(descriptor, "Accessory details")}`,
);
export const SPACES_QUERY = defineQuery(
  `*[_type == "space" && status == "active"] | order(name asc){..., "slug": slug.current, "title": name, "summary": coalesce(pt::text(description), "Space details")}`,
);
export const SECTORS_QUERY = defineQuery(
  `*[_type == "sector" && status == "active"] | order(name asc){..., "slug": slug.current, "title": name, "summary": coalesce(pt::text(description), "Sector details")}`,
);
export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && status == "active"] | order(completionDate desc){..., "slug": slug.current, "title": projectName, "summary": coalesce(pt::text(approach), pt::text(challenge), "Project details")}`,
);
export const RESOURCES_QUERY = defineQuery(
  `*[_type == "resource" && status == "active"] | order(_updatedAt desc){..., "slug": slug.current, "summary": coalesce(file.title, "Resource details")}`,
);

export const collectionQueries = {
  productFamilies: PRODUCT_FAMILIES_QUERY,
  products: PRODUCTS_QUERY,
  accessories: ACCESSORIES_QUERY,
  spaces: SPACES_QUERY,
  sectors: SECTORS_QUERY,
  projects: PROJECTS_QUERY,
  resources: RESOURCES_QUERY,
} as const;

export const PRODUCT_FAMILY_QUERY = defineQuery(
  `*[_type == "productFamily" && slug.current == $slug][0]{..., "slug": slug.current, "title": name, "summary": shortDescription}`,
);
export const PRODUCT_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]{..., "slug": slug.current, "title": name, "summary": coalesce(descriptor, "Product details"), "productFamily": productFamily->_id}`,
);
export const ACCESSORY_QUERY = defineQuery(
  `*[_type == "accessory" && slug.current == $slug][0]{..., "slug": slug.current, "title": name, "summary": coalesce(descriptor, "Accessory details")}`,
);
export const SPACE_QUERY = defineQuery(
  `*[_type == "space" && slug.current == $slug][0]{..., "slug": slug.current, "title": name, "summary": coalesce(pt::text(description), "Space details")}`,
);
export const SECTOR_QUERY = defineQuery(
  `*[_type == "sector" && slug.current == $slug][0]{..., "slug": slug.current, "title": name, "summary": coalesce(pt::text(description), "Sector details")}`,
);
export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{..., "slug": slug.current, "title": projectName, "summary": coalesce(pt::text(approach), pt::text(challenge), "Project details")}`,
);
export const RESOURCE_QUERY = defineQuery(
  `*[_type == "resource" && slug.current == $slug][0]{..., "slug": slug.current, "summary": coalesce(file.title, "Resource details")}`,
);

export const entryQueries = {
  productFamilies: PRODUCT_FAMILY_QUERY,
  products: PRODUCT_QUERY,
  accessories: ACCESSORY_QUERY,
  spaces: SPACE_QUERY,
  sectors: SECTOR_QUERY,
  projects: PROJECT_QUERY,
  resources: RESOURCE_QUERY,
} as const;

export const singletonQueries = {
  brandSettings: defineQuery(
    `*[_type == "brandSettings" && _id == "brandSettings"][0]`,
  ),
  homepage: defineQuery(`*[_type == "homepage" && _id == "homepage"][0]`),
  companyPage: defineQuery(
    `*[_type == "companyPage" && _id == "companyPage"][0]`,
  ),
  designSupportPage: defineQuery(
    `*[_type == "designSupportPage" && _id == "designSupportPage"][0]`,
  ),
  partnerProgrammePage: defineQuery(
    `*[_type == "partnerProgrammePage" && _id == "partnerProgrammePage"][0]{..., partnerTypes[]->, benefits[]->, requirements[]->, faqs[]->, journey[]->, regions[]->}`,
  ),
  partnerApplicationSettings: defineQuery(
    `*[_type == "partnerApplicationSettings" && _id == "partnerApplicationSettings"][0]{..., legalDisclaimers[]->}`,
  ),
  navigation: defineQuery(`*[_type == "navigation"][0]`),
  footer: defineQuery(`*[_type == "footer" && _id == "footer"][0]`),
  seoDefaults: defineQuery(
    `*[_type == "seoDefaults" && _id == "seoDefaults"][0]`,
  ),
  redirects: defineQuery(
    `*[_type == "redirect" && active == true]{source,destination,permanent}`,
  ),
} as const;
