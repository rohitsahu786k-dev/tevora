# TEVORA launch checklist

Status date: 13 July 2026  
Decision: **NO-GO until all Blocked items are resolved.**

`Ready` means the repository implementation is present and tested. `Review` needs an authorised business, legal, technical or brand decision. `Blocked` needs an external asset, credential, service or approved content.

| Area                   | Status  | Launch requirement                                                                                                                       |
| ---------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Trademark review       | Blocked | Obtain clearance for TEVORA, the symbol, product-family names and every series name in target markets.                                   |
| Domain                 | Blocked | Acquire and approve the canonical production domain.                                                                                     |
| Social handles         | Review  | Reserve approved handles or confirm that no social profiles will launch.                                                                 |
| Logo                   | Blocked | Replace the provisional typographic SVGs and symbol with approved master artwork and usage variants.                                     |
| Brand guidelines       | Blocked | Approve wordmark clear space, minimum size, colour, co-branding and parent-endorsement rules.                                            |
| Product names          | Review  | Complete legal and commercial approval of all family and series names.                                                                   |
| Product specifications | Blocked | Engineering must approve dimensions, loads, capacities, compatibility, ventilation, service access and installation data.                |
| Product photography    | Blocked | Supply rights-cleared cutouts, details and environment photography with alt text and credits.                                            |
| Product renders        | Blocked | Supply approved renders that accurately represent production products.                                                                   |
| CAD                    | Blocked | Publish checked drawings with revision and access metadata.                                                                              |
| BIM                    | Blocked | Publish checked objects with revision and supported-software metadata.                                                                   |
| STEP files             | Blocked | Publish checked models with revision and access metadata.                                                                                |
| Brochures              | Blocked | Supply approved, versioned files.                                                                                                        |
| Technical data sheets  | Blocked | Supply engineering-approved, versioned files.                                                                                            |
| CMS                    | Blocked | Create the Sanity project/dataset, migrate approved content, set production to `CMS_MODE=sanity`, and test preview/publishing/redirects. |
| Forms                  | Blocked | Connect real delivery adapters, configure abuse protection, test attachments, failure paths and retention.                               |
| CRM                    | Blocked | Select provider, map consent and project fields, authenticate and verify delivery.                                                       |
| Email delivery         | Blocked | Configure sending domain, templates, recipients, SPF, DKIM and DMARC; test bounces and alerts.                                           |
| Analytics              | Blocked | Approve provider and consent model, configure ID, events, retention and access.                                                          |
| SEO                    | Review  | Set the real canonical URL, migrate verified indexable content, validate schema, sitemap, robots and social cards.                       |
| Accessibility          | Review  | Complete browser axe, keyboard-only, VoiceOver/NVDA, 200% zoom and representative user testing.                                          |
| Performance            | Review  | Run Lighthouse/WebPageTest on the deployed build with real media and integrations; approve budgets.                                      |
| Security               | Blocked | Complete dependency, headers, secrets, upload, CMS-role and penetration review; resolve or accept Sanity advisories.                     |
| Privacy policy         | Blocked | Obtain approved policy and publish a real route before restoring the footer link.                                                        |
| Cookie policy          | Blocked | Obtain approved policy and implement consent controls if non-essential storage is enabled.                                               |
| Terms                  | Blocked | Obtain approved terms and publish a real route before restoring the footer link.                                                         |
| Domain configuration   | Blocked | Configure DNS, TLS, redirects, canonical host, email records and monitoring.                                                             |
| Deployment             | Blocked | Select production host, set environment variables, configure logs/alerts and complete a release rehearsal.                               |
| Backup                 | Blocked | Configure and test Sanity dataset export plus deployment/configuration backup.                                                           |
| Rollback               | Blocked | Document and rehearse application rollback, content rollback and DNS recovery.                                                           |

## Repository checks

- [x] Brand name, descriptor and line are central settings and have launch-contract tests.
- [x] OnePWS endorsement is configurable and hidden by default.
- [x] Unapproved projects and resources are excluded from public browsers, search, relationships and project detail generation.
- [x] Form delivery fails closed while adapters are unconfigured.
- [x] Unsupported specifications, compatibility and claim fields remain blank and noindex.
- [x] Keyboard, focus, reduced-motion and semantic component contracts are covered by automated tests.
- [ ] Replace representative media and provisional logo assets.
- [ ] Replace local draft content with verified CMS records.
- [ ] Add approved legal routes and footer links.
- [ ] Complete human accessibility, performance, security and content QA.
