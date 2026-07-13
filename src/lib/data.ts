import { getCmsAdapter, type CmsCollectionName } from "@/lib/cms/adapter";

export type CollectionName = CmsCollectionName;
export async function getAll<K extends CollectionName>(name: K) {
  return (await getCmsAdapter()).getCollection(name);
}
export async function getBySlug<K extends CollectionName>(
  name: K,
  slug: string,
) {
  return (await getCmsAdapter()).getEntry(name, slug);
}
