import { ContactForm } from "@/components/forms/contact-form";
import { Container, Eyebrow, Section } from "@/components/ui/system";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/routes";
export const metadata = createPageMetadata({
  title: "Discuss Your Project",
  description:
    "Share your space, technology requirements and project context with ONESPACE.",
  path: routes.contact,
});

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Discuss Your Project</Eyebrow>
              <h1 className="type-h1 mt-7">
                Start with the space and technology.
              </h1>
              <p className="type-body-lg text-ink-muted mt-7">
                Build a clear project brief for product selection, planning and
                technical follow-up.
              </p>
              <div className="border-accent bg-accent-light mt-9 border-l-2 p-5">
                <p className="type-body-sm">
                  Your draft is autosaved only on this device. Attachments are
                  not stored until submission.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
