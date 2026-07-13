import { createClient } from "next-sanity";
import { sanityConfig } from "@/lib/cms/config";

export function createSanityClient(preview = false) {
  if (!sanityConfig.projectId)
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID is required to create the Sanity client.",
    );
  if (preview && !sanityConfig.token)
    throw new Error("Draft mode requires SANITY_API_READ_TOKEN.");
  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: !preview,
    perspective: preview ? "drafts" : "published",
    token: preview ? sanityConfig.token : undefined,
    stega: { enabled: preview, studioUrl: sanityConfig.studioUrl },
  });
}
