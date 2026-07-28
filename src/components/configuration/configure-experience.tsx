"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Download,
  FileUp,
  LocateFixed,
  PackageSearch,
  RotateCcw,
  Save,
  Settings2,
  Share2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { SelectControl, TextField } from "@/components/forms/controls";
import { productFamilies, products, sectors, spaces } from "@/content";
import {
  getRelatedAccessories,
  recommendProducts,
} from "@/lib/content/relationships";
import {
  CONFIGURATION_QUERY_KEY,
  CONFIGURATION_STORAGE_KEY,
  createConfigurationShareUrl,
  createConfigurationState,
  parseConfiguration,
  serialiseConfiguration,
} from "@/lib/configuration/state";
import {
  productFinderSchema,
  type ProductFinderInput,
} from "@/lib/validation/configuration";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type {
  ConfigureEntryMode,
  TevoraConfigurationState,
} from "@/types/configuration";
import { motionTokens } from "@/lib/motion/tokens";
import { TevoraMotionProvider } from "@/components/motion/motion-provider";

const entryOptions: Array<{
  mode: ConfigureEntryMode;
  title: string;
  description: string;
  icon: typeof PackageSearch;
}> = [
  {
    mode: "find-product",
    title: "Find a Product",
    description:
      "Answer a few project questions and see product families that fit the room.",
    icon: PackageSearch,
  },
  {
    mode: "configure-product",
    title: "Configure a Product",
    description:
      "Start with a known product and capture the main equipment, finish and mobility needs.",
    icon: Settings2,
  },
  {
    mode: "design-space",
    title: "Design for a Space",
    description: "Begin with the room, activities and user requirements.",
    icon: LocateFixed,
  },
  {
    mode: "build-requirement",
    title: "Build a Requirement",
    description: "Capture equipment, access and project-stage inputs.",
    icon: ClipboardList,
  },
  {
    mode: "upload-layout",
    title: "Upload a Layout",
    description: "Keep room drawings ready for a TEVORA planning conversation.",
    icon: FileUp,
  },
  {
    mode: "request-proposal",
    title: "Request a Proposal",
    description: "Package the current brief for a TEVORA conversation.",
    icon: ArrowRight,
  },
];

const answerOptions = [
  ["", "Select an answer"],
  ["yes", "Yes"],
  ["no", "No"],
  ["unsure", "To be confirmed"],
] as const;

