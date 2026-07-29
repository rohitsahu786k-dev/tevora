"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, FileText, LockKeyhole, RotateCcw, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { submitResourceAccessRequest } from "@/app/resources/actions";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { SelectControl, TextField } from "@/components/forms/controls";
import {
  accessories,
  productFamilies,
  products,
  publishedResources,
  resources,
  sectors,
  spaces,
} from "@/content";
import {
  resourceAccessSchema,
  type ResourceAccessInput,
} from "@/lib/validation/resource-access";
import type { Resource } from "@/types/content";

const resourceTypeLabels: Record<Resource["resourceType"], string> = {
  "product-brochure": "Product brochures",
  "product-data-sheet": "Product data sheets",
  "technical-specification": "Technical specifications",
  cad: "CAD",
  bim: "BIM",
  revit: "Revit",
  step: "STEP",
  "installation-guide": "Installation guides",
  "finish-card": "Finish cards",
  "sustainability-document": "Sustainability documents",
  certification: "Certifications",
  "planning-guide": "Planning guides",
  video: "Videos",
  "product-image": "Product images",
};

const filterKeys = [
  "family",
  "product",
  "accessory",
  "type",
  "format",
  "language",
  "revision",
  "sector",
  "space",
] as const;

export function ResourceBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gate, setGate] = useState<Resource | null>(null);
  const [notice, setNotice] = useState("");
  const previewMode = publishedResources.length === 0;
  const browserResources = previewMode ? resources : publishedResources;
  const filters = Object.fromEntries(
    filterKeys.map((key) => [key, searchParams.get(key) ?? ""]),
  ) as Record<(typeof filterKeys)[number], string>;
  const updateFilter = (key: (typeof filterKeys)[number], value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(
      `${window.location.pathname}${next.size ? `?${next}` : ""}` as never,
      {
        scroll: false,
      },
    );
  };
  const filtered = useMemo(
    () =>
      browserResources.filter(
        (resource) =>
          (!filters.family || resource.productFamily === filters.family) &&
          (!filters.product || resource.product === filters.product) &&
          (!filters.accessory || resource.accessory === filters.accessory) &&
          (!filters.type || resource.resourceType === filters.type) &&
          (!filters.format || resource.fileFormat === filters.format) &&
          (!filters.language || resource.language === filters.language) &&
          (!filters.revision || resource.revision === filters.revision) &&
          (!filters.sector || resource.sectors.includes(filters.sector)) &&
          (!filters.space || resource.spaces.includes(filters.space)),
      ),
    [browserResources, filters],
  );
  const formats = [
    ...new Set(
      browserResources.flatMap((resource) =>
        resource.fileFormat ? [resource.fileFormat] : [],
      ),
    ),
  ];
  const revisions = [
    ...new Set(
      browserResources.flatMap((resource) =>
        resource.revision ? [resource.revision] : [],
      ),
    ),
  ];
  const openResource = (resource: Resource) => {
    if (resource.accessLevel === "registered") setGate(resource);
    else if (resource.accessLevel === "restricted")
      setNotice(
        "This download requires a TEVORA-issued login and project approval.",
      );
    else setGate(resource);
  };
  const hasFilters = Object.values(filters).some(Boolean);
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <aside>
          <div className="flex items-center justify-between">
            <p className="type-eyebrow text-accent">Filter resources</p>
            <button
              type="button"
              onClick={() =>
                router.push(window.location.pathname as never, {
                  scroll: false,
                })
              }
              className="flex min-h-11 items-center gap-2 text-xs font-semibold"
            >
              <RotateCcw aria-hidden className="size-4" />
              Reset
            </button>
          </div>
          <div className="mt-6 grid gap-5">
            <Filter
              label="Product family"
              value={filters.family}
              onChange={(value) => updateFilter("family", value)}
              options={productFamilies.map((item) => [item.id, item.name])}
            />
            <Filter
              label="Product"
              value={filters.product}
              onChange={(value) => updateFilter("product", value)}
              options={products.map((item) => [item.id, item.name])}
            />
            <Filter
              label="Accessory"
              value={filters.accessory}
              onChange={(value) => updateFilter("accessory", value)}
              options={accessories.map((item) => [item.id, item.name])}
            />
            <Filter
              label="Resource type"
              value={filters.type}
              onChange={(value) => updateFilter("type", value)}
              options={Object.entries(resourceTypeLabels)}
            />
            <Filter
              label="File format"
              value={filters.format}
              onChange={(value) => updateFilter("format", value)}
              options={formats.map((item) => [item, item])}
            />
            <Filter
              label="Language"
              value={filters.language}
              onChange={(value) => updateFilter("language", value)}
              options={[["en", "English"]]}
            />
            <Filter
              label="Revision"
              value={filters.revision}
              onChange={(value) => updateFilter("revision", value)}
              options={revisions.map((item) => [item, item])}
            />
            <Filter
              label="Sector"
              value={filters.sector}
              onChange={(value) => updateFilter("sector", value)}
              options={sectors.map((item) => [item.id, item.name])}
            />
            <Filter
              label="Space"
              value={filters.space}
              onChange={(value) => updateFilter("space", value)}
              options={spaces.map((item) => [item.id, item.name])}
            />
          </div>
        </aside>
        <div>
          <div className="border-line flex min-h-12 items-center justify-between border-b">
            <p className="type-body-sm">
              <strong>{filtered.length}</strong> resources
            </p>
            <p
              role="status"
              aria-live="polite"
              className="type-caption text-ink-muted"
            >
              {notice}
            </p>
          </div>
          {filtered.length ? (
            <div className="bg-line grid gap-px md:grid-cols-2">
              {filtered.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onOpen={() => openResource(resource)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20">
              <h2 className="type-h3">
                {hasFilters
                  ? "No resources match these filters."
                  : "Select a resource category to begin."}
              </h2>
              <p className="type-body-sm text-ink-muted mt-4">
                {hasFilters
                  ? "Reset one or more filters, browse another resource type, or contact Design Support for project-specific information."
                  : "Use the filters to narrow by product family, resource type, format, sector or space."}
              </p>
              <SecondaryButton
                type="button"
                className="mt-7"
                onClick={() =>
                  router.push(window.location.pathname as never, {
                    scroll: false,
                  })
                }
              >
                Reset filters
              </SecondaryButton>
            </div>
          )}
        </div>
      </div>
      {gate && (
        <ResourceGate
          resource={gate}
          close={() => setGate(null)}
          complete={(message) => setNotice(message)}
        />
      )}
    </>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <SelectControl
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">All</option>
      {options.map(([optionValue, text]) => (
        <option key={optionValue} value={optionValue}>
          {text}
        </option>
      ))}
    </SelectControl>
  );
}

