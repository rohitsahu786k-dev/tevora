import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Boxes,
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

const resourceStats = [
  { label: "Records", value: resources.length.toString() },
  { label: "Formats", value: "PDF, DWG, BIM, RVT, STEP" },
  { label: "Access", value: "TEVORA ID" },
];

const resourceActions = [
  {
    icon: FileText,
    title: "Review",
    text: "Find brochures, data sheets and planning guides.",
  },
  {
    icon: Boxes,
    title: "Coordinate",
    text: "Locate CAD, BIM, Revit and STEP files for design checks.",
  },
  {
    icon: FileCheck2,
    title: "Request",
    text: "Use a TEVORA login for controlled technical downloads.",
  },
];

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams?: Promise<{ login?: string }>;
}) {
  const params = await searchParams;
  const demoAccess = params?.login === "demo";
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 text-white">
        <Container className="grid gap-6 py-10 md:gap-8 md:py-14 lg:grid-cols-[1fr_24rem] lg:items-end">
          <div>
            <Eyebrow className="text-emerald-300">Resources</Eyebrow>
            <h1 className="type-h2 mt-4 max-w-4xl text-balance">
              Project files for planning, coordination and specification.
            </h1>
            <p className="type-body-lg mt-4 max-w-3xl text-white/74">
              Search TEVORA brochures, data sheets, drawings, BIM objects, Revit
              families, STEP files and planning guides. Controlled downloads are
              released through a TEVORA-issued login.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
              <PrimaryButton asChild className="text-brand-950! bg-white!">
                <a href="#resource-library">
                  Browse Library <ArrowRight aria-hidden className="size-4" />
                </a>
              </PrimaryButton>
              <SecondaryButton
                asChild
                className="hover:text-brand-950 border-white/55 text-white hover:bg-white"
              >
                <Link href={routes.login}>Request TEVORA Login</Link>
              </SecondaryButton>
            </div>
          </div>
          <div className="border border-white/18 bg-white/[0.04] p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-white/12">
                <LockKeyhole aria-hidden className="size-5 text-emerald-300" />
              </span>
              <div>
                <h2 className="type-h4">Download access</h2>
                <p className="type-body-sm mt-2 text-white/68">
                  Public records can be reviewed immediately. Controlled files
                  require TEVORA login access or project approval.
                </p>
              </div>
            </div>
            {demoAccess && (
              <p className="mt-4 border border-emerald-300/35 bg-emerald-300/10 p-3 text-sm">
                Demo TEVORA ID confirmed.
              </p>
            )}
            <dl className="mt-4 grid gap-px border-y border-white/14 bg-white/10 sm:grid-cols-3">
              {resourceStats.map((item) => (
                <div
                  key={item.label}
                  className="bg-brand-950/40 p-3 sm:bg-transparent sm:py-4 sm:pr-3"
                >
                  <dt className="type-model text-emerald-300">{item.label}</dt>
                  <dd className="mt-2 text-sm text-white/82">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <Section tone="white" className="py-8 md:py-10">
        <Container>
          <div className="border-line bg-line flex gap-px overflow-x-auto border md:grid md:grid-cols-3 md:overflow-visible">
            {resourceActions.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="bg-surface flex min-w-[16rem] gap-4 p-4 md:min-w-0 md:p-5"
              >
                <Icon
                  aria-hidden
                  className="text-accent mt-1 size-5 shrink-0"
                />
                <div>
                  <h2 className="type-h4">{title}</h2>
                  <p className="type-body-sm text-ink-muted mt-2">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="resource-library" className="py-8 md:py-12">
        <Container>
          <div className="border-line mb-5 grid gap-4 border-t pt-4 md:mb-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Eyebrow>Resource Library</Eyebrow>
              <h2 className="type-h3 mt-3 max-w-3xl text-balance">
                Search by family, product, format, sector or space.
              </h2>
              <p className="type-body-sm text-ink-muted mt-3 max-w-3xl">
                Filter the library to the file set your project team needs. If a
                file is controlled, request access and TEVORA will confirm the
                correct release path.
              </p>
            </div>
            <div className="text-ink-muted flex items-center gap-3 text-sm">
              <Download aria-hidden className="text-accent size-4" />
              Current files are released through TEVORA access.
            </div>
          </div>
          <Suspense fallback={<ProductBrowserSkeleton />}>
            <ResourceBrowser demoAccess={demoAccess} />
          </Suspense>
        </Container>
      </Section>

      <Section tone="dark" className="py-10 md:py-12">
        <Container>
          <div className="grid items-center gap-5 border border-white/18 bg-white/[0.04] p-5 md:grid-cols-[1fr_auto] md:p-6">
            <div>
              <Eyebrow className="text-emerald-300">Project Packs</Eyebrow>
              <h2 className="type-h3 mt-4 max-w-3xl text-balance">
                Need a coordinated pack for a live project?
              </h2>
              <p className="type-body-sm mt-3 max-w-2xl text-white/68">
                Share the product families, spaces and project stage. TEVORA can
                confirm the drawings, models, finish references and notes that
                match the requirement.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <PrimaryButton asChild className="text-brand-950! bg-white!">
                <Link href={routes.contact}>
                  Contact Design Support
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </PrimaryButton>
              <SecondaryButton
                asChild
                className="hover:text-brand-950 border-white/55 text-white hover:bg-white"
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
