"use client";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { SearchResult } from "@/components/search/search-data";
import { noopSearchAnalytics } from "@/lib/analytics/search";
import {
  localSearchProvider,
  type SearchProvider,
} from "@/lib/search/providers";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion/tokens";

const RECENT_SEARCHES_KEY = "onespace-recent-searches";

export function GlobalSearch({
  inverse = false,
  provider = localSearchProvider,
}: {
  inverse?: boolean;
  provider?: SearchProvider;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const groups = useMemo(
    () => Object.entries(Object.groupBy(results, (result) => result.category)),
    [results],
  );
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setRecent(
          JSON.parse(
            localStorage.getItem(RECENT_SEARCHES_KEY) ?? "[]",
          ) as string[],
        );
      } catch {
        setRecent([]);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]),input:not([disabled]),a[href]",
        ),
      ];
      const first = items[0],
        last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, [open]);
  useEffect(() => {
    const term = query.trim();
    if (!term) {
      const timer = window.setTimeout(() => {
        setResults([]);
        setLoading(false);
        setActive(0);
      }, 0);
      return () => window.clearTimeout(timer);
    }
    let current = true;
    const timer = window.setTimeout(() => {
      void provider
        .search({ query: term, limit: 18 })
        .then((matches) => {
          if (!current) return;
          setResults(matches);
          setActive(0);
          setLoading(false);
          void noopSearchAnalytics.track(
            matches.length
              ? {
                  name: "search_submitted",
                  query: term,
                  resultCount: matches.length,
                }
              : { name: "search_no_results", query: term },
          );
        })
        .catch(() => {
          if (current) {
            setResults([]);
            setLoading(false);
          }
        });
    }, 100);
    return () => {
      current = false;
      window.clearTimeout(timer);
    };
  }, [provider, query]);
  const remember = (term: string) => {
    const value = term.trim();
    if (!value) return;
    const next = [
      value,
      ...recent.filter((item) => item.toLowerCase() !== value.toLowerCase()),
    ].slice(0, 5);
    setRecent(next);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  };
  const choose = (result: SearchResult) => {
    remember(query);
    void noopSearchAnalytics.track({
      name: "search_result_selected",
      query,
      resultId: result.id,
      category: result.category,
    });
    setOpen(false);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    }
    if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      document.getElementById(`search-result-${active}`)?.click();
    }
  };
  let resultIndex = -1;
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "inline-flex size-11 shrink-0 touch-manipulation items-center justify-center border transition-colors",
          inverse
            ? "border-white/30 text-white hover:border-white"
            : "border-line hover:border-graphite",
        )}
        aria-label="Search site"
      >
        <Search aria-hidden className="size-4" />
      </button>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: motionTokens.duration.fast }}
                className="bg-brand-950/72 fixed inset-0 z-[120] p-0 backdrop-blur-sm sm:p-8"
                onMouseDown={(event) => {
                  if (event.currentTarget === event.target) setOpen(false);
                }}
              >
                <motion.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="search-title"
                  initial={{ opacity: 0.82, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{
                    duration: motionTokens.duration.component,
                    ease: motionTokens.easing.enter,
                  }}
                  className="glass-panel-strong text-graphite mx-auto flex h-full max-h-full w-full max-w-5xl flex-col overflow-hidden sm:h-auto sm:max-h-[calc(100vh-4rem)]"
                >
                  <header className="border-line flex items-center justify-between border-b p-4 sm:p-6">
                    <div>
                      <p className="type-eyebrow text-accent">Global search</p>
                      <h2 id="search-title" className="type-h3 mt-2">
                        Search ONESPACE
                      </h2>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="border-line grid size-11 place-items-center border"
                      aria-label="Close search"
                    >
                      <X aria-hidden className="size-5" />
                    </button>
                  </header>
                  <div className="border-line relative border-b">
                    <Search
                      aria-hidden
                      className="text-ink-muted absolute top-1/2 left-5 size-5 -translate-y-1/2"
                    />
                    <input
                      ref={inputRef}
                      type="search"
                      role="combobox"
                      aria-expanded={Boolean(results.length)}
                      aria-controls="global-search-results"
                      aria-activedescendant={
                        results[active] ? `search-result-${active}` : undefined
                      }
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setLoading(Boolean(event.target.value.trim()));
                      }}
                      onKeyDown={onKeyDown}
                      placeholder="Search products, spaces, sectors and resources"
                      aria-label="Search all content"
                      className="type-body-lg text-graphite caret-accent placeholder:text-ink-muted min-h-20 w-full touch-manipulation bg-white/35 pr-5 pl-14 backdrop-blur-md outline-none"
                    />
                  </div>
                  <div
                    className="min-h-52 overflow-y-auto p-4 sm:p-6"
                    aria-live="polite"
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {loading && (
                        <motion.p
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="type-body text-ink-muted"
                        >
                          Searching…
                        </motion.p>
                      )}
                      {query && !loading && !results.length && (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0.68, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <h3 className="type-h4">No results found.</h3>
                          <p className="type-body-sm text-ink-muted mt-3">
                            Check the spelling, try a broader product family,
                            space or sector, or contact Design Support for help.
                          </p>
                        </motion.div>
                      )}
                      {!query && (
                        <motion.div
                          key="initial"
                          initial={{ opacity: 0.75 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <p className="type-body text-ink-muted">
                            Start typing for instant suggestions. Use ↑ and ↓ to
                            move, Enter to open, and Escape to close.
                          </p>
                          {recent.length > 0 && (
                            <div className="mt-8">
                              <p className="type-spec-label">Recent searches</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {recent.map((term) => (
                                  <button
                                    key={term}
                                    type="button"
                                    onClick={() => setQuery(term)}
                                    className="border-line hover:border-accent min-h-11 border px-4 text-sm"
                                  >
                                    {term}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div id="global-search-results">
                      {groups.map(([category, items]) => (
                        <motion.section
                          key={category}
                          initial={{ opacity: 0.72, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          aria-labelledby={`search-group-${category.replaceAll(" ", "-")}`}
                        >
                          <h3
                            id={`search-group-${category.replaceAll(" ", "-")}`}
                            className="type-eyebrow border-line bg-surface text-accent sticky top-0 z-10 mt-5 border-b py-3"
                          >
                            {category}
                          </h3>
                          <ul>
                            {items?.map((result) => {
                              resultIndex += 1;
                              const index = resultIndex;
                              return (
                                <li key={`${result.category}-${result.id}`}>
                                  <Link
                                    id={`search-result-${index}`}
                                    href={result.href as never}
                                    onClick={() => choose(result)}
                                    className={cn(
                                      "group border-line grid min-h-20 gap-2 border-b py-4 sm:grid-cols-[1fr_auto]",
                                      active === index &&
                                        "bg-accent-light px-3",
                                    )}
                                  >
                                    <span>
                                      <strong className="block font-semibold">
                                        <Highlight
                                          text={result.title}
                                          query={query}
                                        />
                                      </strong>
                                      <span className="type-body-sm text-ink-muted mt-1 block">
                                        <Highlight
                                          text={result.description}
                                          query={query}
                                        />
                                      </span>
                                    </span>
                                    <span
                                      aria-hidden
                                      className="text-ink-muted group-hover:text-accent"
                                    >
                                      ↗
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.section>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean).map(escapeRegExp);
  if (!terms.length) return text;
  const expression = new RegExp(`(${terms.join("|")})`, `gi`);
  const exactMatch = new RegExp(`^(?:${terms.join("|")})$`, "i");
  return (
    <>
      {text.split(expression).map((part, index) =>
        exactMatch.test(part) ? (
          <mark
            key={`${part}-${index}`}
            className="text-accent bg-transparent font-semibold"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={`${part}-${index}`}>{part}</Fragment>
        ),
      )}
    </>
  );
}
function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
