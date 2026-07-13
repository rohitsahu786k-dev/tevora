import type { NextConfig } from "next";
import cloudinaryAssets from "./src/content/cloudinary-assets.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dxzttptsl/**",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: Object.entries(cloudinaryAssets).map(
        ([source, destination]) => ({ source, destination }),
      ),
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    if (
      process.env.CMS_MODE !== "sanity" ||
      !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    )
      return [];
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
    const apiVersion = process.env.SANITY_API_VERSION ?? "2026-07-13";
    const query = encodeURIComponent(
      `*[_type == "redirect" && active == true]{source,destination,permanent}`,
    );
    const response = await fetch(
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`,
      {
        headers: process.env.SANITY_API_READ_TOKEN
          ? { Authorization: `Bearer ${process.env.SANITY_API_READ_TOKEN}` }
          : {},
      },
    );
    if (!response.ok)
      throw new Error(`Unable to load Sanity redirects: ${response.status}`);
    const payload = (await response.json()) as { result?: unknown };
    if (!Array.isArray(payload.result))
      throw new Error("Sanity returned invalid redirect content.");
    return payload.result as Array<{
      source: string;
      destination: string;
      permanent: boolean;
    }>;
  },
};

export default nextConfig;
