import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityConfig } from "@/lib/cms/config";

export function sanityImageUrl(source: SanityImageSource) {
  if (!sanityConfig.projectId)
    throw new Error(
      "Sanity image rendering requires NEXT_PUBLIC_SANITY_PROJECT_ID.",
    );
  return createImageUrlBuilder({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
  })
    .image(source)
    .auto("format")
    .fit("max");
}
