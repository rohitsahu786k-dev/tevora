import type { SlugIsUniqueValidator } from "sanity";

export const isUniqueAcrossType: SlugIsUniqueValidator = async (
  slug,
  context,
) => {
  const document = context.document;
  if (!document?._id || !document._type) return true;
  const id = document._id.replace(/^drafts\./, "");
  const count = await context
    .getClient({ apiVersion: "2026-07-13" })
    .fetch<number>(
      `count(*[_type == $type && slug.current == $slug && !(_id in [$published, $draft])])`,
      {
        type: document._type,
        slug,
        published: id,
        draft: `drafts.${id}`,
      },
    );
  return count === 0;
};
