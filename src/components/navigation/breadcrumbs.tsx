import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
export type BreadcrumbItem = { label: string; href?: string };
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb">
        <ol className="text-ink-muted flex flex-wrap items-center gap-2 text-xs">
          {items.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {index > 0 && <ChevronRight aria-hidden className="size-3" />}
              {item.href ? (
                <Link
                  href={item.href as never}
                  className="hover:text-graphite min-h-11 content-center hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-graphite">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
