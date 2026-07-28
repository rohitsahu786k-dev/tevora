"use client";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, Lock } from "lucide-react";
import { accessories, productFamilies, products } from "@/content";
import { compatibilityProfiles } from "@/content/compatibility";
import {
  compatibilityStatusLabel,
  evaluateAccessorySelection,
} from "@/lib/compatibility/engine";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion/tokens";
import { TevoraMotionProvider } from "@/components/motion/motion-provider";

export function CompatibilityConfigurator() {
  const searchParams = useSearchParams();
  const initialProduct =
    products.find((product) => product.slug === searchParams.get("product"))
      ?.id ?? "";
  const initialAccessory = accessories.find(
    (accessory) => accessory.slug === searchParams.get("accessory"),
  )?.id;
  const [productId, setProductId] = useState(initialProduct);
  const [selected, setSelected] = useState<string[]>(
    initialAccessory ? [initialAccessory] : [],
  );
  const product = products.find((item) => item.id === productId);
  const results = useMemo(
    () =>
      evaluateAccessorySelection(compatibilityProfiles, {
        productId: product?.id,
        productFamilyId: product?.productFamily,
        productModel: product?.model,
        selectedAccessoryIds: selected,
      }),
    [product, selected],
  );
  const toggle = (accessoryId: string) => {
    const result = results[accessoryId];
    if (!result?.canSelect) return;
    setSelected((current) =>
      current.includes(accessoryId)
        ? current.filter((id) => id !== accessoryId)
        : [...current, accessoryId],
    );
  };
  return (
    <TevoraMotionProvider>
      <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
        <aside>
          <label htmlFor="base-product" className="type-spec-label">
            Required base product
          </label>
          <select
            id="base-product"
            value={productId}
            onChange={(event) => {
              setProductId(event.target.value);
              setSelected([]);
            }}
            className="border-line bg-surface mt-3 min-h-12 w-full border px-3"
          >
            <option value="">Select a product</option>
            {productFamilies.map((family) => (
              <optgroup key={family.id} label={family.name}>
                {products
                  .filter((item) => item.productFamily === family.id)
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          <div className="border-accent bg-accent-light mt-6 border-l-2 p-4">
            <p className="type-body-sm">
              Use this as a planning guide. TEVORA confirms accessory fit
              against the final product, equipment schedule and installation
              conditions.
            </p>
          </div>
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                <p className="type-spec-label">Selected accessories</p>
                <p className="type-body-sm mt-2">{selected.length} selected</p>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
        <div className="border-line bg-line grid gap-px border sm:grid-cols-2 xl:grid-cols-3">
          {accessories.map((accessory) => {
            const result = results[accessory.id];
            const active = selected.includes(accessory.id);
            return (
              <motion.button
                key={accessory.id}
                type="button"
                disabled={!result?.canSelect}
                aria-pressed={active}
                onClick={() => toggle(accessory.id)}
                layout
                whileTap={
                  result?.canSelect
                    ? { scale: motionTokens.scale.press }
                    : undefined
                }
                className={cn(
                  "bg-surface min-h-64 p-5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                  active && "bg-accent-light",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="type-series text-accent">
                    {compatibilityStatusLabel(
                      result?.status ?? "requires-technical-review",
                    )}
                  </span>
                  {!result?.canSelect ? (
                    <Lock aria-hidden className="size-4" />
                  ) : active ? (
                    <Check aria-hidden className="size-4" />
                  ) : result?.status === "requires-technical-review" ? (
                    <AlertTriangle aria-hidden className="size-4" />
                  ) : null}
                </div>
                <h2 className="type-h4 mt-14">{accessory.name}</h2>
                <p className="type-caption text-ink-muted mt-4">
                  {result?.reasons[0]}
                </p>
                {result?.alternativeAccessoryIds.length ? (
                  <p className="type-caption text-accent mt-3">
                    {result.alternativeAccessoryIds.length} alternative groups
                    available
                  </p>
                ) : null}
              </motion.button>
            );
          })}
        </div>
      </div>
    </TevoraMotionProvider>
  );
}
