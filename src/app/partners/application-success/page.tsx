import Link from "next/link";
import { Check } from "lucide-react";
import { getPartnerApplicationReceipt } from "@/app/partners/application-success/actions";
import { partnerTypeContent } from "@/content/partners";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Partner Application Submitted",
  description: "TEVORA Partner Network application confirmation.",
  path: routes.partnerApplicationSuccess,
  noIndex: true,
});

export default async function PartnerApplicationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference = "" } = await searchParams;
  const receipt = reference
    ? await getPartnerApplicationReceipt(reference)
    : null;
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container size="narrow">
          <div className="border-accent border-l-2 pl-6 md:pl-10">
            <Check aria-hidden className="text-accent size-8" />
            <Eyebrow className="mt-8">TEVORA Partner Network</Eyebrow>
            <h1 className="type-h1 mt-6">Application submitted for review.</h1>
            <p className="type-body-lg text-ink-muted mt-7">
              Thank you for your interest in the TEVORA Partner Network. Your
              application has been submitted for review. Our team will assess
              your company profile, market coverage and strategic fit before
              contacting you regarding the next stage.
            </p>
          </div>

          <dl className="border-line mt-12 border-y">
            <ReceiptRow
              label="Application reference"
              value={
                (receipt?.reference ?? reference) ||
                "Available in the confirmation email"
              }
            />
            {receipt && (
              <>
                <ReceiptRow
                  label="Applicant company"
                  value={receipt.companyName}
                />
                <ReceiptRow
                  label="Primary contact"
                  value={receipt.primaryContactName}
                />
                <ReceiptRow
                  label="Submitted"
                  value={new Intl.DateTimeFormat("en", {
                    dateStyle: "long",
                  }).format(new Date(receipt.submittedAt))}
                />
                <ReceiptRow
                  label="Selected partner type"
                  value={receipt.partnerTypes
                    .map(
                      (id) =>
                        partnerTypeContent.find((type) => type.id === id)
                          ?.name ?? id,
                    )
                    .join(", ")}
                />
              </>
            )}
          </dl>

          <section className="mt-12">
            <h2 className="type-h3">What happens next</h2>
            <ol className="border-line bg-line mt-6 grid gap-px border sm:grid-cols-3">
              {[
                "Initial business review",
                "Capability and market assessment",
                "Further information or discussion, where appropriate",
              ].map((item, index) => (
                <li key={item} className="bg-surface min-h-40 p-5">
                  <span className="type-model text-accent">0{index + 1}</span>
                  <p className="mt-8 text-sm font-semibold">{item}</p>
                </li>
              ))}
            </ol>
            <p className="type-caption text-ink-muted mt-5">
              No response time, territory, commercial term or approval is
              promised. Any relationship requires formal approval and a separate
              written agreement.
            </p>
          </section>

          <div className="mt-12 flex flex-wrap gap-3">
            <PrimaryButton asChild>
              <Link href={routes.products}>Explore Products</Link>
            </PrimaryButton>
            <SecondaryButton asChild>
              <Link href={routes.resources}>Resources</Link>
            </SecondaryButton>
            <SecondaryButton asChild>
              <Link href={routes.contact}>Contact</Link>
            </SecondaryButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-line grid gap-2 border-b py-5 last:border-0 sm:grid-cols-[12rem_1fr]">
      <dt className="type-spec-label text-ink-muted">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
