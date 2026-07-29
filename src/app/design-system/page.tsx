import { Box, Download, Menu, Search } from "lucide-react";
import { DesignSystemInteractive } from "@/components/design-system/interactive-showcase";
import { ProductCard, ProductTile } from "@/components/products/product-card";
import { TechnicalTable } from "@/components/products/technical-table";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
  Container,
  Divider,
  DownloadBadge,
  EmptyState,
  ErrorState,
  IconButton,
  LoadingState,
  MediaFrame,
  ProductBadge,
  ResponsiveGrid,
  Section,
  SectionHeader,
  SpecificationLabel,
  StatusBadge,
  TechnicalBadge,
  TextLink,
} from "@/components/ui/system";
import {
  GhostButton,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/button";
import { brandSettings } from "@/config/brand";
import { products } from "@/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/routes";
import { MotionShowcase } from "@/components/design-system/motion-showcase";
import { Accordion, Drawer, Modal } from "@/components/ui/disclosure";
import { motionTokens } from "@/lib/motion/tokens";
import { BrandLogo } from "@/components/brand/brand-logo";

export const metadata = createPageMetadata({
  title: "Design System",
  description: "Internal ONESPACE interface and accessibility reference.",
  path: routes.designSystem,
  noIndex: true,
});

const colours = [
  ["Graphite", "#1D2422"],
  ["Brand 950", "#10201D"],
  ["Brand 900", "#18302B"],
  ["Accent", "#2F7968"],
  ["Accent light", "#DCEBE6"],
  ["Canvas", "#F5F4EF"],
  ["Surface", "#FFFEFB"],
  ["Muted", "#EBEAE4"],
] as const;
const typeStyles = [
  ["Hero display", "type-hero", "Technology, built in."],
  ["Section display", "type-section", "Integrated by design."],
  ["H1", "type-h1", "Technology furniture"],
  ["H2", "type-h2", "A modular foundation"],
  ["H3", "type-h3", "Designed for access"],
  ["H4", "type-h4", "Component heading"],
  ["H5", "type-h5", "Interface heading"],
  ["H6", "type-h6", "Technical heading"],
  ["Product title", "type-product", "Presentation Console"],
  ["Product series", "type-series", "ONESPACE / PRESENT"],
  ["Model reference", "type-model", "TVR-PR-2400"],
  ["Eyebrow", "type-eyebrow", "Technology furniture"],
  [
    "Body large",
    "type-body-lg",
    "Technology belongs in the architecture, not added to it.",
  ],
  [
    "Body",
    "type-body",
    "Furniture platforms engineered around displays, cameras, sound, power, data and service access.",
  ],
  [
    "Body small",
    "type-body-sm",
    "Clear supporting information for product selection and specification.",
  ],
  ["Technical text", "type-technical", "POWER: 100–240 V AC / 50–60 HZ"],
  ["Specification label", "type-spec-label", "Maximum display size"],
  ["Numeric specification", "type-numeric", "98 in"],
  ["Caption", "type-caption", "Product shown with optional equipment."],
  [
    "Legal text",
    "type-legal",
    "Specifications are subject to change without notice.",
  ],
] as const;

export default function DesignSystemPage() {
  const sample = products[0]!;
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section tone="dark" className="pt-24 md:pt-36">
        <Container>
          <p className="type-eyebrow text-emerald-300">Design system / 01</p>
          <h1 className="type-hero mt-8 max-w-6xl">
            Precision for physical technology.
          </h1>
          <p className="type-body-lg mt-10 max-w-2xl text-white/70">
            A calm, architectural system for {brandSettings.brandName}:
            structured enough for technical detail and spacious enough for
            premium product storytelling.
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Identity"
            title="A technology-furniture brand"
            description="The identity is direct and product-led. Deep graphite provides authority; a controlled green-teal signals integration, service and human-centred technology."
          />
          <div className="border-line grid border-y md:grid-cols-12">
            <div className="border-line flex min-h-56 items-center border-b p-8 md:col-span-8 md:border-r md:border-b-0">
              <BrandLogo className="w-full max-w-sm" />
            </div>
            <div className="bg-brand-950 flex min-h-56 items-center justify-center p-10 md:col-span-4">
              <BrandLogo variant="light" className="w-full max-w-64" />
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Colour"
            title="Controlled contrast"
            description="Warm neutrals support architectural photography. Accent is purposeful: actions, focus, status and small moments of orientation."
          />
          <ResponsiveGrid columns={4}>
            {colours.map(([name, value]) => (
              <div key={name}>
                <div
                  className="border-line aspect-[4/3] border"
                  style={{ background: value }}
                />
                <div className="type-spec-label mt-3 flex justify-between gap-2">
                  <span>{name}</span>
                  <span className="text-ink-muted">{value}</span>
                </div>
              </div>
            ))}
          </ResponsiveGrid>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <StatusBadge tone="success">Success</StatusBadge>
            <StatusBadge tone="warning">Warning</StatusBadge>
            <StatusBadge tone="error">Error</StatusBadge>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Motion"
            title="Movement with architectural discipline"
            description="Motion establishes hierarchy, orientation and state. It never delays navigation, conceals essential information or substitutes spectacle for product understanding."
          />
          <div className="border-line bg-line grid gap-px border sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Micro",
                motionTokens.duration.micro,
                "Buttons, links, icons and focus states",
              ],
              [
                "Component",
                motionTokens.duration.component,
                "Menus, drawers, options and image changes",
              ],
              [
                "Section",
                motionTokens.duration.section,
                "Headings, editorial content and media",
              ],
              [
                "Cinematic",
                motionTokens.duration.cinematic,
                "Heroes and selected storytelling moments",
              ],
            ].map(([name, duration, use]) => (
              <article key={name} className="bg-surface min-h-48 p-5">
                <p className="type-series text-accent">{name}</p>
                <p className="type-numeric mt-8">
                  {Number(duration) * 1000} ms
                </p>
                <p className="type-caption text-ink-muted mt-4">{use}</p>
              </article>
            ))}
          </div>
          <div className="mt-16">
            <MotionShowcase />
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="type-h3">Overlays and disclosure</h2>
              <p className="type-body-sm text-ink-muted mt-3">
                Drawers, modals and accordions use the same controlled component
                timing, preserve focus and close immediately with Escape.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Modal title="Motion modal" triggerLabel="Open modal">
                  <p className="type-body-sm text-ink-muted">
                    Fade and subtle scale preserve context without a dramatic
                    entrance.
                  </p>
                </Modal>
                <Drawer title="Motion drawer" triggerLabel="Open drawer">
                  <p className="type-body-sm text-ink-muted">
                    The panel enters directionally while the close control
                    receives focus.
                  </p>
                </Drawer>
              </div>
            </div>
            <Accordion
              items={[
                {
                  title: "Use motion for orientation",
                  content:
                    "Use entrance order, continuity and state transitions to clarify where content came from and what changed.",
                },
                {
                  title: "Avoid decorative repetition",
                  content:
                    "Do not animate body copy word by word, repeat viewport reveals, add bounce, or create motion that competes with technical information.",
                },
                {
                  title: "Reduced-motion contract",
                  content:
                    "Remove parallax, scale, large translation, smooth scrolling and page movement; keep immediate state changes or short opacity transitions.",
                },
              ]}
            />
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Typography"
            title="Modern grotesk, technical mono"
            description="Geist is an open, legally available grotesk with the clarity required for global interfaces. Its mono companion carries references, dimensions and technical data."
          />
          <div className="divide-line border-line divide-y border-y">
            {typeStyles.map(([name, className, sample]) => (
              <div key={name} className="grid gap-4 py-6 md:grid-cols-4">
                <p className="type-spec-label text-ink-muted">{name}</p>
                <p className={`${className} md:col-span-3`}>{sample}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Spacing + grid"
            title="Alignment creates calm"
            description="An eight-point-biased spacing scale meets a 12-column content grid, responsive gutters and three deliberate container widths."
          />
          <div className="grid grid-cols-4 gap-2 md:grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="h-32 border border-white/20 bg-white/5">
                <span className="type-model p-2 text-white/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-end gap-5">
            {[4, 8, 12, 16, 24, 32, 48, 64].map((n) => (
              <div key={n} className="text-center">
                <div
                  className="mx-auto bg-emerald-300"
                  style={{ width: n, height: n }}
                />
                <span className="type-model mt-2 block text-white/60">{n}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader eyebrow="Actions" title="Buttons and links" />
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton arrow>Explore products</PrimaryButton>
            <SecondaryButton>Download specification</SecondaryButton>
            <GhostButton>View details</GhostButton>
            <IconButton label="Search" icon={Search} />
            <IconButton label="Open menu" icon={Menu} />
            <TextLink href="/products">Text link</TextLink>
          </div>
          <Divider className="my-12" />
          <div className="flex flex-wrap gap-2">
            <ProductBadge>New platform</ProductBadge>
            <TechnicalBadge>CAD available</TechnicalBadge>
            <DownloadBadge>PDF · 2.4 MB</DownloadBadge>
            <StatusBadge tone="success">In production</StatusBadge>
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Inputs"
            title="Forms and controls"
            description="Persistent labels, explicit errors, visible focus and minimum 44-pixel targets support confident completion."
          />
          <DesignSystemInteractive />
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Product UI"
            title="Products remain the subject"
            description="Cards use structure, proportion and typography rather than floating decoration or exaggerated depth."
          />
          <ResponsiveGrid columns={3}>
            <ProductCard entry={sample} href={`/product/${sample.slug}`} />
            <ProductTile entry={sample} reference="TVR-PR-2400" />
            <MediaFrame className="grid place-items-center">
              <Box aria-hidden className="text-ink-muted size-8" />
              <figcaption className="type-caption absolute bottom-4 left-4">
                4:3 product media frame
              </figcaption>
            </MediaFrame>
          </ResponsiveGrid>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Technical data"
            title="Readable at specification depth"
          />
          <div className="grid gap-12 lg:grid-cols-3">
            <dl>
              <SpecificationLabel label="Display size" value="98" unit="in" />
              <SpecificationLabel
                label="Equipment capacity"
                value="12"
                unit="RU"
              />
              <SpecificationLabel
                label="Service clearance"
                value="600"
                unit="mm"
              />
            </dl>
            <div className="lg:col-span-2">
              <TechnicalTable
                rows={[
                  {
                    property: "Overall width",
                    value: "2400 mm",
                    note: "Configured width",
                  },
                  {
                    property: "Material",
                    value: "Powder-coated steel",
                    note: "Low-VOC finish",
                  },
                  {
                    property: "Cable access",
                    value: "Front + rear",
                    note: "Tool-less panels",
                  },
                  { property: "Ventilation", value: "Passive / active ready" },
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="System feedback"
            title="Clear, quiet states"
          />
          <ResponsiveGrid columns={3}>
            <EmptyState
              title="No products found"
              description="Change or clear the active filters to see more product platforms."
            />
            <LoadingState label="Loading products" />
            <ErrorState />
          </ResponsiveGrid>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Media"
            title="Built for large product imagery"
            description="Media uses controlled aspect ratios, restrained captions and a robust fallback when an asset is unavailable."
          />
          <div className="grid gap-5 md:grid-cols-12">
            <MediaFrame
              ratio="wide"
              className="grid place-items-center bg-white/5 md:col-span-8"
            >
              <span className="type-model text-white/50">
                16:7 IMMERSIVE MEDIA
              </span>
            </MediaFrame>
            <MediaFrame
              ratio="portrait"
              className="grid place-items-center bg-white/5 md:col-span-4"
            >
              <span className="type-model text-white/50">3:4 DETAIL</span>
            </MediaFrame>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Navigation"
            title="Orientation at every depth"
          />
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Presentation", href: "/products/presentation" },
              { label: "Presentation Console" },
            ]}
          />
          <Divider className="my-12" />
          <div className="flex flex-wrap gap-3">
            <DownloadBadge>
              <Download aria-hidden className="size-3" /> Specification
            </DownloadBadge>
            <TechnicalBadge>DWG</TechnicalBadge>
            <TechnicalBadge>Revit</TechnicalBadge>
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Accessibility"
            title="Designed for more people"
          />
          <div className="bg-line grid gap-px md:grid-cols-3">
            {[
              [
                "Keyboard",
                "Logical order, operable controls, arrow-key tabs, Escape dismissal and skip navigation.",
              ],
              [
                "Perception",
                "Semantic landmarks, explicit labels, live states, sufficient contrast and non-colour status cues.",
              ],
              [
                "Motion + touch",
                "Reduced-motion support, restrained transitions, responsive layouts and 44-pixel minimum targets.",
              ],
            ].map(([title, copy]) => (
              <article key={title} className="bg-surface p-6">
                <h3 className="type-h4">{title}</h3>
                <p className="type-body-sm text-ink-muted mt-3">{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
