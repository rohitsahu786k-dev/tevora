import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageProgress } from "@/components/navigation/page-progress";
import { RouteScrollReset } from "@/components/navigation/route-scroll-reset";
import { SkipToContent } from "@/components/navigation/skip-to-content";
import { CmsVisualEditing } from "@/components/cms/visual-editing";
import { OrganisationJsonLd } from "@/components/seo/json-ld";
import { OnespaceMotionProvider } from "@/components/motion";
import { brandSettings } from "@/config/brand";
import "./globals.css";

const sans = Geist({ variable: "--font-teg-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-teg-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: brandSettings.seoDefaults.title,
    template: brandSettings.seoDefaults.titleTemplate,
  },
  description: brandSettings.seoDefaults.description,
  icons: { icon: brandSettings.favicon },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1412" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={brandSettings.regionalSettings.language}>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <OrganisationJsonLd />
        <SkipToContent />
        <RouteScrollReset />
        <PageProgress />
        <OnespaceMotionProvider>
          <SiteHeader />
        </OnespaceMotionProvider>
        {children}
        <SiteFooter />
        {process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING === "true" && (
          <CmsVisualEditing />
        )}
      </body>
    </html>
  );
}
