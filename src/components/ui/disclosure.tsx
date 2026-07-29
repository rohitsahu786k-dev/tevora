"use client";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/system";
import { motionTokens } from "@/lib/motion/tokens";
import { OnespaceMotionProvider } from "@/components/motion/motion-provider";

function useEscape(close: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [active, close]);
}

function useDialogFocus(
  open: boolean,
  close: () => void,
  panelRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLButtonElement | null>,
) {
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    focusable()[0]?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [close, open, panelRef, triggerRef]);
}
export function Modal({
  triggerLabel = "Open modal",
  title,
  children,
}: {
  triggerLabel?: string;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useEscape(close, open);
  useDialogFocus(open, close, panelRef, triggerRef);
  return (
    <OnespaceMotionProvider>
      <>
        <button
          ref={triggerRef}
          className="border-graphite min-h-12 border px-5 text-sm font-semibold"
          onClick={() => setOpen(true)}
        >
          {triggerLabel}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionTokens.duration.fast }}
              className="bg-brand-950/70 fixed inset-0 z-[90] grid place-items-center p-5"
              onMouseDown={(e) => {
                if (e.currentTarget === e.target) close();
              }}
            >
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={{ opacity: 0.8, scale: 0.985, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.99, y: 6 }}
                transition={{
                  duration: motionTokens.duration.component,
                  ease: motionTokens.easing.enter,
                }}
                className="bg-surface w-full max-w-xl p-6 shadow-2xl md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 id={titleId} className="type-h3">
                    {title}
                  </h2>
                  <IconButton label="Close modal" icon={X} onClick={close} />
                </div>
                <div className="mt-6">{children}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </OnespaceMotionProvider>
  );
}
export function Drawer({
  triggerLabel = "Open drawer",
  title,
  children,
}: {
  triggerLabel?: string;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useEscape(close, open);
  useDialogFocus(open, close, panelRef, triggerRef);
  return (
    <OnespaceMotionProvider>
      <>
        <button
          ref={triggerRef}
          className="border-graphite min-h-12 border px-5 text-sm font-semibold"
          onClick={() => setOpen(true)}
        >
          {triggerLabel}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-brand-950/60 fixed inset-0 z-[80]"
              onMouseDown={(e) => {
                if (e.currentTarget === e.target) close();
              }}
            >
              <motion.aside
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={id}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  duration: motionTokens.duration.component,
                  ease: motionTokens.easing.enter,
                }}
                className="bg-surface ml-auto h-full w-[min(28rem,90vw)] overflow-auto p-6 shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <h2 id={id} className="type-h3">
                    {title}
                  </h2>
                  <IconButton label="Close drawer" icon={X} onClick={close} />
                </div>
                <div className="mt-8">{children}</div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </OnespaceMotionProvider>
  );
}
export type AccordionItem = { title: string; content: ReactNode };
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <OnespaceMotionProvider>
      <div className="border-line border-t">
        {items.map((item, index) => {
          const id = `accordion-${index}`;
          const active = open === index;
          return (
            <div key={item.title} className="border-line border-b">
              <h3>
                <button
                  aria-expanded={active}
                  aria-controls={id}
                  onClick={() => setOpen(active ? null : index)}
                  className="flex min-h-14 w-full items-center justify-between py-4 text-left font-semibold"
                >
                  {item.title}
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-4 transition-transform",
                      active && "rotate-180",
                    )}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    id={id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: motionTokens.duration.component,
                      ease: motionTokens.easing.standard,
                    }}
                    className="type-body-sm text-ink-muted overflow-hidden pb-6"
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </OnespaceMotionProvider>
  );
}
export type TabItem = { label: string; content: ReactNode };
export function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };
  return (
    <OnespaceMotionProvider>
      <div>
        <div
          role="tablist"
          aria-label="Product information"
          className="border-line flex overflow-x-auto border-b"
        >
          {items.map((item, index) => (
            <button
              key={item.label}
              ref={(el) => {
                refs.current[index] = el;
              }}
              role="tab"
              aria-selected={active === index}
              aria-controls={`panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") move(index + 1);
                if (e.key === "ArrowLeft") move(index - 1);
              }}
              className={cn(
                "min-h-12 shrink-0 border-b-2 px-5 text-sm font-semibold",
                active === index
                  ? "border-accent text-brand-900"
                  : "text-ink-muted border-transparent",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0.74, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.duration.fast }}
          role="tabpanel"
          id={`panel-${active}`}
          tabIndex={0}
          className="type-body-sm text-ink-muted py-6"
        >
          {items[active]?.content}
        </motion.div>
      </div>
    </OnespaceMotionProvider>
  );
}
export function FilterChip({
  children,
  selected = false,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-11 border px-4 text-sm transition-colors",
        selected
          ? "border-brand-900 bg-brand-900 text-white"
          : "border-line bg-surface hover:border-brand-900",
      )}
    >
      {selected && <Check aria-hidden className="mr-2 inline size-3" />}
      {children}
    </button>
  );
}
