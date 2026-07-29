import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { requestLoginAccess } from "@/app/login/actions";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "TEVORA Login",
  description:
    "Sign in or request access to TEVORA technical downloads using a TEVORA-issued account ID.",
  path: routes.login,
});

export default function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string; reference?: string }>;
}) {
  return <LoginContent searchParams={searchParams} />;
}

async function LoginContent({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string; reference?: string }>;
}) {
  const params = await searchParams;
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>TEVORA Login</Eyebrow>
              <h1 className="type-h1 mt-7">
                Access technical downloads with your TEVORA ID.
              </h1>
              <p className="type-body-lg text-ink-muted mt-7">
                Product files, drawings and project documentation are available
                to approved users with a TEVORA-issued login.
              </p>
              <div className="border-accent bg-accent-light mt-9 border-l-2 p-5">
                <p className="type-body-sm">
                  If you do not have a TEVORA ID yet, submit your company
                  details and the access team can review the request.
                </p>
              </div>
              <div className="glass-panel-strong mt-5 p-5">
                <p className="type-spec-label text-accent">Test login</p>
                <dl className="type-body-sm text-ink-muted mt-4 grid gap-2">
                  <div>
                    <dt className="text-ink font-semibold">Work email</dt>
                    <dd>demo@tevora.design</dd>
                  </div>
                  <div>
                    <dt className="text-ink font-semibold">TEVORA ID</dt>
                    <dd>TEVORA-DEMO-2026</dd>
                  </div>
                  <div>
                    <dt className="text-ink font-semibold">Company</dt>
                    <dd>TEVORA Demo</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="lg:col-span-7">
              <LoginPanel
                status={params?.status}
                reference={params?.reference}
              />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function LoginPanel({
  status,
  reference,
}: {
  status?: string;
  reference?: string;
}) {
  const message =
    status === "success"
      ? `Access request saved. Reference: ${reference}`
      : status === "demo"
        ? "Demo TEVORA ID confirmed. Return to Resources to review the signed-in state."
        : status === "database"
          ? "The TEVORA login database is not connected yet. Configure DATABASE_URL to enable account access."
          : status === "invalid"
            ? "Please enter a valid work email, company and TEVORA ID."
            : status === "error"
              ? "The login request could not be saved. Please try again when access support is available."
              : "";
  return (
    <div className="glass-panel-strong p-6 sm:p-8">
      <LockKeyhole aria-hidden className="text-accent size-6" />
      <h2 className="type-h3 mt-5">Sign in or request access</h2>
      <p className="type-body-sm text-ink-muted mt-3">
        Enter a TEVORA-issued ID for technical download access. Use the test
        login on this page to confirm the signed-in resource flow locally.
      </p>
      {message && (
        <div
          role="status"
          className="glass-control border-accent/70 mt-6 border-l-2 p-4"
        >
          <p className="type-body-sm">{message}</p>
        </div>
      )}
      <form action={requestLoginAccess} className="mt-8 grid gap-5">
        <label>
          <span className="type-spec-label block">Work email</span>
          <input
            name="workEmail"
            type="email"
            autoComplete="email"
            required
            className="glass-control focus:border-accent mt-2 min-h-12 w-full px-4 outline-none"
          />
        </label>
        <label>
          <span className="type-spec-label block">TEVORA ID</span>
          <input
            name="tevoraId"
            autoComplete="one-time-code"
            required
            className="glass-control focus:border-accent mt-2 min-h-12 w-full px-4 outline-none"
          />
        </label>
        <label>
          <span className="type-spec-label block">Company</span>
          <input
            name="company"
            autoComplete="organization"
            required
            className="glass-control focus:border-accent mt-2 min-h-12 w-full px-4 outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-3 pt-2">
          <PrimaryButton type="submit">Request access</PrimaryButton>
          <SecondaryButton asChild>
            <Link href={routes.resources}>Browse resources</Link>
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
}
