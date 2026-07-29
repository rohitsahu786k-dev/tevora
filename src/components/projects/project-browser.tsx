"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SelectControl } from "@/components/forms/controls";
import { MediaFrame } from "@/components/ui/system";
import {
  productFamilies,
  products,
  publishedProjects,
  sectors,
  spaces,
} from "@/content";
import { routes } from "@/lib/routes";

const keys = ["sector", "space", "family", "location", "type"] as const;

export function ProjectBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = Object.fromEntries(
    keys.map((key) => [key, searchParams.get(key) ?? ""]),
  ) as Record<(typeof keys)[number], string>;
  const setFilter = (key: (typeof keys)[number], value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(
      `${window.location.pathname}${next.size ? `?${next}` : ""}` as never,
      { scroll: false },
    );
  };
  const filtered = publishedProjects.filter((project) => {
    const usedProducts = products.filter((product) =>
      project.productsUsed.includes(product.id),
    );
    return (
      (!filters.sector || project.sector === filters.sector) &&
      (!filters.space || project.spaces.includes(filters.space)) &&
      (!filters.family ||
        usedProducts.some(
          (product) => product.productFamily === filters.family,
        )) &&
      (!filters.location || project.location === filters.location) &&
      (!filters.type || project.projectType === filters.type)
    );
  });
  const locations = [
    ...new Set(
      publishedProjects.flatMap((project) =>
        project.location ? [project.location] : [],
      ),
    ),
  ];
  const types = [
    ...new Set(
      publishedProjects.flatMap((project) =>
        project.projectType ? [project.projectType] : [],
      ),
    ),
  ];
  const reset = () =>
    router.push(window.location.pathname as never, { scroll: false });
  const hasFilters = Object.values(filters).some(Boolean);
  return (
    <>
      <div className="border-line grid gap-5 border-y py-6 sm:grid-cols-2 lg:grid-cols-5">
        <Filter
          label="Sector"
          value={filters.sector}
          set={(value) => setFilter("sector", value)}
          options={sectors.map((item) => [item.id, item.name])}
        />
        <Filter
          label="Space"
          value={filters.space}
          set={(value) => setFilter("space", value)}
          options={spaces.map((item) => [item.id, item.name])}
        />
        <Filter
          label="Product family"
          value={filters.family}
          set={(value) => setFilter("family", value)}
          options={productFamilies.map((item) => [item.id, item.name])}
        />
        <Filter
          label="Location"
          value={filters.location}
          set={(value) => setFilter("location", value)}
          options={locations.map((item) => [item, item])}
        />
        <Filter
          label="Project type"
          value={filters.type}
          set={(value) => setFilter("type", value)}
          options={types.map((item) => [item, item])}
        />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="type-body-sm">
          <strong>{filtered.length}</strong> projects
        </p>
        <button
          type="button"
          onClick={reset}
          className="flex min-h-11 items-center gap-2 text-xs font-semibold"
        >
          <RotateCcw aria-hidden className="size-4" />
          Reset filters
        </button>
      </div>
      {filtered.length ? (
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          {filtered.map((project) => {
            const sector = sectors.find((item) => item.id === project.sector);
            const projectSpaces = spaces.filter((item) =>
              project.spaces.includes(item.id),
            );
            const usedProducts = products.filter((item) =>
              project.productsUsed.includes(item.id),
            );
            return (
              <article key={project.slug}>
                <MediaFrame className="grid place-items-center">
                  <span className="type-model text-ink-muted">
                    PROJECT IMAGE
                  </span>
                </MediaFrame>
                <div className="border-line border-t pt-5">
                  <span className="type-series text-accent">
                    {sector?.name ?? "Project application"}
                  </span>
                  <h2 className="type-h3 mt-4">{project.projectName}</h2>
                  <dl className="mt-6 grid grid-cols-2 gap-5">
                    <Meta
                      label="Space"
                      value={projectSpaces.map((item) => item.name).join(", ")}
                    />
                    <Meta label="Location" value={project.location} />
                    <Meta
                      label="Products used"
                      value={usedProducts.map((item) => item.name).join(", ")}
                    />
                    <Meta label="Project type" value={project.projectType} />
                  </dl>
                  <Link
                    href={routes.project(project.slug)}
                    className="border-graphite mt-7 inline-flex min-h-11 items-center gap-2 border-b text-sm font-semibold"
                  >
                    View Project <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="py-20">
          <h2 className="type-h3">
            {hasFilters
              ? "No projects match these filters."
              : "Project stories are being prepared."}
          </h2>
          <p className="type-body-sm text-ink-muted mt-4">
            {hasFilters
              ? "Reset filters or discuss an application directly with the project team."
              : "Talk to ONESPACE about relevant applications for your sector, space or product family."}
          </p>
        </div>
      )}
    </>
  );
}
function Filter({
  label,
  value,
  set,
  options,
}: {
  label: string;
  value: string;
  set: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <SelectControl
      label={label}
      value={value}
      onChange={(event) => set(event.target.value)}
    >
      <option value="">All</option>
      {options.map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </SelectControl>
  );
}
function Meta({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <dt className="type-spec-label">{label}</dt>
      <dd className="type-caption text-ink-muted mt-1">
        {value || "Discuss with ONESPACE"}
      </dd>
    </div>
  );
}
