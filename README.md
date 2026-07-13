# TEVORA website

Production-oriented website for TEVORA Technology Furniture. The repository includes the full route architecture, custom interface system, product and market taxonomies, configuration and compatibility frameworks, Sanity integration, search, forms, SEO, media and quality tooling. Public launch still requires approved product content, brand assets, media, legal documents and production integrations; see `docs/LAUNCH-CHECKLIST.md`.

## Stack

Next.js App Router, React, strict TypeScript, Tailwind CSS, shadcn/ui conventions, Motion for React, Lucide React, Zod, React Hook Form, `next/font`, and `next/image`-ready media utilities. ESLint, Prettier, and Vitest provide quality tooling.

## Architecture

```text
src/
  app/                  App Router pages, boundaries and metadata
  components/
    layout/ ui/         shared shell and shadcn-style primitives
    navigation/ forms/ configuration/ search/
    products/ product-families/ accessories/
    spaces/ sectors/ projects/ resources/
  config/brand.ts       global brand and endorsement settings
  content/index.ts      typed local content source
  lib/
    analytics/ cms/ media/ seo/ validation/ constants/
    data.ts             reusable content access
    routes.ts           type-safe route construction
  types/content.ts      domain contracts
  tests/                unit tests
public/brand/           replaceable brand assets
```

Server Components are the default. Client Components are limited to interactive UI, such as the contact form and configuration transition. Dynamic content routes statically enumerate known slugs and use the shared not-found boundary for missing content.

## Install and develop

Requires a maintained Node.js LTS release and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Useful commands:

```bash
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
npm run start
```

## Environment variables

| Variable                               | Required   | Purpose                                                |
| -------------------------------------- | ---------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                 | Production | Canonical metadata base URL                            |
| `NEXT_PUBLIC_ANALYTICS_ID`             | No         | Future analytics provider ID                           |
| `PROJECT_ENQUIRY_DELIVERY_ENABLED`     | Forms      | Enables MongoDB, Cloudinary, and SMTP enquiry delivery |
| `PARTNER_APPLICATION_DELIVERY_ENABLED` | Forms      | Enables persisted partner application delivery         |
| `CMS_MODE`                             | Production | `sanity`; `local` is development-only                  |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`        | CMS mode   | Public Sanity project identifier                       |
| `NEXT_PUBLIC_SANITY_DATASET`           | CMS mode   | Dataset name, normally `production`                    |
| `NEXT_PUBLIC_SANITY_STUDIO_URL`        | No         | Studio URL, defaults to `/studio`                      |
| `NEXT_PUBLIC_SANITY_VISUAL_EDITING`    | No         | Mount visual editing support when `true`               |
| `SANITY_API_VERSION`                   | No         | Pinned API date                                        |
| `SANITY_API_READ_TOKEN`                | Preview    | Server-only token for draft content                    |
| `SANITY_PREVIEW_SECRET`                | Preview    | Server-only draft-mode URL secret                      |
| `DATABASE_URL`                         | Forms      | Server-only MongoDB connection string                  |
| `MONGODB_DATABASE`                     | No         | MongoDB database name; defaults to `tevora`            |
| `CLOUDINARY_URL`                       | Forms      | Server-only Cloudinary API connection URL              |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`    | Media      | Public Cloudinary cloud name                           |
| `SMTP_USER` / `SMTP_PASSWORD`          | Forms      | Server-only SMTP credentials                           |
| `EMAIL_FROM`                           | No         | Verified sender; defaults to `SMTP_USER`               |
| `INTERNAL_NOTIFICATION_EMAIL`          | Forms      | Recipient for enquiry and application alerts           |

Never expose the read token or preview secret through a `NEXT_PUBLIC_` variable.
Keep database, Cloudinary API, and SMTP credentials server-only and out of Git.

## Brand settings

Edit `src/config/brand.ts` for the name, descriptor, brand line, description, logos, symbol, favicon, colours, contact details, social links, legal name, region, language, and SEO defaults. Components consume this configuration instead of repeating brand values.

Replace the provisional assets in `public/brand` with approved masters before launch. The CSS colour, type, spacing, radius and motion tokens live in `src/app/globals.css`.

## Design system

The custom TEVORA system is documented live at `/design-system`. Its semantic tokens and typography roles live in `src/app/globals.css`; reusable primitives are exported from `src/components/ui/index.ts`.

The system uses Geist and Geist Mono through `next/font`. Prefer semantic surface utilities such as `bg-canvas`, `bg-surface`, `text-graphite`, `text-ink-muted`, `border-line`, and `text-accent` over raw colour values. Product and layout composition should use `Container`, `Section`, `SectionHeader`, and `ResponsiveGrid` to preserve alignment.

Interactive controls provide visible focus states and minimum touch targets. Modal and drawer components manage initial focus, trap keyboard focus, restore focus to their trigger, lock background scrolling, and close with Escape. All new animation must remain restrained and respect `prefers-reduced-motion`.

## Content structure

