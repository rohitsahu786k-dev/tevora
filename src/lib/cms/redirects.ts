import { createSanityClient } from "@/lib/cms/client";
import { singletonQueries } from "@/lib/cms/queries";

export interface CmsRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}
export async function getCmsRedirects() {
  const redirects = await createSanityClient(false).fetch(
    singletonQueries.redirects,
  );
  if (!Array.isArray(redirects))
    throw new Error("Sanity returned invalid redirect content.");
  return redirects as CmsRedirect[];
}