function ResourceCard({
  resource,
  onOpen,
}: {
  resource: Resource;
  onOpen: () => void;
}) {
  const product = products.find((item) => item.id === resource.product);
  const family = productFamilies.find(
    (item) => item.id === resource.productFamily,
  );
  const accessLabel =
    resource.accessLevel === "restricted"
      ? "Project approval required"
      : resource.accessLevel === "registered"
        ? "TEVORA login required"
        : "Request current file";
  return (
    <article className="bg-surface grid min-h-[20rem] content-between p-5">
      <div>
        <div className="flex items-start justify-between">
          <FileText aria-hidden className="text-accent size-5" />
          <div className="text-right">
            <span className="type-series text-accent block">
              {resourceTypeLabels[resource.resourceType]}
            </span>
            <span className="type-model text-ink-muted mt-2 block">
              {accessLabel}
            </span>
          </div>
        </div>
        <h2 className="type-h3 mt-10">{resource.title}</h2>
        <p className="type-body-sm text-ink-muted mt-4">{resource.summary}</p>
      </div>
      <div>
        <dl className="border-line grid grid-cols-2 gap-x-5 gap-y-4 border-t pt-5">
          <Meta label="Related product" value={product?.name} />
          <Meta label="Related family" value={family?.name} />
          <Meta label="File format" value={resource.fileFormat} />
          <Meta label="File size" value={resource.fileSize} />
          <Meta label="Revision" value={resource.revision} />
          <Meta label="Last updated" value={resource.lastUpdated} />
          <Meta label="Access" value={resource.accessLevel} />
        </dl>
        <button
          type="button"
          onClick={onOpen}
          className="border-graphite hover:bg-brand-950 mt-6 flex min-h-12 w-full items-center justify-between border px-4 text-sm font-semibold hover:text-white"
        >
          <span>
            {resource.accessLevel === "restricted"
              ? "Request approved access"
              : resource.accessLevel === "registered"
                ? "Request TEVORA login"
                : "Request current file"}
          </span>
          {resource.accessLevel === "restricted" ||
          resource.accessLevel === "registered" ? (
            <LockKeyhole aria-hidden className="size-4" />
          ) : (
            <FileText aria-hidden className="size-4" />
          )}
        </button>
      </div>
    </article>
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
        {value ?? "Discuss with TEVORA"}
      </dd>
    </div>
  );
}

