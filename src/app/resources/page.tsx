import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Boxes,
  Building2,
  Download,
  FileCheck2,
  FileText,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { ResourceBrowser } from "@/components/resources/resource-browser";
import { ProductBrowserSkeleton } from "@/components/products/product-browser-skeleton";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import { resources } from "@/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: "Resources",
  description:
    "Browse TEVORA product brochures, data sheets, CAD, BIM, Revit, STEP, planning guides and project documentation through a TEVORA-issued login.",
  path: routes.resources,
});

const resourceGroups = [
  {
    title: "Plan the room",
    description:
      "Planning guides, product overviews and finish references for early conversations with clients, consultants and internal teams.",
    items: ["Planning guides", "Product brochures", "Finish cards"],
    icon: Building2,
  },
  {
    title: "Coordinate the design",
    description:
      "CAD, BIM, Revit and STEP resources for checking furniture size, equipment zones, display positions and service clearances.",
    items: ["CAD drawings", "BIM objects", "Revit families", "STEP models"],
    icon: Boxes,
  },
  {
    title: "Support specification",
    description:
      "Data sheets, technical specifications, certification records and installation guidance for procurement and project delivery.",
    items: [
      "Product data sheets",
      "Technical specifications",
      "Certification register",
      "Installation guides",
    ],
    icon: FileCheck2,
  },
];

const accessSteps = [
  {
    title: "Browse by product, space or file type",
    description:
      "Use the library filters to find the resources connected to the product family, room type or project stage you are working on.",
  },
  {
    title: "Request or use your TEVORA login",
    description:
      "Technical downloads are released through a TEVORA-issued ID so your team receives the current project-ready files.",
  },
  {
    title: "Coordinate with Design Support",
    description:
      "For project-specific packs, TEVORA can confirm the right drawings, models, finish references and installation notes before release.",
  },
];

const resourceStats = [
  { label: "Resource records", value: resources.length.toString() },
  { label: "File formats", value: "PDF, DWG, BIM, RVT, STEP" },
  { label: "Access", value: "TEVORA ID" },
];

export default function ResourcesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 text-white">
        <Container className="py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="text-emerald-300">Resources</Eyebrow>
              <h1 className="type-hero mt-7 text-balance">
                Technical files for better project coordination.
              </h1>
              <p className="type-body-lg mt-7 max-w-2xl text-white/75">
                Find brochures, data sheets, drawings, BIM objects, Revit
                families, STEP files and planning guides for TEVORA technology
                furniture. Downloads are managed through a TEVORA-issued login
                so project teams work from current files.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton
                  asChild
                  className="text-brand-950! hover:border-accent hover:bg-accent! border-white bg-white! hover:text-white!"
                >
                  <a href="#resource-library">
                    Browse Library <ArrowRight aria-hidden className="size-4" />
                  </a>
                </PrimaryButton>
                <SecondaryButton
                  asChild
                  className="hover:text-brand-950 border-white/55 text-white hover:border-white hover:bg-white"
                >
                  <Link href={routes.login}>Request TEVORA Login</Link>
                </SecondaryButton>
              </div>
            </div>
            <div className="border border-white/20 bg-white/8 p-5 shadow-[0_24px_80px_rgba(0,0,0,.24)] backdrop-blur-xl lg:col-span-5">
              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white/18">
                  <LockKeyhole
                    aria-hidden
                    className="size-5 text-emerald-300"
                  />
                </div>
                <div>
                  <h2 className="type-h4">Download access</h2>
                  <p className="type-body-sm mt-3 text-white/72">
                    Public records can be reviewed in the library. Controlled
                    downloads require a TEVORA ID, and restricted files may also
                    require project approval.
                  </p>
                </div>
              </div>
              <dl className="mt-8 grid gap-px overflow-hidden bg-white/18 sm:grid-cols-3">
                {resourceStats.map((item) => (
                  <div key={item.label} className="bg-brand-950/60 p-4">
                    <dt className="type-model text-emerald-300">
                      {item.label}
                    </dt>
                    <dd className="type-body-sm mt-2 text-white/85">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {resourceGroups.map(({ title, description, items, icon: Icon }) => (
              <article
                key={title}
                className="border-line bg-surface grid min-h-80 content-between border p-5"
              >
                <div>
                  <Icon aria-hidden className="text-accent size-6" />
                  <h2 className="type-h4 mt-8">{title}</h2>
                  <p className="type-body-sm text-ink-muted mt-4">
                    {description}
                  </p>
                </div>
                <ul className="border-line mt-8 grid gap-3 border-t pt-5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-semibold"
                    >
                      <FileText aria-hidden className="text-accent size-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>How Access Works</Eyebrow>
              <h2 className="type-section mt-6 text-balance">
                The right file, released for the right project stage.
              </h2>
            </div>
            <ol className="border-line bg-line grid gap-px border md:col-span-8 md:grid-cols-3">
              {accessSteps.map((step, index) => (
                <li key={step.title} className="bg-canvas p-5">
                  <span className="type-model text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-h5 mt-10">{step.title}</h3>
                  <p className="type-body-sm text-ink-muted mt-4">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section id="resource-library">
        <Container>
          <div className="border-line mb-8 grid gap-5 border-t pt-5 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow>Resource Library</Eyebrow>
            </div>
            <div className="md:col-span-7">
              <h2 className="type-section text-balance">
                Search by product family, resource type, format, sector or
                space.
              </h2>
              <p className="type-body text-ink-muted mt-5 max-w-3xl">
                Use the filters to narrow the library to the files your project
                team needs. If the file is controlled, request access and TEVORA
                Design Support will confirm the right login or release path.
              </p>
            </div>
            <div className="flex items-start gap-3 md:col-span-2 md:justify-end">
              <Download aria-hidden className="text-accent mt-1 size-5" />
              <p className="type-caption text-ink-muted">
                Current downloads are released through TEVORA access.
              </p>
            </div>
          </div>
          <Suspense fallback={<ProductBrowserSkeleton />}>
            <ResourceBrowser />
          </Suspense>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <Eyebrow className="text-emerald-300">Project Packs</Eyebrow>
              <h2 className="type-section mt-6 text-balance">
                Need a coordinated resource pack for a live project?
              </h2>
              <p className="type-body-lg mt-5 max-w-3xl text-white/72">
                Share the product families, spaces and project stage. TEVORA can
                help assemble the drawings, models, finish references and
                technical notes that match the requirement.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <PrimaryButton
                asChild
                className="text-brand-950! hover:border-accent hover:bg-accent! border-white bg-white! hover:text-white!"
              >
                <Link href={routes.contact}>
                  Contact Design Support
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </PrimaryButton>
              <SecondaryButton
                asChild
                className="hover:text-brand-950 border-white/55 text-white hover:border-white hover:bg-white"
              >
                <Link href={routes.login}>
                  <ShieldCheck aria-hidden className="size-4" />
                  Request Login
                </Link>
              </SecondaryButton>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