Local seed content lives in `src/content/index.ts` and implements contracts from `src/types/content.ts`. The shared access layer in `src/lib/data.ts` isolates routes from the storage mechanism.

The domain layer includes complete models for brand settings, product families, products, accessories, spaces, sectors, projects and resources, plus shared media, download, specification, finish, feature, CTA, quote, metric, compatibility, navigation, filter and contact models. Matching Zod schemas live in `src/lib/validation/content.ts`.

All initial records use `dataStatus: "placeholder"` internally. Draft entity SEO is marked `noIndex`, and validation rejects product certifications, standards, sustainability claims, dimensions, capacities and compatibility claims on draft products. It also rejects accessory specifications or compatibility rules and project client names, testimonials or outcomes until records enter a verified publishing workflow. Unapproved projects and resources are excluded from public browsers, search and relationships.

Space and sector relationships live in `src/content/relationships.ts`. Query and recommendation helpers in `src/lib/content/relationships.ts` provide related products, accessories, spaces and sectors, scored recommendations and filter generation. Navigation helpers generate entity breadcrumbs and canonical URLs. `npm run validate` checks both model content and every relationship reference.

To add content:

1. Add a unique, URL-safe entry to the corresponding typed array.
2. For a product, set `family` to an existing product-family slug and provide feature labels.
3. Add relevant media beneath `public` when visual design begins.
4. Run type checking and the production build; static parameters are generated from these collections.

This applies to product families, products, accessories, spaces, sectors, and projects. Resources use the same pattern and also require a supported `kind`.

## CMS strategy

Sanity Studio is embedded at `/studio` and configured by `sanity.config.ts`. Document and reusable-object definitions live in `sanity/schemaTypes`. The Studio includes hotspot/crop images with required alt text, structured portable text, references with inline creation disabled, cross-document duplicate-slug checks, revision history, content status, and scheduled-publishing readiness.

`src/lib/cms/adapter.ts` selects an explicit local or Sanity adapter. Local content is allowed only during development. Production defaults to Sanity and throws a clear configuration or response error; it never silently substitutes sample content. GROQ definitions in `src/lib/cms/queries.ts` use `defineQuery`, and generated query types can be refreshed with:

```bash
npm run cms:schema
npm run cms:typegen
```

Run the Studio with `npm run cms:dev`. Draft mode is enabled through `/api/draft/enable?secret=…&redirect=/desired-path` and disabled through `/api/draft/disable`. Draft reads require `SANITY_API_READ_TOKEN`. Visual editing is mounted only when `NEXT_PUBLIC_SANITY_VISUAL_EDITING=true`; keep it disabled until migrated pages render Sanity data and stega metadata end-to-end.

Content workflows:

- **Adding products:** create the product family first, add the product, generate its slug, choose a product status, and reference only reviewed spaces, sectors and accessories.
- **Updating specifications:** add items within named specification groups and enable `verified` only after technical review. Never place unverified values in editorial copy.
- **Adding accessories:** select the controlled accessory group and express compatibility through rules and references. Keep provisional or review states explicit.
- **Uploading resources:** upload the asset, set format, language, access level and current revision, then add a revision-history entry before republishing a replacement.
- **Adding projects:** leave client name, testimonial and outcomes empty until written publication approval exists. Reference published products, spaces and sectors.
- **Adding spaces and sectors:** create their taxonomy records, then connect recommendations through references rather than duplicated text.
- **Replacing images:** retain meaningful alt text and recheck hotspot/crop at desktop and mobile aspect ratios.
- **Previewing:** use the secret draft URL, review visual-editing overlays where enabled, and exit through `/api/draft/disable`.
- **Publishing:** resolve validation issues, confirm status and references, then publish immediately or use the scheduled-publishing field and configured scheduling service.
- **Creating redirects:** add a Redirect document with a leading-slash source, destination, permanence and active state. `getCmsRedirects` provides the deployment integration boundary.

Brand, homepage, company, design support, footer and SEO-default records are Studio singletons. The brand singleton exposes separate show/hide controls, parent name/logo, relationship text and endorsement controls; all parent-brand visibility defaults remain off.

## Adding shadcn/ui components

`components.json` is configured for the `@/components/ui` alias and Tailwind CSS variables. Add vetted primitives through the shadcn CLI, then keep brand-specific composition outside the primitive file.

## Deployment

Set production environment variables, run `npm run build`, and deploy the resulting Next.js application to a supported Node or serverless host. Configure the canonical domain through `NEXT_PUBLIC_SITE_URL`, use image-host allowlists when a CMS is introduced, and connect analytics through the isolated analytics module. CI should run lint, type checking, tests, formatting checks, and build.

## Future OnePWS endorsement

The parent relationship is intentionally hidden initially. `brandSettings` contains `parentBrandName`, `parentBrandVisibility`, and `parentBrandRelationshipText`; the footer demonstrates conditional consumption. The CMS singleton exposes the same controls to support “TEVORA by OnePWS” or “TEVORA — A OnePWS Company” without changing component architecture. Do not encode the parent name directly in presentation components.
