"use client";

import Link from "next/link";
import Image from "next/image";
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
  Send,
  Settings2,
  Share2,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm, useWatch } from "react-hook-form";
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
import { productConceptMediaBySlug } from "@/content/media";
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
    title: "Find products",
    description:
      "Start with the room and technology requirement, then shortlist suitable TEVORA products.",
    icon: PackageSearch,
  },
  {
    mode: "configure-product",
    title: "Configure product",
    description:
      "Select a product, confirm equipment needs, choose finish direction and add it to the basket.",
    icon: Settings2,
  },
  {
    mode: "design-space",
    title: "Design by space",
    description:
      "Use the room type to guide furniture, technology and accessory decisions.",
    icon: LocateFixed,
  },
  {
    mode: "build-requirement",
    title: "Build requirement",
    description:
      "Capture project stage, service access, display, device and documentation needs.",
    icon: ClipboardList,
  },
  {
    mode: "upload-layout",
    title: "Attach layout",
    description:
      "Keep drawings ready so TEVORA can confirm fit, clearances and service access.",
    icon: FileUp,
  },
  {
    mode: "request-proposal",
    title: "Place order",
    description:
      "Review the basket and send an order request for TEVORA confirmation.",
    icon: ArrowRight,
  },
];

const answerOptions = [
  ["", "Select an answer"],
  ["yes", "Yes"],
  ["no", "No"],
  ["unsure", "To be confirmed"],
] as const;

type BasketItem = {
  id: string;
  productSlug: string;
  productName: string;
  familyName: string;
  unitPrice: number;
  model: string;
  finish: string;
  mobility: string;
  displayConfiguration: string;
  deviceConfiguration: string;
  accessoryNames: string[];
  quantity: number;
};

const workflowSteps = [
  "Find the right product",
  "Configure options",
  "Add to basket",
  "Place order request",
];

const defaultRecommendationSlugs = [
  "vista-duo",
  "move-pro",
  "forum",
  "nexus",
  "arc",
  "dock",
];

