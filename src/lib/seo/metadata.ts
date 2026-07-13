import type { Metadata } from "next";
import { brandSettings } from "@/config/brand";
import { getCanonicalUrl } from "@/lib/navigation/content-navigation";

export interface PageMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: { url: string; alt: string; width?: number; height?: number };
  noIndex?: boolean;
  type?: "website" | "article";
}
export function createMetadata(
  title?: string,
  description = brandSettings.seoDefaults.description,
  path = "/",
) {
  return createPageMetadata({ title, description, path });
}
export function createPageMetadata({
  title = brandSettings.seoDefaults.title,
  description = brandSettings.seoDefaults.description,
  path = "/",
  image,
  noIndex = false,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonical = getCanonicalUrl(path);
  const images = image
    ? [
        {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ]
    : undefined;
  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: brandSettings.brandName,
      type,
      locale: brandSettings.regionalSettings.locale,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}
