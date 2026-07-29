# ONESPACE Partner Network implementation report

Date: 13 July 2026

## Routes created

- `/partners` — programme positioning, partner types, selection criteria, journey, potential support, FAQs and application CTAs.
- `/partners/apply` — accessible twelve-stage organisation application.
- `/partners/application-success` — noindex receipt and next-step page backed by an opaque application reference.

## Components and workflow

- Editorial partner programme page using the ONESPACE grid, imagery and motion language.
- Twelve-stage React Hook Form application with Zod client and server validation.
- Responsive progress navigation, previous/next controls, review/edit, print/PDF through the browser, repeated office locations and up to three project references.
- Multiple partner-type, sector and product-family selection.
- Accessible error summary, error focus management, live status announcements and reduced-motion step transitions.
- Document selector for PDF, DOCX, PPTX, JPG and PNG files. Documents remain in memory until submission.

The stages are Organisation, Primary Contact, Partner Type, Business Coverage, Market Experience, Technical Capability, Commercial Capability, Existing Brand Relationships, References and Experience, Programme Expectations, Declarations and Consent, and Review and Submit.

## Validation rules

- Required organisation, contact, programme-fit, market and declaration fields.
- Valid URLs, email address and four-digit year formats.
- The primary partner type must be one of the selected partner types.
- At least one partner type, product family, primary industry, preferred industry and preferred family.
- Conflict and territorial-commitment details become mandatory when disclosed.
- Up to ten offices, three project references and twelve documents.
- Files are limited to approved MIME/extension pairs and 15 MB each before antivirus scanning.
- Public email domains are accepted and produce an internal review flag, never an automatic rejection.
- A honeypot, provider-ready spam token and rate-limit adapter are validated on the server.

## Data-storage strategy

Applications are designed for a dedicated restricted database, not Sanity. The public success URL contains only an opaque `TVP-date-random` reference. Receipt details are retrieved server-side from the application database.

Until authenticated encrypted server drafts are configured, Save limited draft stores only programme types, product families, sectors, capability selections and non-sensitive programme preferences in local storage. It excludes names, emails, phones, addresses, registration and tax numbers, revenue selection, sales narrative, brand relationships, references, document names, files and declarations. The page explains this limitation before the form.

Production submission fails closed while `PARTNER_APPLICATION_DELIVERY_ENABLED` and secure adapters are unconfigured. Data is not silently logged, emailed or stored in Sanity.

## Integrations prepared

- Application database and duplicate detection
- Encrypted server draft storage
- Secure file storage and deletion
- Antivirus scanning
- CRM lead submission
- Applicant and internal email notification
- Regional assignment and workflow notification
- PDF application summary
- Audit log and consent log
- Rate limiting and spam protection
- Privacy-safe analytics

The abstractions can support Salesforce, HubSpot, Zoho CRM, Microsoft Dynamics, Supabase/PostgreSQL, S3, Google Cloud Storage, SharePoint and DocuSign without choosing a provider now. Confirmation, internal notification, missing-information and human-approved outcome email templates are included.

## Security and privacy measures

- Server-side schema validation repeats all client validation.
- Secure persistence, file scanning and consent logging complete before confirmation.
- CRM, email, workflow and PDF failures after persistence are recorded for retry and do not erase a valid stored application.
- Duplicate checks occur before reference creation.
- Analytics accept only step number, partner-type IDs, broad state, file count and error category. Names, contact details, registration numbers, revenue values and document names are not accepted by the analytics type.
- Internal score, reviewer, notes, risk flags, missing documents, next action and regional assignment are server-only structures.
- Scoring is editable, advisory and explicitly unable to approve or decline an applicant.
- No API credentials or provider secrets are referenced in client components.

Final rate limits, retention, encryption, deletion, access-control and incident-response settings require the selected infrastructure and approved privacy policy.

## CMS additions

Sanity now includes Partner programme page, Partner type, Partner benefit, Partner requirement, Partner FAQ, Partner journey step, Partner application settings, Partner region settings and Partner legal disclaimer schemas. Content managers can control public wording, regional availability and programme open/closed state. Sensitive application submissions are explicitly outside Sanity.

## Credentials and infrastructure required

- Restricted application database credentials and encryption/key-management configuration
- Secure object-storage credentials and signed-upload policy
- Antivirus/malware-scanning service
- Rate-limit store and CAPTCHA or privacy-preserving spam-control keys
- CRM credentials and field mapping
- Transactional email provider, verified sender domain and internal recipient routing
- Regional assignment/workflow endpoints
- PDF service if server-generated summaries are required
- Consent/audit-log retention store
- Production analytics provider identifier

## Legal and commercial policies requiring confirmation

- Partner programme availability by country and partner type
- Eligibility and business-verification policy
- Privacy notice, lawful basis, cross-border processing and applicant rights
- Data-retention and deletion periods
- Mandatory versus optional documents and sensitive identifiers
- Territory, exclusivity and channel-conflict policies
- Application fee policy
- Training, sample, showroom and customisation policies
- Project registration and lead-collaboration policy
- Commercial terms, credit checks and onboarding agreement
- Decline, waitlist, withdrawal and appeal/renewal handling
- Approved response language and service levels
- File-size, malware, backup and incident-response policies

No guarantee of territory, leads, exclusivity, margins, revenue, approval or certification has been added.

## Verification

- ESLint: passed without warnings
- Strict TypeScript: passed
- Vitest: 69 tests across 16 files passed
- Navigation accessibility contracts: 5 passed
- Prettier: passed
- Next.js production build: passed; 144 pages generated
- Production route smoke tests: all three partner routes returned HTTP 200

Tests cover complete and invalid applications, multiple partner types, conditional conflict disclosure, public-email review flags, internal/public statuses, editable advisory scoring, human-approved email outcomes, disabled-delivery fail-closed behaviour and resilience when CRM or email delivery fails after secure persistence.

The existing Sanity/Node worker warning for an empty `--localstorage-file` path remains non-blocking during static generation. Screen-reader/browser combinations, slow-network behaviour and real secure uploads require staging validation after the selected database, storage, malware-scanning and delivery providers are configured.
