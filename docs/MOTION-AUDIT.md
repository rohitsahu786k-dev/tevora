# TEVORA motion audit

Date: 13 July 2026

## Motion components created

- Central TypeScript and CSS tokens for durations, delays, stagger, easing, springs, distance, scale, blur and parallax.
- Shared fade, media, stagger and route variants.
- Motion providers scoped to animated client islands, with user-preference reduction.
- Reusable App Router page-transition wrapper plus native View Transitions progressive enhancement. The wrapper is intentionally not mounted at the root because a client boundary around all route content delayed streamed LCP; public routes use immediate App Router rendering and native support where available.
- Viewport reveal, stagger container and stagger item.
- Semantic masked heading and image reveal.
- Crossfade, soft-wipe, mask, zoom-settle and before/after image utilities.
- Sticky product story with active state, media crossfade and progress indicator.
- Keyboard, swipe and full-screen product gallery with focus restoration.
- Verified-only animated counter.
- Progressive SVG technical-line animation.
- Shared-element naming and progressive View Transitions utility.
- Reduced-motion and device-capability hooks.

## Pages and systems enhanced

- Global route continuity through native View Transitions where supported, plus section headings, footer entrance, loading boundaries and scroll progress.
- Sticky header height, contrast, border, mega menus and full-screen mobile navigation.
- Homepage hero media, masked headline, supporting content, actions, scroll cue and restrained scroll response.
- Homepage product-family, space and project panels through shared interaction classes.
- Products overview, family heroes, product cards, filter results and mobile filter drawer.
- Product-detail hero, media mask, sticky feature storytelling and accessible gallery.
- Spaces and sectors overview/detail entrances and progressive shared-element identifiers.
- Configure entry choices, recommendations, selection state, summary status and compatibility choices.
- Search overlay, results, empty/loading states and immediate input focus.
- Contact form step progression, errors, status and success state.
- Modal, drawer, accordion and tabs.
- Design-system Motion section with principles, timings, demonstrations and reduced-motion guidance.

## Reduced-motion behaviour

- Motion for React reads the user preference within each animated client island.
- Motion context is scoped to interactive client islands rather than the complete route tree, preserving immediate server rendering.
- Route translation, hero parallax, image scale, large movement and smooth programmatic scrolling are removed.
- Native view-transition animation is reduced to a one-millisecond state change.
- CSS hover transforms and skeleton pulses are disabled.
- Sticky-story content remains linear and every diagram, heading, image and state remains understandable without animation.
- No content or control waits for an animation before becoming available.

## Performance risks removed

- No GSAP, Lenis, custom cursor or additional runtime animation dependency was added.
- Scroll progress uses one throttled `requestAnimationFrame` and animates `transform: scaleX()` instead of width.
- No continuous animation loop, scroll-jacking, autoplay 360 view or autoplay media was introduced.
- Primary movement uses transform and opacity. Height animation is limited to accessible disclosure panels.
- Parallax is restricted to the homepage hero and derives from Motion scroll values.
- Sticky storytelling is disabled on limited-height screens and stays linear on mobile.
- Large blur and shadow animation, layout-changing card lift and physics-heavy bounce were avoided.
- The root loading fallback was removed because every public route is statically generated; it briefly replaced complete server-rendered content and added hero render delay without representing real data loading.
- The homepage hero asset uses a controlled image quality setting and responsive Next.js image output.

## Verification

Final local production audit using Lighthouse 13.4.0 mobile throttling:

- Performance: 92
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- First Contentful Paint: 0.9 seconds
- Largest Contentful Paint: 3.3 seconds
- Total Blocking Time: 60 milliseconds
- Cumulative Layout Shift: 0
- Speed Index: 2.2 seconds

The remaining Lighthouse performance variance is concentrated in hero heading/font rendering under simulated mobile throttling and framework JavaScript shared by the existing interactive navigation. No page content is animation-gated, and the delivered homepage HTML contains its real main content rather than a loading placeholder. Final scores should be rechecked against the deployed CDN and production font cache.

Verification completed with ESLint, strict TypeScript, Vitest, navigation accessibility tests, media audit, Prettier check, a clean Next.js production build and Lighthouse. The build emits a non-blocking Sanity/Node `--localstorage-file` warning in worker processes; compilation and all 141 generated pages complete successfully.

## Remaining areas requiring final media

- Product-specific cutouts and secondary hover images are required before card crossfades can represent real variants.
- Approved product detail, finish, technical-diagram and project imagery is required to avoid repeated representative media.
- Accurate 3D, 360, exploded-view and cable-routing assets are required before physical transitions can be enabled.
- Verified metrics are required before count-up animation may be used publicly.
- Project galleries and shared project-tile transitions remain dormant until approved projects are published.

## Browser-specific limitations

- Shared-element transitions use the View Transitions API only where supported; Motion/CSS transitions remain the fallback in Safari and Firefox versions without same-document support.
- `clip-path` reveals fall back to opacity when reduced motion is requested; older browsers still show complete media.
- Touch swipe uses native pointer movement without momentum or scroll capture.
- Backdrop blur remains limited to the sticky header/action surfaces and may render differently in Safari.
- Real-device Safari, Firefox, Edge, VoiceOver/NVDA and low-power mobile testing remains required with final media.

## Usage rules

- Use micro timing for controls, component timing for state changes, section timing for editorial reveals and cinematic timing only for heroes or major media.
- Do not split body copy into letters or words, repeat viewport reveals, animate unverified data, add scroll-jacking or delay navigation.
- Use sticky stories only where media genuinely changes the understanding of a product feature.
- Prefer the shared components and tokens; do not introduce local easing or duration values without extending the documented system.
