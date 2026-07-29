import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  Handshake,
  Layers3,
  Target,
  UsersRound,
} from "lucide-react";
import { Accordion } from "@/components/ui/disclosure";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import {
  partnerAudiences,
  partnerBenefits,
  partnerFaqs,
  partnerJourney,
  partnerRequirements,
  partnerSupport,
  partnerTypeContent,
} from "@/content/partners";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Partner Network",
  description:
    "Apply to join TEVORA's network of AV integrators, consultants, dealers, distributors and project specialists.",
  path: routes.partners,
});

const heroStats = [
  { label: "Partner routes", value: "7" },
  { label: "Support areas", value: "10+" },
  { label: "Project sectors", value: "12" },
];

const programmePillars = [
  {
    icon: BriefcaseBusiness,
    title: "Commercial growth",
    text: "Build opportunities around differentiated technology-furniture product families.",
  },
  {
    icon: Layers3,
    title: "Specification support",
    text: "Use product guidance, drawings and configuration support during project development.",
  },
  {
    icon: Target,
    title: "Market alignment",
    text: "Align TEVORA solutions with education, enterprise and specialist environments.",
  },
];

const visibleBenefits = partnerBenefits.slice(0, 6);
const visibleRequirements = partnerRequirements.slice(0, 6);
const visibleSupport = partnerSupport.slice(0, 8);