export function ConfigureExperience() {
  const [state, setState] = useState<TevoraConfigurationState>(() =>
    createConfigurationState({
      id: "configuration-new",
      updatedAt: "2000-01-01T00:00:00.000Z",
    }),
  );
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  const form = useForm<ProductFinderInput>({
    resolver: zodResolver(productFinderSchema),
    defaultValues: state.finder,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const parameters = new URLSearchParams(window.location.search);
      const shared = parseConfiguration(
        parameters.get(CONFIGURATION_QUERY_KEY),
      );
      const saved = parseConfiguration(
        localStorage.getItem(CONFIGURATION_STORAGE_KEY),
      );
      const restored = shared ?? saved;
      if (restored) {
        setState(restored);
        form.reset(restored.finder);
        setStatus(
          shared
            ? "Shared configuration loaded."
            : "Saved configuration restored.",
        );
      } else setState(createConfigurationState());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [form]);

  useEffect(() => {
    if (ready)
      localStorage.setItem(
        CONFIGURATION_STORAGE_KEY,
        serialiseConfiguration(state),
      );
  }, [ready, state]);

  const recommendations = useMemo(() => {
    const matches = recommendProducts({
      sectorSlugs: state.finder.sector ? [state.finder.sector] : [],
      spaceSlugs: state.finder.space ? [state.finder.space] : [],
      limit: 4,
    });
    return matches.map((product) => ({
      product,
      family: productFamilies.find(
        (family) => family.id === product.productFamily,
      ),
      accessories: getRelatedAccessories(product.slug).slice(0, 4),
      reasons: [
        state.finder.space &&
          `Relevant to ${spaces.find((space) => space.slug === state.finder.space)?.name ?? "the selected space"}.`,
        state.finder.sector &&
          `Commonly considered for ${sectors.find((sector) => sector.slug === state.finder.sector)?.name ?? "this sector"} projects.`,
      ].filter((reason): reason is string => Boolean(reason)),
    }));
  }, [state.finder.sector, state.finder.space]);

  const updateState = (update: Partial<TevoraConfigurationState>) =>
    setState((current) => ({
      ...current,
      ...update,
      updatedAt: new Date().toISOString(),
    }));

  const chooseMode = (mode: ConfigureEntryMode) => {
    updateState({ mode });
    document
      .getElementById(mode === "configure-product" ? "workspace" : "finder")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  };

  const submitFinder = form.handleSubmit((finder) => {
    updateState({ finder });
    setStatus("Requirements reviewed. Recommendations updated.");
  });

  const selectProduct = (productSlug: string) => {
    updateState({
      mode: "configure-product",
      configuration: {
        ...state.configuration,
        productSlug,
        accessorySlugs: [],
      },
    });
    setStatus("Product added to the configuration workspace.");
    document.getElementById("workspace")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const save = () => {
    localStorage.setItem(
      CONFIGURATION_STORAGE_KEY,
      serialiseConfiguration(state),
    );
    setStatus("Configuration saved on this device.");
  };

  const share = async () => {
    const url = createConfigurationShareUrl(state, window.location.href);
    window.history.replaceState(null, "", url);
    await navigator.clipboard.writeText(url);
    setStatus("Share link copied to the clipboard.");
  };

  const reset = () => {
    const fresh = createConfigurationState();
    localStorage.removeItem(CONFIGURATION_STORAGE_KEY);
    window.history.replaceState(null, "", routes.configure);
    setState(fresh);
    form.reset(fresh.finder);
    setStatus("Configuration reset.");
  };

  const download = () => {
    const content = [
      "TEVORA PROJECT CONFIGURATION STARTER",
      `Reference: ${state.id}`,
      `Updated: ${state.updatedAt}`,
      "",
      "Use this as a starting brief for discussion with TEVORA. Final product selections, dimensions and compatibility are confirmed during project review.",
      "",
      JSON.stringify(state, null, 2),
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `tevora-preliminary-${state.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Preliminary specification downloaded.");
  };

  return (
    <TevoraMotionProvider>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: ready ? 1 : 0.72 }}
        transition={{ duration: motionTokens.duration.component }}
      >
        <div className="border-line bg-line grid gap-px border md:grid-cols-2 xl:grid-cols-3">
          {entryOptions.map(
            ({ mode, title, description, icon: Icon }, index) => (
              <motion.button
                key={mode}
                type="button"
                onClick={() => chooseMode(mode)}
                aria-pressed={state.mode === mode}
                whileTap={{ scale: motionTokens.scale.press }}
                layout
                className={cn(
                  "group bg-surface hover:bg-accent-light grid min-h-44 content-between p-5 text-left",
                  state.mode === mode && "bg-accent-light",
                )}
              >
                <div className="flex items-center justify-between">
                  <Icon aria-hidden className="text-accent size-5" />
                  <span className="type-model text-ink-muted">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h2 className="type-h3">{title}</h2>
                  <p className="type-body-sm text-ink-muted mt-3">
                    {description}
                  </p>
                </div>
              </motion.button>
            ),
          )}
        </div>

        <section
          id="finder"
          className="scroll-mt-28 pt-24"
          aria-labelledby="finder-heading"
        >
          <div className="grid gap-12 lg:grid-cols-[18rem_1fr]">
            <div>
              <p className="type-eyebrow text-accent">Product finder</p>
              <h2 id="finder-heading" className="type-h2 mt-5">
                Define the requirement.
              </h2>
              <p className="type-body-sm text-ink-muted mt-5">
                Tell us the sector, room and equipment direction so the product
                shortlist starts from the real project context.
              </p>
            </div>
            <form onSubmit={submitFinder} className="grid gap-7 sm:grid-cols-2">
              <SelectControl
                label="Which sector are you working in?"
                {...form.register("sector")}
              >
                <option value="">Select a sector</option>
                {sectors.map((sector) => (
                  <option key={sector.slug} value={sector.slug}>
                    {sector.name}
                  </option>
                ))}
              </SelectControl>
              <SelectControl
                label="Which space are you designing?"
                {...form.register("space")}
              >
                <option value="">Select a space</option>
                {spaces.map((space) => (
                  <option key={space.slug} value={space.slug}>
                    {space.name}
                  </option>
                ))}
              </SelectControl>
              <TextField
                label="What activity will take place?"
                {...form.register("activity")}
              />
              <TextField
                label="Who will use the product?"
                {...form.register("users")}
              />
              <TextField
                label="What display size is required?"
                hint="Enter the project requirement; TEVORA will validate support."
                {...form.register("displaySize")}
              />
              <TextField
                label="How many displays are required?"
                {...form.register("displayQuantity")}
              />
              <TextField
                label="Which camera is required?"
                {...form.register("camera")}
              />
              <TextField
                label="Which soundbar or speaker is required?"
                {...form.register("soundbar")}
              />
              <TextField
                label="Which control device is required?"
                {...form.register("controlDevice")}
              />
              <TextField
                label="Which computing devices must be supported?"
                {...form.register("computingDevices")}
              />
              <AnswerSelect
                label="Is rack equipment required?"
                registration={form.register("rackEquipment")}
              />
              <AnswerSelect
                label="Is mobility required?"
                registration={form.register("mobility")}
              />
              <AnswerSelect
                label="Is height adjustment required?"
                registration={form.register("heightAdjustment")}
              />
              <AnswerSelect
                label="Is accessibility required?"
                registration={form.register("accessibility")}
              />
              <AnswerSelect
                label="Is concealed equipment storage required?"
                registration={form.register("concealedStorage")}
              />
              <SelectControl
                label="Is front or rear service access required?"
                {...form.register("serviceAccess")}
              >
                <option value="">Select an answer</option>
                <option value="front">Front</option>
                <option value="rear">Rear</option>
                <option value="both">Front and rear</option>
                <option value="unsure">To be confirmed</option>
              </SelectControl>
              <AnswerSelect
                label="Are CAD or BIM files required?"
                registration={form.register("cadBimRequired")}
              />
              <SelectControl
                label="What is the project stage?"
                {...form.register("projectStage")}
              >
                <option value="">Select a stage</option>
                <option value="concept">Concept</option>
                <option value="design-development">Design development</option>
                <option value="specification">Specification</option>
                <option value="procurement">Procurement</option>
                <option value="delivery">Delivery planning</option>
              </SelectControl>
              <TextField
                label="Where is the project located?"
                {...form.register("projectLocation")}
              />
              <label className="block">
                <span className="type-spec-label block">Upload a layout</span>
                <input
                  type="file"
                  accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
                  className="border-line bg-surface mt-2 min-h-12 w-full border p-3 text-sm"
                />
                <span className="type-caption text-ink-muted mt-2 block">
                  Keep the drawing ready to share with TEVORA during the project
                  review.
                </span>
              </label>
              <div className="flex items-end">
                <PrimaryButton type="submit">
                  Review recommendations{" "}
                  <ArrowRight aria-hidden className="size-4" />
                </PrimaryButton>
              </div>
            </form>
          </div>
        </section>

        <section className="pt-24" aria-labelledby="recommendations-heading">
          <div className="border-line flex items-end justify-between gap-6 border-b pb-6">
            <div>
              <p className="type-eyebrow text-accent">Recommendations</p>
              <h2 id="recommendations-heading" className="type-h2 mt-4">
                A considered starting point.
              </h2>
            </div>
            <span className="type-model text-ink-muted">
              {recommendations.length} matches
            </span>
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            {recommendations.length ? (
              <motion.div
                key="recommendations"
                initial={{ opacity: 1, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-line grid gap-px md:grid-cols-2"
              >
                {recommendations.map(
                  ({
                    product,
                    family,
                    accessories: relatedAccessories,
                    reasons,
                  }) => (
                    <motion.article
                      key={product.slug}
                      layout
                      initial={{ opacity: 1, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-surface grid min-h-[22rem] content-between p-5"
                    >
                      <div>
                        <span className="type-series text-accent">
                          {family?.name}
                        </span>
                        <h3 className="type-h2 mt-4">{product.name}</h3>
                        <p className="type-body-sm text-ink-muted mt-3">
                          {product.descriptor}
                        </p>
                        <h4 className="type-spec-label mt-8">Why it matches</h4>
                        <ul className="mt-3 space-y-2">
                          {reasons.map((reason) => (
                            <li key={reason} className="flex gap-2 text-sm">
                              <Check
                                aria-hidden
                                className="text-accent mt-0.5 size-4 shrink-0"
                              />
                              {reason}
                            </li>
                          ))}
                        </ul>
                        <h4 className="type-spec-label mt-7">
                          What to confirm next
                        </h4>
                        <p className="type-caption text-ink-muted mt-3">
                          Confirm model, equipment fit, dimensions, mounting,
                          cable paths and accessory compatibility with TEVORA.
                        </p>
                        <h4 className="type-spec-label mt-7">
                          Compatible accessory groups
                        </h4>
                        <p className="type-caption text-ink-muted mt-3">
                          {relatedAccessories.length
                            ? relatedAccessories
                                .map((item) => item.name)
                                .join(" · ")
                            : "Accessory groups can be discussed once a product direction is selected."}
                        </p>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <SecondaryButton asChild>
                          <Link href={routes.product(product.slug)}>
                            View Product
                          </Link>
                        </SecondaryButton>
                        <PrimaryButton
                          type="button"
                          onClick={() => selectProduct(product.slug)}
                        >
                          Configure Product
                        </PrimaryButton>
                      </div>
                    </motion.article>
                  ),
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="border-line border-b py-16"
              >
                <h3 className="type-h4">Select a sector or space to begin.</h3>
                <p className="type-body-sm text-ink-muted mt-3">
                  Recommendations appear after you choose where the product will
                  be used.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <ConfigurationWorkspace state={state} updateState={updateState} />

        <div className="border-line bg-surface/95 sticky bottom-0 z-30 mt-20 border-t py-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={status || "disclaimer"}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0.65, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="type-caption text-ink-muted"
              >
                {status ||
                  "Use this workspace to prepare a clear project brief before speaking with TEVORA."}
              </motion.p>
            </AnimatePresence>
            <div className="flex flex-wrap gap-2">
              <SecondaryButton type="button" onClick={reset}>
                <RotateCcw aria-hidden className="size-4" />
                Reset
              </SecondaryButton>
              <SecondaryButton type="button" onClick={save}>
                <Save aria-hidden className="size-4" />
                Save
              </SecondaryButton>
              <SecondaryButton type="button" onClick={share}>
                <Share2 aria-hidden className="size-4" />
                Share
              </SecondaryButton>
              <SecondaryButton type="button" onClick={download}>
                <Download aria-hidden className="size-4" />
                Project starter
              </SecondaryButton>
              <PrimaryButton asChild>
                <Link href={`${routes.contact}?configuration=${state.id}`}>
                  Request proposal
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </motion.div>
    </TevoraMotionProvider>
  );
}

function AnswerSelect({
  label,
  registration,
}: {
  label: string;
  registration: ReturnType<
    ReturnType<typeof useForm<ProductFinderInput>>["register"]
  >;
}) {
  return (
    <SelectControl label={label} {...registration}>
      {answerOptions.map(([value, text]) => (
        <option key={value || "blank"} value={value}>
          {text}
        </option>
      ))}
    </SelectControl>
  );
}

function ConfigurationWorkspace({
  state,
  updateState,
}: {
  state: TevoraConfigurationState;
  updateState: (update: Partial<TevoraConfigurationState>) => void;
}) {
  const selectedProduct = products.find(
    (product) => product.slug === state.configuration.productSlug,
  );
  const availableAccessories = selectedProduct
    ? getRelatedAccessories(selectedProduct.slug)
    : [];
  const setField = (
    field: keyof TevoraConfigurationState["configuration"],
    value: string | string[],
  ) =>
    updateState({ configuration: { ...state.configuration, [field]: value } });
  return (
    <section
      id="workspace"
      className="scroll-mt-28 pt-24"
      aria-labelledby="workspace-heading"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <p className="type-eyebrow text-accent">Configuration workspace</p>
          <h2 id="workspace-heading" className="type-h2 mt-4">
            Organise the preliminary configuration.
          </h2>
          <div className="border-line bg-surface-muted mt-8 grid aspect-[16/10] place-items-center border text-center">
            <div>
              <Settings2 aria-hidden className="text-accent mx-auto size-7" />
              <p className="type-model text-ink-muted mt-4">PRODUCT VIEWPORT</p>
              <p className="type-body-sm text-ink-muted mt-2">
                Product visuals, dimensions and exact options are reviewed with
                TEVORA during project planning.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <SelectControl
              label="Product"
              value={state.configuration.productSlug}
              onChange={(event) => setField("productSlug", event.target.value)}
            >
              <option value="">Select a product</option>
              {productFamilies.map((family) => (
                <optgroup key={family.id} label={family.name}>
                  {products
                    .filter((product) => product.productFamily === family.id)
                    .map((product) => (
                      <option key={product.slug} value={product.slug}>
                        {product.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </SelectControl>
            <TextField
              label="Model selector"
              hint="Enter only a known or project-supplied model reference."
              value={state.configuration.model}
              onChange={(event) => setField("model", event.target.value)}
            />
            <TextField
              label="Display configuration"
              value={state.configuration.displayConfiguration}
              onChange={(event) =>
                setField("displayConfiguration", event.target.value)
              }
            />
            <TextField
              label="Device configuration"
              value={state.configuration.deviceConfiguration}
              onChange={(event) =>
                setField("deviceConfiguration", event.target.value)
              }
            />
            <TextField
              label="Camera configuration"
              value={state.configuration.cameraConfiguration}
              onChange={(event) =>
                setField("cameraConfiguration", event.target.value)
              }
            />
            <TextField
              label="Soundbar configuration"
              value={state.configuration.soundbarConfiguration}
              onChange={(event) =>
                setField("soundbarConfiguration", event.target.value)
              }
            />
            <TextField
              label="Rack configuration"
              value={state.configuration.rackConfiguration}
              onChange={(event) =>
                setField("rackConfiguration", event.target.value)
              }
            />
            <TextField
              label="Finish selector"
              hint="Finish availability requires confirmation."
              value={state.configuration.finish}
              onChange={(event) => setField("finish", event.target.value)}
            />
            <SelectControl
              label="Mobility selector"
              value={state.configuration.mobility}
              onChange={(event) => setField("mobility", event.target.value)}
            >
              <option value="">To be confirmed</option>
              <option value="fixed">Fixed requirement</option>
              <option value="mobile">Mobile requirement</option>
            </SelectControl>
          </div>
        </div>
        <aside className="border-line border-t pt-6 lg:border-t-0 lg:border-l lg:pl-8">
          <p className="type-eyebrow text-accent">Configuration summary</p>
          <h3 className="type-h3 mt-5">
            {selectedProduct?.name ?? "No product selected"}
          </h3>
          <dl className="divide-line border-line mt-7 divide-y border-y">
            <SummaryRow label="Reference" value={state.id.slice(0, 12)} />
            <SummaryRow
              label="Model"
              value={state.configuration.model || "To be confirmed"}
            />
            <SummaryRow
              label="Display"
              value={
                state.configuration.displayConfiguration || "To be confirmed"
              }
            />
            <SummaryRow
              label="Finish"
              value={state.configuration.finish || "To be confirmed"}
            />
            <SummaryRow
              label="Mobility"
              value={state.configuration.mobility || "To be confirmed"}
            />
          </dl>
          <h4 className="type-spec-label mt-8">Accessory selector</h4>
          {availableAccessories.length ? (
            <div className="mt-3 space-y-2">
              {availableAccessories.map((accessory) => (
                <label
                  key={accessory.slug}
                  className="border-line flex min-h-11 items-center gap-3 border px-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={state.configuration.accessorySlugs.includes(
                      accessory.slug,
                    )}
                    onChange={(event) =>
                      setField(
                        "accessorySlugs",
                        event.target.checked
                          ? [
                              ...state.configuration.accessorySlugs,
                              accessory.slug,
                            ]
                          : state.configuration.accessorySlugs.filter(
                              (slug) => slug !== accessory.slug,
                            ),
                      )
                    }
                    className="size-5 accent-[var(--color-accent)]"
                  />
                  {accessory.name}
                </label>
              ))}
            </div>
          ) : (
            <p className="type-caption text-ink-muted mt-3">
              Select a product to show mapped accessory groups.
            </p>
          )}
          <div className="border-accent bg-accent-light mt-8 border-l-2 p-4">
            <p className="type-body-sm font-semibold">
              TEVORA confirms the final product, equipment fit and installation
              details before ordering.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
      <dt className="type-spec-label">{label}</dt>
      <dd className="type-caption text-ink-muted">{value}</dd>
    </div>
  );
}