const GST_RATE = 0.18;
const fallbackPriceByFamily: Record<string, number> = {
  "family-presentation-stations": 185000,
  "family-display-stands": 115000,
  "family-mobile-av-carts": 145000,
  "family-technology-credenzas": 225000,
  "family-collaboration-tables": 325000,
  "family-learning-furniture": 165000,
  "family-interactive-kiosks": 195000,
  "family-room-control-scheduling": 65000,
  "family-av-equipment-enclosures": 135000,
  "family-media-walls-space-dividers": 275000,
  "family-technical-workstations": 245000,
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function getProductPrice(productSlug: string) {
  const product = products.find((item) => item.slug === productSlug);
  if (!product) return 0;
  const familyBase = fallbackPriceByFamily[product.productFamily] ?? 125000;
  const familyProducts = products.filter(
    (item) => item.productFamily === product.productFamily,
  );
  const productIndex = Math.max(
    0,
    familyProducts.findIndex((item) => item.slug === product.slug),
  );
  return familyBase + productIndex * 18000;
}

function getBasketTotals(basket: BasketItem[]) {
  const subtotal = basket.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const gst = Math.round(subtotal * GST_RATE);
  return {
    subtotal,
    gst,
    total: subtotal + gst,
  };
}

export function ConfigureExperience() {
  const [state, setState] = useState<TevoraConfigurationState>(() =>
    createConfigurationState({
      id: "configuration-new",
      updatedAt: "2000-01-01T00:00:00.000Z",
    }),
  );
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  const [orderReference, setOrderReference] = useState("");
  const form = useForm<ProductFinderInput>({
    resolver: zodResolver(productFinderSchema),
    defaultValues: state.finder,
  });
  const watchedFinder = useWatch({ control: form.control });

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
    const liveFinder = {
      ...state.finder,
      ...watchedFinder,
    };
    const hasFinderContext = Boolean(liveFinder.sector || liveFinder.space);
    const featuredMatches = defaultRecommendationSlugs
      .map((slug) => products.find((product) => product.slug === slug))
      .filter((product): product is (typeof products)[number] =>
        Boolean(product),
      );
    const contextualMatches = hasFinderContext
      ? recommendProducts({
          sectorSlugs: liveFinder.sector ? [liveFinder.sector] : [],
          spaceSlugs: liveFinder.space ? [liveFinder.space] : [],
          limit: 6,
        })
      : [];
    const matches = contextualMatches.length
      ? contextualMatches
      : featuredMatches;
    return matches.map((product) => ({
      product,
      family: productFamilies.find(
        (family) => family.id === product.productFamily,
      ),
      accessories: getRelatedAccessories(product.slug).slice(0, 4),
      reasons: [
        !hasFinderContext &&
          "Popular configurable product for TEVORA projects.",
        liveFinder.space &&
          `Relevant to ${spaces.find((space) => space.slug === liveFinder.space)?.name ?? "the selected space"}.`,
        liveFinder.sector &&
          `Commonly considered for ${sectors.find((sector) => sector.slug === liveFinder.sector)?.name ?? "this sector"} projects.`,
      ].filter((reason): reason is string => Boolean(reason)),
    }));
  }, [state.finder, watchedFinder]);

  const basketQuantity = basket.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const basketTotals = getBasketTotals(basket);

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
    setStatus("Product loaded into the configuration workspace.");
    document.getElementById("workspace")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const chooseProductFromFinder = (productSlug: string) => {
    updateState({
      mode: "configure-product",
      configuration: {
        ...state.configuration,
        productSlug,
        accessorySlugs: [],
      },
    });
    setStatus(
      productSlug
        ? "Product selected. Continue configuring below or add it to the basket."
        : "Product selection cleared.",
    );
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
      `Basket items: ${basketQuantity}`,
      `Subtotal: ${formatPrice(basketTotals.subtotal)}`,
      `GST (${Math.round(GST_RATE * 100)}%): ${formatPrice(basketTotals.gst)}`,
      `Total: ${formatPrice(basketTotals.total)}`,
      "",
      "Use this as an order request summary for TEVORA review. Final product selections, dimensions, pricing, lead time and compatibility are confirmed before order acceptance.",
      "",
      JSON.stringify({ configuration: state, basket }, null, 2),
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `tevora-preliminary-${state.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Order request summary downloaded.");
  };

  const addCurrentConfigurationToBasket = (productSlug?: string) => {
    const product = products.find(
      (item) => item.slug === (productSlug ?? state.configuration.productSlug),
    );
    if (!product) {
      setStatus("Select a product before adding it to the basket.");
      document
        .getElementById("workspace")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const family = productFamilies.find(
      (item) => item.id === product.productFamily,
    );
    const accessoryNames = state.configuration.accessorySlugs
      .map(
        (slug) =>
          getRelatedAccessories(product.slug).find((item) => item.slug === slug)
            ?.name,
      )
      .filter((name): name is string => Boolean(name));
    const itemId = [
      product.slug,
      state.configuration.model,
      state.configuration.finish,
      state.configuration.mobility,
      state.configuration.displayConfiguration,
      state.configuration.deviceConfiguration,
      state.configuration.accessorySlugs.join("-"),
    ].join("|");
    const basketItem: BasketItem = {
      id: itemId,
      productSlug: product.slug,
      productName: product.name,
      familyName: family?.name ?? "TEVORA product",
      unitPrice: getProductPrice(product.slug),
      model: state.configuration.model,
      finish: state.configuration.finish,
      mobility: state.configuration.mobility,
      displayConfiguration: state.configuration.displayConfiguration,
      deviceConfiguration: state.configuration.deviceConfiguration,
      accessoryNames,
      quantity: 1,
    };
    setBasket((current) => {
      const existing = current.find((item) => item.id === itemId);
      if (existing)
        return current.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      return [...current, basketItem];
    });
    setStatus(`${product.name} added to basket.`);
  };

  const updateBasketQuantity = (id: string, quantity: number) => {
    setBasket((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const placeOrder = () => {
    if (!basket.length) {
      setStatus(
        "Add at least one configured product before placing an order request.",
      );
      document
        .getElementById("workspace")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const reference = `TEV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    setOrderReference(reference);
    setStatus(`Order request ${reference} prepared for TEVORA review.`);
    document
      .getElementById("order-basket")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <TevoraMotionProvider>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: ready ? 1 : 0.72 }}
        transition={{ duration: motionTokens.duration.component }}
      >
        <div className="glass-panel-strong mb-8 grid gap-px overflow-hidden p-2 sm:grid-cols-4">
          {workflowSteps.map((step, index) => (
            <div key={step} className="bg-white/42 p-4">
              <span className="type-model text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="type-body-sm mt-2 font-semibold">{step}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-stretch">
          <div className="bg-brand-950 p-6 text-white">
            <p className="type-eyebrow text-emerald-300">Order Builder</p>
            <h2 className="type-h2 mt-4 max-w-3xl text-balance">
              Shop, configure and send a reviewed TEVORA order request.
            </h2>
            <p className="type-body mt-5 max-w-3xl text-white/72">
              Choose a recommended product, configure the key options, add it to
              the basket and receive a TEVORA order reference before final
              commercial review.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton
                asChild
                className="text-brand-950! hover:border-accent hover:bg-accent! border-white bg-white! hover:text-white!"
              >
                <a href="#recommendations-heading">
                  Shop products <ArrowRight aria-hidden className="size-4" />
                </a>
              </PrimaryButton>
              <SecondaryButton
                asChild
                className="hover:text-brand-950 border-white/55 text-white hover:border-white hover:bg-white"
              >
                <a href="#order-basket">
                  View basket
                  {basketQuantity ? ` (${basketQuantity})` : ""}
                </a>
              </SecondaryButton>
            </div>
          </div>
          <div className="glass-panel-strong grid content-between p-5">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="type-model text-accent">Basket</p>
                  <p className="type-h3 mt-3">
                    {basketQuantity} item{basketQuantity === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="bg-brand-950 grid size-12 place-items-center rounded-full text-white">
                  <ShoppingBag aria-hidden className="size-5" />
                </div>
              </div>
              <p className="type-body-sm text-ink-muted mt-5">
                {orderReference
                  ? `Order reference ${orderReference} is ready.`
                  : basketQuantity
                    ? `Estimated total ${formatPrice(basketTotals.total)} including GST.`
                    : "Your configured products will appear here as you add them."}
              </p>
              <dl className="border-line mt-5 grid grid-cols-2 gap-3 border-t pt-4">
                <div>
                  <dt className="type-model text-ink-muted">Subtotal</dt>
                  <dd className="type-body-sm mt-1 font-semibold">
                    {formatPrice(basketTotals.subtotal)}
                  </dd>
                </div>
                <div>
                  <dt className="type-model text-ink-muted">GST</dt>
                  <dd className="type-body-sm mt-1 font-semibold">
                    {formatPrice(basketTotals.gst)}
                  </dd>
                </div>
              </dl>
            </div>
            <PrimaryButton type="button" onClick={placeOrder} className="mt-8">
              <Send aria-hidden className="size-4" />
              Place order
            </PrimaryButton>
          </div>
        </div>

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
              <SelectControl
                label="Select a product directly"
                value={state.configuration.productSlug}
                onChange={(event) =>
                  chooseProductFromFinder(event.target.value)
                }
              >
                <option value="">Browse all products</option>
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
                Recommended products.
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
                      className="bg-surface grid overflow-hidden"
                    >
                      <ProductThumbnail
                        productSlug={product.slug}
                        productName={product.name}
                      />
                      <div className="grid min-h-[22rem] content-between p-5">
                        <div>
                          <span className="type-series text-accent">
                            {family?.name}
                          </span>
                          <h3 className="type-h2 mt-4">{product.name}</h3>
                          <div className="bg-accent-light mt-4 inline-flex items-baseline gap-2 px-3 py-2">
                            <span className="type-model text-accent">
                              Live price
                            </span>
                            <span className="text-lg font-semibold">
                              {formatPrice(getProductPrice(product.slug))}
                            </span>
                          </div>
                          <p className="type-body-sm text-ink-muted mt-3">
                            {product.descriptor}
                          </p>
                          <h4 className="type-spec-label mt-8">
                            Why it matches
                          </h4>
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
                          <PrimaryButton
                            type="button"
                            onClick={() => selectProduct(product.slug)}
                          >
                            Configure
                          </PrimaryButton>
                          <SecondaryButton
                            type="button"
                            onClick={() => {
                              addCurrentConfigurationToBasket(product.slug);
                            }}
                          >
                            <ShoppingBag aria-hidden className="size-4" />
                            Add to basket
                          </SecondaryButton>
                          <SecondaryButton asChild>
                            <Link href={routes.product(product.slug)}>
                              Details
                            </Link>
                          </SecondaryButton>
                        </div>
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
                <h3 className="type-h4">Products are loading.</h3>
                <p className="type-body-sm text-ink-muted mt-3">
                  If recommendations do not appear, refresh the page or select a
                  sector and space above.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <ConfigurationWorkspace
          state={state}
          updateState={updateState}
          onAddToBasket={addCurrentConfigurationToBasket}
        />

        <OrderBasket
          basket={basket}
          orderReference={orderReference}
          updateQuantity={updateBasketQuantity}
          placeOrder={placeOrder}
        />

        <div className="glass-bar sticky bottom-0 z-30 mt-20 border-t py-4">
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
                  "Configure products, add them to the basket and place an order request for TEVORA review."}
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
                Order summary
              </SecondaryButton>
              <PrimaryButton type="button" onClick={placeOrder}>
                <Send aria-hidden className="size-4" />
                Place order
                {basketQuantity ? ` (${basketQuantity})` : ""}
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

function ProductThumbnail({
  productSlug,
  productName,
}: {
  productSlug: string;
  productName: string;
}) {
  const media = productConceptMediaBySlug[productSlug];
  return (
    <div className="relative grid aspect-[4/3] place-items-center bg-white">
      {media?.kind === "image" ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
          placeholder={media.blurDataURL ? "blur" : "empty"}
          blurDataURL={media.blurDataURL}
          className="object-contain p-6 transition-transform duration-[var(--duration-slow)] hover:scale-[1.02]"
        />
      ) : (
        <div className="text-center">
          <Settings2 aria-hidden className="text-accent mx-auto size-7" />
          <p className="type-model text-ink-muted mt-4">{productName}</p>
        </div>
      )}
    </div>
  );
}

function ConfigurationWorkspace({
  state,
  updateState,
  onAddToBasket,
}: {
  state: TevoraConfigurationState;
  updateState: (update: Partial<TevoraConfigurationState>) => void;
  onAddToBasket: () => void;
}) {
  const selectedProduct = products.find(
    (product) => product.slug === state.configuration.productSlug,
  );
  const selectedFamily = productFamilies.find(
    (family) => family.id === selectedProduct?.productFamily,
  );
  const selectedMedia = selectedProduct
    ? productConceptMediaBySlug[selectedProduct.slug]
    : null;
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
            Configure the product.
          </h2>
          <p className="type-body-sm text-ink-muted mt-5 max-w-2xl">
            Set the product, equipment notes, finish direction and accessory
            groups. Add each configured line to the basket when it is ready for
            order review.
          </p>
          <div className="glass-panel-strong mt-8 grid overflow-hidden md:grid-cols-[1.05fr_.95fr]">
            <div className="relative grid min-h-[22rem] place-items-center bg-white">
              {selectedMedia?.kind === "image" ? (
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  placeholder={selectedMedia.blurDataURL ? "blur" : "empty"}
                  blurDataURL={selectedMedia.blurDataURL}
                  className="object-contain p-8"
                />
              ) : (
                <div className="text-center">
                  <Settings2
                    aria-hidden
                    className="text-accent mx-auto size-7"
                  />
                  <p className="type-model text-ink-muted mt-4">
                    Select a product
                  </p>
                </div>
              )}
            </div>
            <div className="grid content-between p-6">
              <div>
                <p className="type-series text-accent">
                  {selectedFamily?.name ?? "TEVORA Technology Furniture"}
                </p>
                <h3 className="type-h3 mt-4">
                  {selectedProduct?.name ?? "No product selected"}
                </h3>
                {selectedProduct && (
                  <div className="bg-accent-light mt-4 inline-flex items-baseline gap-3 px-4 py-3">
                    <span className="type-model text-accent">Live price</span>
                    <span className="type-h4">
                      {formatPrice(getProductPrice(selectedProduct.slug))}
                    </span>
                  </div>
                )}
                <p className="type-body-sm text-ink-muted mt-4">
                  {selectedProduct?.descriptor ??
                    "Choose a product below or use the recommendations to start configuring a basket line."}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton type="button" onClick={() => onAddToBasket()}>
                  <ShoppingBag aria-hidden className="size-4" />
                  Add to basket
                </PrimaryButton>
                {selectedProduct && (
                  <SecondaryButton asChild>
                    <Link href={routes.product(selectedProduct.slug)}>
                      View product
                    </Link>
                  </SecondaryButton>
                )}
              </div>
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
        <aside className="glass-panel-strong self-start p-6">
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
            <div className="mt-3 grid gap-2">
              {availableAccessories.map((accessory) => (
                <label
                  key={accessory.slug}
                  className="glass-control flex min-h-11 items-center gap-3 px-3 text-sm"
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
              Basket orders are reviewed by TEVORA for pricing, lead time,
              dimensions, equipment fit and installation details before final
              acceptance.
            </p>
          </div>
          <PrimaryButton
            type="button"
            onClick={() => onAddToBasket()}
            className="mt-5 w-full"
          >
            <ShoppingBag aria-hidden className="size-4" />
            Add configured product
          </PrimaryButton>
        </aside>
      </div>
    </section>
  );
}

function OrderBasket({
  basket,
  orderReference,
  updateQuantity,
  placeOrder,
}: {
  basket: BasketItem[];
  orderReference: string;
  updateQuantity: (id: string, quantity: number) => void;
  placeOrder: () => void;
}) {
  const itemCount = basket.reduce((total, item) => total + item.quantity, 0);
  const totals = getBasketTotals(basket);
  return (
    <section
      id="order-basket"
      className="scroll-mt-28 pt-20"
      aria-labelledby="order-basket-heading"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <p className="type-eyebrow text-accent">Basket</p>
          <h2 id="order-basket-heading" className="type-h2 mt-4">
            Review the order request.
          </h2>
          <p className="type-body-sm text-ink-muted mt-5 max-w-2xl">
            Basket lines are sent as an order request. TEVORA confirms
            commercial terms, drawings, compatibility and delivery details
            before the order is accepted.
          </p>
        </div>
        <div className="glass-panel-strong p-5">
          <p className="type-model text-accent">Order status</p>
          <p className="type-h4 mt-3">
            {orderReference ? "Ready for TEVORA review" : "Basket in progress"}
          </p>
          <p className="type-body-sm text-ink-muted mt-3">
            {orderReference
              ? `Reference ${orderReference} has been prepared.`
              : `${itemCount} configured item${itemCount === 1 ? "" : "s"} in basket.`}
          </p>
          <div className="border-line mt-5 border-t pt-4">
            <p className="type-model text-ink-muted">Estimated total</p>
            <p className="type-h3 mt-2">{formatPrice(totals.total)}</p>
            <p className="type-caption text-ink-muted mt-2">
              Includes {Math.round(GST_RATE * 100)}% GST
            </p>
          </div>
        </div>
      </div>

      <div className="border-line bg-line mt-8 grid gap-px border">
        {basket.length ? (
          basket.map((item) => (
            <article
              key={item.id}
              className="bg-surface grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_18rem]"
            >
              <div>
                <p className="type-series text-accent">{item.familyName}</p>
                <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                  <h3 className="type-h4">{item.productName}</h3>
                  <div className="text-right">
                    <p className="type-model text-ink-muted">Unit price</p>
                    <p className="text-lg font-semibold">
                      {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                </div>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <BasketMeta label="Model" value={item.model} />
                  <BasketMeta label="Finish" value={item.finish} />
                  <BasketMeta label="Mobility" value={item.mobility} />
                  <BasketMeta
                    label="Accessories"
                    value={item.accessoryNames.join(", ")}
                  />
                </dl>
              </div>
              <div className="grid content-between gap-4">
                <div className="text-right">
                  <p className="type-model text-ink-muted">Line total</p>
                  <p className="type-h4 mt-1">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <div className="glass-control flex min-h-11 items-center">
                    <button
                      type="button"
                      className="grid size-11 place-items-center"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Reduce ${item.productName} quantity`}
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="grid size-11 place-items-center"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.productName} quantity`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="border-line hover:bg-brand-950 grid size-11 place-items-center border hover:text-white"
                    onClick={() => updateQuantity(item.id, 0)}
                    aria-label={`Remove ${item.productName} from basket`}
                  >
                    <Trash2 aria-hidden className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="bg-surface p-8">
            <ShoppingBag aria-hidden className="text-accent size-7" />
            <h3 className="type-h4 mt-5">Your basket is empty.</h3>
            <p className="type-body-sm text-ink-muted mt-3">
              Configure a product above, or use the recommendations to add the
              first product line.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="border-accent bg-accent-light border-l-2 p-5">
          <p className="type-body-sm font-semibold">
            Prices are dummy live estimates for configurator testing. TEVORA
            will confirm final pricing, discounts, freight, installation and
            lead time before accepting the order.
          </p>
        </div>
        <dl className="glass-panel-strong p-5">
          <PriceRow label="Subtotal" value={totals.subtotal} />
          <PriceRow
            label={`GST (${Math.round(GST_RATE * 100)}%)`}
            value={totals.gst}
          />
          <div className="border-line mt-4 flex items-center justify-between border-t pt-4">
            <dt className="type-h4">Total</dt>
            <dd className="type-h3">{formatPrice(totals.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <SecondaryButton asChild>
          <Link href={`${routes.contact}?configuration=order-review`}>
            Speak to TEVORA
          </Link>
        </SecondaryButton>
        <PrimaryButton type="button" onClick={placeOrder}>
          <Send aria-hidden className="size-4" />
          Place order request
        </PrimaryButton>
      </div>
    </section>
  );
}

function BasketMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="type-spec-label">{label}</dt>
      <dd className="type-caption text-ink-muted mt-1">
        {value || "To be confirmed"}
      </dd>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <dt className="type-body-sm text-ink-muted">{label}</dt>
      <dd className="type-body-sm font-semibold">{formatPrice(value)}</dd>
    </div>
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
