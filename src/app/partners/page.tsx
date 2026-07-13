import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageReveal, ViewportReveal } from "@/components/motion";
import { ResponsiveMedia } from "@/components/media/responsive-media";
import { Accordion } from "@/components/ui/disclosure";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
  TextLink,
} from "@/components/ui/system";
import {
  partnerAudiences,
  partnerBenefits,
  partnerFaqs,
  partnerJourney,
  partnerRequirements,
  partnerSupport,
  partnerTypeContent,
} from "@/content/partners";
import { mediaAssets } from "@/content/media";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Partner Network",
  description:
    "Apply to join TEVORA's network of AV integrators, consultants, dealers, distributors and project specialists.",
  path: routes.partners,
});

export default function PartnersPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="bg-brand-950 overflow-hidden text-white">
        <Container className="grid min-h-[44rem] items-end gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <ViewportReveal className="lg:col-span-6">
            <Eyebrow className="text-emerald-300">
              TEVORA Partner Network
            </Eyebrow>
            <h1 className="type-hero mt-7 text-balance">
              Build better technology spaces with TEVORA.
            </h1>
            <p className="type-body-lg mt-7 max-w-2xl text-white/75">
              Join a growing network of AV integrators, consultants, dealers,
              distributors and project specialists delivering
              technology-integrated furniture across education, enterprise and
              specialist environments.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryButton asChild className="text-brand-950! bg-white!">
                <Link href={routes.partnerApply as never}>
                  Apply to Become a Partner
                </Link>
              </PrimaryButton>
              <SecondaryButton
                asChild
                className="hover:text-brand-950 border-white/60 text-white hover:bg-white"
              >
                <Link href="#programme">Explore the Partner Programme</Link>
              </SecondaryButton>
            </div>
          </ViewportReveal>
          <ImageReveal className="lg:col-span-5 lg:col-start-8">
            <ResponsiveMedia
              asset={mediaAssets.homepageHero}
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="[&_div]:aspect-[4/5]!"
            />
          </ImageReveal>
        </Container>
      </section>

      <Section id="programme">
        <Container>
          <SectionHeader
            eyebrow="Partnership"
            title="Local capability. Shared product architecture."
            description="TEVORA partners combine local market knowledge, technical capability and project expertise with TEVORA’s product platforms, engineering support and design resources."
          />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Why Partner"
            title="A programme built around capable project organisations."
            description="Partner support may include the following, subject to programme level, region, approval and written agreement."
          />
          <div className="border-line grid border-t md:grid-cols-2 lg:grid-cols-3">
            {partnerBenefits.map((benefit, index) => (
              <div
                key={benefit}
                className="border-line border-b p-6 md:border-r"
              >
                <span className="type-model text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="type-h4 mt-8">{benefit}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Programme Fit"
            title="Who the programme is for."
          />
          <div className="border-line flex flex-wrap gap-x-10 gap-y-5 border-y py-8">
            {partnerAudiences.map((audience) => (
              <span key={audience} className="type-body-lg">
                {audience}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Partner Types"
            title="Different routes into the network."
            description="Organisations may apply for more than one partner type and should identify their primary interest."
          />
          <div className="bg-line border-line grid gap-px border lg:grid-cols-2">
            {partnerTypeContent.map((type) => (
              <article
                key={type.id}
                id={type.id}
                className="group bg-surface p-7 md:p-9"
              >
                <p className="type-series text-accent">{type.name}</p>
                <h2 className="type-h3 mt-5">{type.description}</h2>
                <dl className="mt-8 grid gap-4 text-sm">
                  <div>
                    <dt className="type-spec-label text-ink-muted">
                      Ideal organisation
                    </dt>
                    <dd className="mt-1">{type.idealOrganisation}</dd>
                  </div>
                  <div>
                    <dt className="type-spec-label text-ink-muted">
                      Typical capabilities
                    </dt>
                    <dd className="mt-1">{type.capabilities}</dd>
                  </div>
                  <div>
                    <dt className="type-spec-label text-ink-muted">
                      Typical customer base
                    </dt>
                    <dd className="mt-1">{type.customerBase}</dd>
                  </div>
                </dl>
                <TextLink
                  href={`${routes.partnerApply}?type=${type.id}` as never}
                  className="mt-8"
                >
                  Apply for this partner type
                </TextLink>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <SectionHeader eyebrow="Selection" title="What TEVORA looks for." />
          <ol className="border-t border-white/20">
            {partnerRequirements.map((item, index) => (
              <li
                key={item}
                className="grid min-h-20 items-center border-b border-white/20 py-4 sm:grid-cols-[5rem_1fr]"
              >
                <span className="type-model text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="type-h4">{item}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Partner Journey"
            title="A considered route from application to onboarding."
          />
          <ol className="bg-line border-line grid gap-px border md:grid-cols-4">
            {partnerJourney.map((step, index) => (
              <li key={step} className="bg-canvas min-h-44 p-6">
                <span className="type-model text-accent">0{index + 1}</span>
                <p className="type-h4 mt-10">{step}</p>
              </li>
            ))}
          </ol>
          <p className="border-accent bg-accent-light mt-8 border-l-2 p-5 text-sm">
            Submitting an application does not guarantee acceptance. TEVORA
            reviews every application based on market requirements, business
            capability and strategic fit.
          </p>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Partner Support"
            title="Resources to support specification and delivery."
            description="Support is subject to partner type, region, programme level and written agreement."
          />
          <div className="grid gap-x-10 md:grid-cols-2">
            {partnerSupport.map((item) => (
              <div
                key={item}
                className="border-line flex min-h-16 items-center justify-between border-t"
              >
                <span className="font-semibold">{item}</span>
                <ArrowRight aria-hidden className="text-accent size-4" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <SectionHeader eyebrow="Questions" title="Partner programme FAQs." />
          <Accordion items={partnerFaqs} />
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow className="text-emerald-300">Partner Network</Eyebrow>
              <h2 className="type-section mt-7">Ready to grow with TEVORA?</h2>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <PrimaryButton asChild className="text-brand-950! bg-white!">
                <Link href={routes.partnerApply as never}>
                  Apply to Become a Partner{" "}
                  <ArrowRight aria-hidden className="motion-arrow size-4" />
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
