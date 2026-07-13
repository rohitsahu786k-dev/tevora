# TEVORA QA report

Date: 13 July 2026

## Issues found

- Media had no central category, format, crop, focal-point or aspect-ratio contract.
- The broken-image component did not support captions, credits, mobile art direction or registered blur data.
- There was no automated check for missing assets, alt text, duplicates, file size, aspect ratios or broken references.
- Most routes inherited generic metadata and did not publish canonical, Open Graph or Twitter data.
- Sitemap, robots rules, preview noindex headers and structured data were absent.
- Product and project pages had no structured-data safeguards against unsupported commercial or claim fields.
- 3D placeholders were static rather than interaction-loaded.
- The configured favicon path did not exist.
- Draft project and resource records were visible in public browsers, related content and search.
- Newsletter, partner-access and legal links exposed non-functional launch placeholders.
- The project form could report success through no-op delivery adapters.

## Issues fixed

- Added typed media categories, standard ratios and PNG/JPG/WebP/AVIF, MP4/WebM and GLB/USDZ format contracts.
- Added responsive media with focal points, mobile art direction, blur placeholders, captions, credits, lazy loading and runtime fallbacks.
- Added accessible video and interaction-loaded dynamic 3D boundaries.
- Added a CI-capable media audit and tests. The current registry passes with no errors or warnings.
- Added unique static-page metadata plus canonical, Open Graph, Twitter and robots directives.
- Added dynamic sitemap and robots routes. Placeholder entities are noindex and excluded from the sitemap.
- Added Organisation, Breadcrumb, Product and Project/CreativeWork structured data.
- Product structured data deliberately omits offers, price, availability, reviews, ratings and certifications.
- Added preview `X-Robots-Tag` handling and CMS-backed redirect loading.
- Repointed the favicon to the existing brand symbol.
- Confirmed existing keyboard, focus, landmark, form, menu, dialog, reduced-motion, filter, accordion and specification-table contracts.
- Excluded unapproved projects and resource files from public browsers, search, relationships and project route generation.
- Removed non-functional newsletter, partner-access and legal-link affordances from the public footer.
- Made project enquiries fail closed until real delivery adapters and the production enable flag are both present.
- Added launch-facing brand, navigation, publication and parent-endorsement tests.

## Remaining risks

- Automated accessibility coverage is contract-based; browser-level axe, screen-reader and keyboard regression testing is still required before launch.
- Lighthouse and Web Vitals need measuring against a deployed production build with real media and third-party services.
- Several legacy page compositions still use `next/image` directly. They are responsive and optimized, but should move to the media registry as real assets replace placeholders.
- Sanity Studio adds a substantial isolated dependency graph and currently reports 12 moderate transitive npm advisories. Do not use a forced breaking upgrade without review.
- The embedded Studio currently emits non-blocking Node `--localstorage-file` warnings while Next.js collects static page data. Public routes still build successfully; monitor upstream Sanity/Node releases.
- CMS redirects are loaded during configuration only when Sanity mode and credentials are present; deployment pipelines must allow that read.

## Missing content

- All product, accessory, space, sector, project and resource records remain draft data; unapproved project and resource records are no longer publicly listed.
- No verified dimensions, capacities, compatibility, certification, compliance, sustainability, availability or pricing data is published.
- Project client names, outcomes and testimonials remain intentionally absent.
- Legal company, regional contact and social information still requires production approval.

## Missing media

- No approved product cutouts, family heroes, detail photography, finish swatches, diagrams, project media, video, 360 sequences or 3D models are available.
- The two current PNGs are representative images, not approved product photography. Dedicated 4:5 mobile crops have not been supplied.
- Video captions/transcripts, poster frames, GLB/USDZ assets and 3D poster images remain pending.
- Final image ownership, captions and credits require confirmation.

## Missing credentials and integrations

- Sanity project ID, dataset access token and preview secret.
- Production site URL and analytics configuration.
- CRM, email, file-storage and spam-protection adapters.
- Search, PDF, CAD, 3D, BOQ, pricing and cloud-rendering providers.
- Approved privacy, cookie and terms documents and their public routes.
- Approved logo masters, production domain, regional contact details and legal-company details.

## Recommended next steps

1. Replace placeholder content and media through the verified Sanity publishing workflow.
2. Produce approved desktop and 4:5 mobile crops, modern WebP/AVIF derivatives, video posters and accessible transcripts.
3. Run browser-based axe, VoiceOver/NVDA, keyboard-only and 200% zoom checks across every template.
4. Run Lighthouse and WebPageTest against preview and production deployments, then set performance budgets from measured data.
5. Validate structured data and social previews on verified product and project records.
6. Configure production credentials, redirects and service adapters, then test failure and recovery paths.
7. Complete every blocked item in `docs/LAUNCH-CHECKLIST.md` before a public release.
