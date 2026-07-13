import { PageShell } from "@/components/layout/page-shell";
import { brandSettings } from "@/config/brand";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/routes";
export const metadata = createPageMetadata({
  title: `About ${brandSettings.brandName}`,
  description: brandSettings.longDescription,
  path: routes.company,
});
export default function Page() {
  return (
    <PageShell
      eyebrow="Company"
      title={`About ${brandSettings.brandName}`}
      description={brandSettings.longDescription}
    />
  );
}
