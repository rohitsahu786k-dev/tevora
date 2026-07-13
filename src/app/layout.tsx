import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageProgress } from "@/components/navigation/page-progress";
import { SkipToContent } from "@/components/navigation/skip-to-content";
import { CmsVisualEditing } from "@/components/cms/visual-editing";
import { OrganisationJsonLd } from "@/components/seo/json-ld";
import { TevoraMotionProvider } from "@/components/motion";
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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={brandSettings.regionalSettings.language}>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <OrganisationJsonLd />
        <SkipToContent />
        <PageProgress />
        <TevoraMotionProvider>
          <SiteHeader />
        </TevoraMotionProvider>
        {children}
        <SiteFooter />
        {process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING === "true" && (
          <CmsVisualEditing />
        )}
      </body>
    </html>
  );
}
