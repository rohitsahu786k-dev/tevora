import { draftMode } from "next/headers";
import {
  accessories,
  productFamilies,
  products,
  projects,
  resources,
  sectors,
  spaces,
} from "@/content";
import { createSanityClient } from "@/lib/cms/client";
import { getCmsMode } from "@/lib/cms/config";
import { collectionQueries, entryQueries } from "@/lib/cms/queries";

const localCollections = {
  accessories,
  productFamilies,
  products,
  projects,
  resources,
  sectors,
  spaces,
};
export type CmsCollectionName = keyof typeof localCollections;
export type CmsCollectionMap = {
  [K in CmsCollectionName]: (typeof localCollections)[K];
};
export interface CmsAdapter {
  getCollection<K extends CmsCollectionName>(
    name: K,
  ): Promise<CmsCollectionMap[K]>;
  getEntry<K extends CmsCollectionName>(
    name: K,
    slug: string,
  ): Promise<CmsCollectionMap[K][number] | null>;
}

export class LocalCmsAdapter implements CmsAdapter {
  async getCollection<K extends CmsCollectionName>(name: K) {
    return localCollections[name];
  }
  async getEntry<K extends CmsCollectionName>(name: K, slug: string) {
    return (
      localCollections[name].find((entry) => entry.slug === slug) ??
      (null as CmsCollectionMap[K][number] | null)
    );
  }
}

export class SanityCmsAdapter implements CmsAdapter {
  constructor(private readonly preview = false) {}
  async getCollection<K extends CmsCollectionName>(name: K) {
    const result = await createSanityClient(this.preview).fetch(
      collectionQueries[name],
    );
    if (!Array.isArray(result))
      throw new Error(`Sanity returned invalid ${name} content.`);
    result.forEach((entry, index) =>
      assertContentEnvelope(entry, `${name}[${index}]`),
    );
    return result as unknown as CmsCollectionMap[K];
  }
  async getEntry<K extends CmsCollectionName>(name: K, slug: string) {
    const result = await createSanityClient(this.preview).fetch(
      entryQueries[name],
      { slug },
    );
    if (result !== null) assertContentEnvelope(result, `${name}:${slug}`);
    return result as unknown as CmsCollectionMap[K][number] | null;
  }
}

function assertContentEnvelope(
  value: unknown,
  label: string,
): asserts value is { slug: string; title: string; summary: string } {
  if (!value || typeof value !== "object")
    throw new Error(`Sanity returned a non-object for ${label}.`);
  const entry = value as Record<string, unknown>;
  for (const field of ["slug", "title", "summary"])
    if (typeof entry[field] !== "string" || !entry[field])
      throw new Error(
        `Sanity ${label} is missing required mapped field: ${field}.`,
      );
}

export async function getCmsAdapter(): Promise<CmsAdapter> {
  if (getCmsMode() === "local") return new LocalCmsAdapter();
  const preview = (await draftMode()).isEnabled;
  return new SanityCmsAdapter(preview);
}
