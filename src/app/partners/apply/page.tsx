import { Suspense } from "react";
import { PartnerApplicationForm } from "@/components/forms/partner-application-form";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Apply to Become a Partner",
  description:
    "Submit an organisation and capability application for the TEVORA Partner Network.",
  path: routes.partnerApply,
});

export default function PartnerApplyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section tone="dark" className="pb-16!">
        <Container>
          <Eyebrow className="text-emerald-300">TEVORA Partner Network</Eyebrow>
          <h1 className="type-h1 mt-7 max-w-5xl text-balance">
            Partner application.
          </h1>
          <p className="type-body-lg mt-7 max-w-3xl text-white/75">
            Tell us about your organisation, market coverage, technical
            capability and programme expectations. Submission begins a selective
            business review and does not guarantee approval.
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="border-accent bg-accent-light mb-12 border-l-2 p-5">
            <h2 className="font-semibold">Draft privacy</h2>
            <p className="type-body-sm mt-2 max-w-4xl">
              Save limited draft stores only programme choices, sectors, product
              interests and capability selections on this device. It never
              stores contact details, registration or revenue data, brand
              relationships, project references, document names or uploads.
              Secure server-side encrypted drafts require a future application
              database and applicant authentication.
            </p>
          </div>
          <Suspense
            fallback={
              <div
                className="bg-surface-muted min-h-[40rem] animate-pulse motion-reduce:animate-none"
                aria-label="Loading partner application"
              />
            }
          >
            <PartnerApplicationForm />
          </Suspense>
        </Container>
      </Section>
    </main>
  );
}