export default function PartnersPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 text-white">
        <Container className="grid min-h-[34rem] items-center gap-10 py-14 md:py-16 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Eyebrow className="text-emerald-300">
              TEVORA Partner Network
            </Eyebrow>
            <h1 className="type-h2 mt-5 max-w-4xl text-balance">
              Grow with a focused technology furniture partner programme.
            </h1>
            <p className="type-body-lg mt-6 max-w-2xl text-white/74">
              For integrators, dealers, distributors and specification partners
              who help customers plan better meeting, learning, display and
              specialist technology spaces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton asChild className="text-brand-950! bg-white!">
                <Link href={routes.partnerApply as never}>
                  Apply to Become a Partner
                  <ArrowRight aria-hidden className="motion-arrow size-4" />
                </Link>
              </PrimaryButton>
              <SecondaryButton
                asChild
                className="hover:text-brand-950 border-white/55 text-white hover:bg-white"
              >
                <Link href="#partner-types">See partner routes</Link>
              </SecondaryButton>
            </div>
          </div>

          <div className="border border-white/18 bg-white/[0.04] p-6 md:p-7">
            <div className="flex items-center gap-3">
              <span className="bg-accent text-brand-950 grid size-11 place-items-center rounded-full">
                <Handshake aria-hidden className="size-5" />
              </span>
              <div>
                <p className="type-model text-emerald-300">Programme Summary</p>
                <h2 className="type-h4 mt-1">
                  Designed for capable project teams.
                </h2>
              </div>
            </div>
            <p className="type-body-sm mt-5 text-white/68">
              TEVORA supports partners with product knowledge, technical
              resources and project coordination so opportunities move from
              enquiry to specification with more confidence.
            </p>
            <dl className="mt-6 grid grid-cols-3 border-y border-white/14">
              {heroStats.map((stat) => (
                <div key={stat.label} className="py-4 pr-4">
                  <dt className="type-model text-white/48">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 grid gap-2">
              {[
                "Product training",
                "Technical resources",
                "Project guidance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2
                    aria-hidden
                    className="size-4 text-emerald-300"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section id="programme" className="py-10 md:py-12">
        <Container>
          <CompactHeader
            eyebrow="Partnership"
            title="A clearer way to sell, specify and deliver TEVORA projects."
            description="The programme connects local capability with TEVORA product architecture, documentation and technical support."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-3">
            {programmePillars.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-surface p-5">
                <Icon aria-hidden className="text-accent size-5" />
                <h2 className="type-h4 mt-4">{title}</h2>
                <p className="type-body-sm text-ink-muted mt-2">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" className="py-10 md:py-12">
        <Container>
          <CompactHeader
            eyebrow="Why Partner"
            title="What partners can use immediately."
            description="Practical support for commercial conversations, specification work and project delivery."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2 lg:grid-cols-3">
            {visibleBenefits.map((benefit) => (
              <div
                key={benefit}
                className="bg-surface flex min-h-20 items-center gap-3 p-4"
              >
                <BadgeCheck
                  aria-hidden
                  className="text-accent size-5 shrink-0"
                />
                <p className="font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-10 md:py-12">
        <Container>
          <div className="grid gap-7 lg:grid-cols-[20rem_1fr] lg:items-start">
            <CompactHeader
              eyebrow="Programme Fit"
              title="Who should apply?"
              description="Organisations active in AV, furniture, specification, distribution or specialist technology projects."
            />
            <div className="flex flex-wrap gap-2.5">
              {partnerAudiences.map((audience) => (
                <span
                  key={audience}
                  className="border-line bg-surface border px-3.5 py-2 text-sm font-semibold"
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="partner-types" tone="muted" className="py-10 md:py-12">
        <Container>
          <CompactHeader
            eyebrow="Partner Routes"
            title="Choose the route that matches your business."
            description="Apply for one or multiple routes. TEVORA will review market fit and capability before onboarding."
          />
          <div className="border-line bg-line grid gap-px border md:grid-cols-2 xl:grid-cols-3">
            {partnerTypeContent.map((type) => (
              <article key={type.id} id={type.id} className="bg-surface p-5">
                <p className="type-series text-accent">{type.name}</p>
                <h2 className="mt-3 text-xl leading-tight font-semibold">
                  {type.description}
                </h2>
                <dl className="mt-5 grid gap-3 text-sm">
                  <Fact label="Best fit" value={type.idealOrganisation} />
                  <Fact label="Capability" value={type.capabilities} />
                </dl>
                <Link
                  href={`${routes.partnerApply}?type=${type.id}` as never}
                  className="motion-link mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold"
                >
                  Apply for this route
                  <ArrowRight aria-hidden className="motion-arrow size-4" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark" className="py-10 md:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <CompactHeader
              eyebrow="Selection"
              title="What makes a strong application."
              description="TEVORA looks for real market access, technical credibility, project capability and the ability to represent a premium product portfolio."
              dark
            />
            <div className="grid gap-px bg-white/16 md:grid-cols-2">
              {visibleRequirements.map((item, index) => (
                <div
                  key={item}
                  className="bg-brand-950 flex min-h-16 items-center gap-4 p-4"
                >
                  <span className="type-model text-emerald-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-10 md:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <CompactHeader
                eyebrow="Partner Journey"
                title="A simple path to activation."
                description="A practical review process keeps the conversation clear and avoids unnecessary steps."
              />
              <ol className="border-line bg-line grid gap-px border">
                {partnerJourney.slice(0, 5).map((step, index) => (
                  <li
                    key={step}
                    className="bg-surface grid min-h-14 items-center gap-4 p-4 sm:grid-cols-[3rem_1fr]"
                  >
                    <span className="type-model text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <CompactHeader
                eyebrow="Partner Support"
                title="Support areas."
                description="Support is matched to partner type, region and the projects being developed."
              />
              <div className="border-line bg-line grid gap-px border sm:grid-cols-2">
                {visibleSupport.map((item) => (
                  <div
                    key={item}
                    className="bg-surface flex min-h-14 items-center justify-between gap-3 p-4"
                  >
                    <span className="text-sm font-semibold">{item}</span>
                    <ArrowRight aria-hidden className="text-accent size-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="border-accent bg-accent-light mt-6 border-l-2 p-4 text-sm">
            Submitting an application does not guarantee acceptance. TEVORA
            reviews every application based on market requirements, business
            capability and strategic fit.
          </p>
        </Container>
      </Section>

      <Section tone="white" className="py-10 md:py-12">
        <Container size="narrow">
          <CompactHeader
            eyebrow="Questions"
            title="Partner programme FAQs."
            description="Quick answers before beginning the application."
          />
          <Accordion items={partnerFaqs} />
        </Container>
      </Section>

      <Section tone="dark" className="py-10 md:py-12">
        <Container>
          <div className="grid items-center gap-6 border border-white/18 bg-white/[0.04] p-6 md:grid-cols-[1fr_auto] md:p-7">
            <div>
              <Eyebrow className="text-emerald-300">Partner Network</Eyebrow>
              <h2 className="type-h3 mt-4 max-w-3xl text-balance">
                Ready to discuss a TEVORA partnership?
              </h2>
              <p className="type-body-sm mt-3 max-w-2xl text-white/68">
                Share your organisation profile, market focus and capability.
                TEVORA will review the fit and next steps.
              </p>
            </div>
            <PrimaryButton asChild className="text-brand-950! bg-white!">
              <Link href={routes.partnerApply as never}>
                Apply to Become a Partner
                <ArrowRight aria-hidden className="motion-arrow size-4" />
              </Link>
            </PrimaryButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function CompactHeader({
  eyebrow,
  title,
  description,
  dark,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <header className="border-line mb-6 border-t pt-4">
      <Eyebrow className={dark ? "text-emerald-300" : undefined}>
        {eyebrow}
      </Eyebrow>
      <h2 className="type-h3 mt-3 max-w-3xl text-balance">{title}</h2>
      {description && (
        <p
          className={`type-body-sm mt-3 max-w-2xl ${
            dark ? "text-white/68" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="type-spec-label text-ink-muted">{label}</dt>
      <dd className="text-ink-muted mt-1">{value}</dd>
    </div>
  );
}
