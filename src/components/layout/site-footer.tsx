import Link from "next/link";
import type { ReactNode } from "react";
import { brandSettings } from "@/config/brand";
import { productFamilies, sectors } from "@/content";
import { routes } from "@/lib/routes";
import { ViewportReveal } from "@/components/motion/reveal";
import { BrandLogo } from "@/components/brand/brand-logo";

const spaceLinks = [
  { label: "Education", href: "/spaces#education-spaces" },
  { label: "Corporate", href: "/spaces#corporate-spaces" },
  { label: "Specialist", href: "/spaces#specialist-spaces" },
  {
    label: "Public and Self-Service",
    href: "/spaces#public-and-self-service-spaces",
  },
];
const resourceLinks = [
  { label: "Resources", href: routes.resources },
  { label: "Design Support", href: routes.designSupport },
  { label: "Projects", href: routes.projects },
  { label: "Configure", href: routes.configure },
];
const partnerLinks = [
  { label: "Partner Network", href: routes.partners },
  { label: "Become a Partner", href: routes.partnerApply },
];
export function SiteFooter() {
  return (
    <footer className="bg-brand-950 border-t border-white/15 text-white">
      <div className="mx-auto max-w-[96rem] px-5 py-16 sm:px-8 md:py-20">
        <ViewportReveal amount={0.08}>
          <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link href={routes.home} className="inline-block">
                <BrandLogo variant="light" className="w-52" />
                <span className="type-caption mt-1 block text-white/70">
                  {brandSettings.brandDescriptor}
                </span>
              </Link>
              <p className="type-body-lg mt-8 max-w-sm text-white/75">
                {brandSettings.brandLine}
              </p>
              <p className="type-body-sm mt-12 max-w-sm text-white/70">
                Technology-integrated furniture for presenting, teaching,
                meeting, collaborating, communicating and controlling.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
              <FooterGroup title="Product Families">
                {productFamilies.map((family) => (
                  <FooterLink
                    key={family.slug}
                    href={routes.productFamily(family.slug)}
                  >
                    {family.name}
                  </FooterLink>
                ))}
              </FooterGroup>
              <div className="space-y-10">
                <FooterGroup title="Spaces">
                  {spaceLinks.map((item) => (
                    <FooterLink key={item.label} href={item.href}>
                      {item.label}
                    </FooterLink>
                  ))}
                </FooterGroup>
                <FooterGroup title="Resources">
                  {resourceLinks.map((item) => (
                    <FooterLink key={item.label} href={item.href}>
                      {item.label}
                    </FooterLink>
                  ))}
                </FooterGroup>
              </div>
              <FooterGroup title="Sectors">
                {sectors.map((sector) => (
                  <FooterLink
                    key={sector.slug}
                    href={routes.sector(sector.slug)}
                  >
                    {sector.name}
                  </FooterLink>
                ))}
              </FooterGroup>
              <div className="space-y-10">
                <FooterGroup title={brandSettings.brandName}>
                  <FooterLink href={routes.company}>Company</FooterLink>
                  <FooterLink href={routes.contact}>Contact</FooterLink>
                </FooterGroup>
                <FooterGroup title="Partners">
                  {partnerLinks.map((item) => (
                    <FooterLink key={item.href} href={item.href}>
                      {item.label}
                    </FooterLink>
                  ))}
                  <span
                    aria-disabled="true"
                    className="flex min-h-9 items-center text-xs text-white/45"
                  >
                    Partner Login — planned
                  </span>
                </FooterGroup>
                <div>
                  <p className="type-eyebrow text-white/70">Region</p>
                  <label className="sr-only" htmlFor="region-selector">
                    Region selector
                  </label>
                  <select
                    id="region-selector"
                    defaultValue={brandSettings.regionalSettings.region}
                    className="mt-4 min-h-12 w-full border border-white/25 bg-transparent px-3 text-sm text-white"
                  >
                    <option className="text-graphite">
                      {brandSettings.regionalSettings.region}
                    </option>
                  </select>
                </div>
                {brandSettings.socialLinks.length > 0 && (
                  <FooterGroup title="Social">
                    {brandSettings.socialLinks.map((item) => (
                      <FooterLink key={item.href} href={item.href}>
                        {item.label}
                      </FooterLink>
                    ))}
                  </FooterGroup>
                )}
              </div>
            </div>
          </div>
          {brandSettings.parentBrandVisibility && (
            <div className="border-b border-white/15 py-8">
              <p className="type-h4">
                {brandSettings.brandName} by {brandSettings.parentBrandName}
              </p>
              <p className="type-body-sm mt-2 text-white/70">
                {brandSettings.parentBrandRelationshipText}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-5 pt-8 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {brandSettings.legalCompanyName}. All
              rights reserved.
            </p>
          </div>
        </ViewportReveal>
      </div>
    </footer>
  );
}
function FooterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="type-eyebrow text-white/70">{title}</h2>
      <div className="mt-4 grid">{children}</div>
    </div>
  );
}
function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href as never}
      className="motion-link flex min-h-9 w-fit items-center text-xs leading-5 text-white/70 hover:text-emerald-300"
    >
      {children}
    </Link>
  );
}
