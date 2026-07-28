"use client";
import Link from "next/link";
import { useState } from "react";
import { Bookmark, Check, Download, Share2 } from "lucide-react";
import { routes } from "@/lib/routes";

export function ProductActionBar({
  productName,
  productSlug,
}: {
  productName: string;
  productSlug: string;
}) {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const share = async () => {
    const data = { title: productName, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
      setShared(true);
    } catch {
      return;
    }
  };
  return (
    <div className="glass-bar sticky bottom-0 z-40 border-t">
      <div className="mx-auto flex min-h-16 max-w-[96rem] items-center gap-1 overflow-x-auto px-3 sm:px-8">
        <Link
          href={`${routes.configure}?product=${productSlug}` as never}
          className="bg-brand-900 flex min-h-11 shrink-0 items-center px-4 text-xs font-semibold text-white"
        >
          Configure
        </Link>
        <a
          href="#resources"
          className="flex min-h-11 shrink-0 items-center gap-2 px-3 text-xs font-semibold"
        >
          <Download aria-hidden className="size-4" />
          Download
        </a>
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          aria-pressed={saved}
          className="flex min-h-11 shrink-0 items-center gap-2 px-3 text-xs font-semibold"
        >
          {saved ? (
            <Check aria-hidden className="size-4" />
          ) : (
            <Bookmark aria-hidden className="size-4" />
          )}
          {saved ? "Saved" : "Save"}
        </button>
        <button
          type="button"
          onClick={share}
          className="flex min-h-11 shrink-0 items-center gap-2 px-3 text-xs font-semibold"
        >
          <Share2 aria-hidden className="size-4" />
          {shared ? "Link copied" : "Share"}
        </button>
        <Link
          href={routes.contact}
          className="border-brand-900 ml-auto flex min-h-11 shrink-0 items-center border px-4 text-xs font-semibold"
        >
          Discuss Your Project
        </Link>
        <span className="sr-only" aria-live="polite">
          {saved ? "Product saved" : ""}
          {shared ? "Product link shared" : ""}
        </span>
      </div>
    </div>
  );
}