function ResourceGate({
  resource,
  close,
  complete,
}: {
  resource: Resource;
  close: () => void;
  complete: (message: string) => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");
  const [reference, setReference] = useState("");
  const form = useForm<ResourceAccessInput>({
    resolver: zodResolver(resourceAccessSchema),
  });
  const errors = form.formState.errors;
  const submit = form.handleSubmit(async (input) => {
    setStatus("Submitting…");
    const data = new FormData();
    data.set(
      "payload",
      JSON.stringify({
        ...input,
        resourceId: resource.id,
        resourceTitle: resource.title,
      }),
    );
    const result = await submitResourceAccessRequest(data);
    if (!result.ok) {
      setStatus(result.message);
      Object.entries(result.errors ?? {}).forEach(([field, messages]) =>
        form.setError(field as FieldPath<ResourceAccessInput>, {
          message: messages[0],
        }),
      );
      return;
    }
    setReference(result.reference);
    setStatus("Your TEVORA login request has been saved.");
    complete(
      "Thanks. Your TEVORA login request has been saved for Design Support review.",
    );
  });
  useEffect(() => {
    const dialog = panel.current;
    const first = dialog?.querySelector<HTMLElement>("button,input,select");
    first?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !dialog) return;
      const controls = [
        ...dialog.querySelectorAll<HTMLElement>(
          "button:not([disabled]),input:not([disabled]),select:not([disabled])",
        ),
      ];
      const start = controls[0];
      const end = controls.at(-1);
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault();
        end?.focus();
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault();
        start?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [close]);
  return (
    <div
      className="bg-brand-950/80 fixed inset-0 z-[120] grid place-items-center p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) close();
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-gate-title"
        className="bg-surface max-h-full w-full max-w-2xl overflow-y-auto p-6 sm:p-9"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="type-eyebrow text-accent">
              {resource.accessLevel === "public"
                ? "Resource request"
                : "Registered resource"}
            </p>
            <h2 id="resource-gate-title" className="type-h3 mt-4">
              Request access to {resource.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close resource request"
            className="border-line grid size-11 place-items-center border"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <p className="type-body-sm text-ink-muted mt-5">
          Share these details so Design Support can confirm the right file,
          revision and access path for your company, region and project type.
        </p>
        {status && (
          <div
            role="status"
            className="border-accent bg-accent-light mt-5 border-l-2 p-4"
          >
            <p className="type-body-sm">{status}</p>
            {reference && (
              <p className="type-caption text-ink-muted mt-2">
                Reference: {reference}
              </p>
            )}
          </div>
        )}
        <form onSubmit={submit} className="mt-8 grid gap-6 sm:grid-cols-2">
          <TextField
            label="Name"
            error={errors.name?.message}
            {...form.register("name")}
          />
          <TextField
            label="Company"
            error={errors.company?.message}
            {...form.register("company")}
          />
          <TextField
            type="email"
            label="Work email"
            error={errors.workEmail?.message}
            {...form.register("workEmail")}
          />
          <TextField
            label="Country"
            error={errors.country?.message}
            {...form.register("country")}
          />
          <SelectControl
            label="Role"
            error={errors.role?.message}
            {...form.register("role")}
          >
            <option value="">Select role</option>
            <option>AV integrator</option>
            <option>Architect</option>
            <option>AV consultant</option>
            <option>Education team</option>
            <option>Corporate project team</option>
            <option>Dealer or partner</option>
          </SelectControl>
          <SelectControl
            label="Project type"
            error={errors.projectType?.message}
            {...form.register("projectType")}
          >
            <option value="">Select project type</option>
            <option>Education</option>
            <option>Workplace</option>
            <option>Government</option>
            <option>Public space</option>
            <option>Specialist environment</option>
          </SelectControl>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Submitting…"
                : "Request TEVORA login"}
              <Download aria-hidden className="size-4" />
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export { resourceTypeLabels };
