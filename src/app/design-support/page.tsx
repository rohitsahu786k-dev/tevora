import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui/system";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata({
  title: "Design Support",
  description:
    "Product selection, space planning and technology-furniture coordination support for professional project teams.",
  path: routes.designSupport,
});

const audiences = [
  "AV integrators",
  "Architects",
  "AV consultants",
  "Technology consultants",
  "Universities",
  "Corporate project teams",
  "Dealers",
  "Partners",
];
const supportAreas = [
  [
    "Product selection",
    "Identify an appropriate product-family direction from the room, users and technology brief.",
  ],
  [
    "Space planning",
    "Coordinate technology furniture with circulation, sightlines and room activity.",
  ],
  [
    "Device compatibility",
    "Prepare named devices and mounting requirements for technical validation.",
  ],
  [
    "Rack planning",
    "Organise rack-equipment requirements, access and ventilation considerations.",
  ],
  [
    "Display integration",
    "Coordinate display quantity, arrangement and project-supplied mounting information.",
  ],
  [
    "Camera integration",
    "Consider camera position, mounting and service requirements.",
  ],
  [
    "Cable-management planning",
    "Develop clear power, data and signal-routing requirements.",
  ],
  [
    "Power and data coordination",
    "Align furniture interfaces with the wider electrical and data design.",
  ],
  [
    "Accessibility planning",
    "Include user reach, approach and operating requirements from the outset.",
  ],
  [
    "Customisation",
    "Review project-specific changes through an appropriate technical process.",
  ],
  [
    "CAD and BIM assistance",
    "Help project teams identify the right drawings, models and coordination files for the current stage.",
  ],
  [
    "Finish support",
    "Coordinate finish direction with the architectural material palette.",
  ],
  [
    "Installation guidance",
    "Prepare access, sequencing and handover requirements with delivery teams.",
  ],
] as const;

export default function DesignSupportPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow>Design Support</Eyebrow>
              <h1 className="type-h1 mt-7">
                Specify technology furniture with confidence.
              </h1>
              <p className="type-body-lg text-ink-muted mt-7 max-w-3xl">
                Practical product and planning support for teams coordinating
                furniture, AV equipment, architecture and user needs.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton asChild>
                  <Link href={routes.contact}>
                    Discuss Your Project{" "}
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </PrimaryButton>
                <SecondaryButton asChild>
                  <Link href={routes.resources}>Browse Resources</Link>
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Eyebrow className="text-emerald-300 md:col-span-3">
              Who we support
            </Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">
                Built for the people who make technology spaces work.
              </h2>
              <ul className="mt-12 grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
                {audiences.map((audience, index) => (
                  <li
                    key={audience}
                    className="bg-brand-950 grid min-h-40 content-between p-5"
                  >
                    <span className="type-model text-emerald-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="type-h5">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Areas of support"
            title="Coordinate the product around the project."
            description="Work through product direction, equipment fit, room planning and the details needed for a confident specification."
          />
          <ol className="border-line border-t">
            {supportAreas.map(([title, copy], index) => (
              <li
                key={title}
                className="border-line grid gap-5 border-b py-7 md:grid-cols-[4rem_16rem_1fr]"
              >
                <span className="type-model text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="type-h4">{title}</h2>
                <p className="type-body-sm text-ink-muted max-w-2xl">{copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Eyebrow className="md:col-span-3">Start with the brief</Eyebrow>
            <div className="md:col-span-8">
              <h2 className="type-section">
                Bring the space, technology and project team together early.
              </h2>
              <p className="type-body-lg text-ink-muted mt-6 max-w-2xl">
                Share the project stage, room type, known equipment and
                coordination files. We’ll use that context to frame the next
                technical conversation.
              </p>
              <PrimaryButton asChild className="mt-9">
                <Link href={routes.contact}>
                  Discuss Your Project{" "}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
