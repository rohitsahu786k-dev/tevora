"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Paperclip } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { type FieldPath, useForm } from "react-hook-form";
import { submitProjectEnquiry } from "@/app/contact/actions";
import {
  SelectControl,
  TextArea,
  TextField,
} from "@/components/forms/controls";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { productFamilies, sectors, spaces } from "@/content";
import {
  projectEnquirySchema,
  type ProjectEnquiryInput,
} from "@/lib/validation/contact";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion/tokens";
import { OnespaceMotionProvider } from "@/components/motion/motion-provider";

const STORAGE_KEY = "onespace-project-enquiry-v1";
const steps = [
  {
    title: "Project",
    description: "Place the enquiry in context.",
    fields: ["projectName", "sector", "space", "location"],
  },
  {
    title: "Requirements",
    description: "Describe the technology and programme.",
    fields: [
      "productInterest",
      "technologyRequirements",
      "projectStage",
      "quantity",
      "timeline",
    ],
  },
  {
    title: "Contact",
    description: "Tell us who should receive a response.",
    fields: ["name", "company", "workEmail", "phone", "role"],
  },
  {
    title: "Review",
    description: "Confirm the brief and consent.",
    fields: ["consent"],
  },
] satisfies Array<{
  title: string;
  description: string;
  fields: FieldPath<ProjectEnquiryInput>[];
}>;

const defaults: ProjectEnquiryInput = {
  projectName: "",
  sector: "",
  space: "",
  location: "",
  productInterest: "",
  technologyRequirements: "",
  projectStage: "",
  quantity: "",
  timeline: "",
  name: "",
  company: "",
  workEmail: "",
  phone: "",
  role: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [reference, setReference] = useState("");
  const form = useForm<ProjectEnquiryInput>({
    resolver: zodResolver(projectEnquirySchema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const {
    register,
    formState: { errors, isSubmitting },
    subscribe,
    reset,
    trigger,
    getValues,
    setError,
  } = form;
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          reset({
            ...defaults,
            ...JSON.parse(saved),
            consent: false,
            website: "",
          });
          setStatus("Saved enquiry restored on this device.");
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [reset]);
  useEffect(() => {
    return subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        const safe = { ...values, consent: false, website: "" };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
      },
    });
  }, [subscribe]);
  const next = async () => {
    if (await trigger(steps[step].fields, { shouldFocus: true }))
      setStep((current) => Math.min(current + 1, steps.length - 1));
  };
  const submit = form.handleSubmit(async (input) => {
    setStatus("Submitting…");
    const data = new FormData();
    data.set("payload", JSON.stringify(input));
    files.forEach((file) => data.append("files", file));
    const result = await submitProjectEnquiry(data);
    if (!result.ok) {
      setStatus(result.message);
      Object.entries(result.errors ?? {}).forEach(([field, messages]) =>
        setError(field as FieldPath<ProjectEnquiryInput>, {
          message: messages[0],
        }),
      );
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
    setReference(result.reference);
    setStatus("Your project enquiry has been submitted.");
  });
  if (reference)
    return (
      <OnespaceMotionProvider>
        <motion.div
          initial={{ opacity: 0.7, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.duration.component }}
          className="border-accent bg-accent-light border-l-2 p-7"
          role="status"
        >
          <Check aria-hidden className="text-accent size-6" />
          <h2 className="type-h3 mt-5">
            Thank you. The project brief is ready for review.
          </h2>
          <p className="type-body-sm text-ink-muted mt-4">
            Reference: {reference}
          </p>
          <p className="type-caption text-ink-muted mt-3">
            The project team will use the information provided to coordinate a
            response.
          </p>
        </motion.div>
      </OnespaceMotionProvider>
    );
  return (
    <OnespaceMotionProvider>
      <form onSubmit={submit} noValidate>
        <nav aria-label="Enquiry progress">
          <ol className="bg-line grid gap-px sm:grid-cols-4">
            {steps.map((item, index) => (
              <li
                key={item.title}
                aria-current={index === step ? "step" : undefined}
                className={cn(
                  "bg-surface min-h-28 p-4",
                  index === step && "bg-accent-light",
                )}
              >
                <span className="type-model text-accent">0{index + 1}</span>
                <p className="mt-5 text-sm font-semibold">{item.title}</p>
                <p className="type-caption text-ink-muted mt-1">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </nav>
        <AnimatePresence>
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="border-error mt-8 border-l-2 bg-red-50 p-4"
            >
              <p className="text-sm font-semibold">
                Review the highlighted fields before continuing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-12 min-h-[30rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 1, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{
                duration: motionTokens.duration.component,
                ease: motionTokens.easing.enter,
              }}
            >
              {step === 0 && (
                <fieldset>
                  <legend className="type-h2">Project context</legend>
                  <p className="type-body-sm text-ink-muted mt-3">
                    Start with the project, sector and room.
                  </p>
                  <div className="mt-8 grid gap-7 sm:grid-cols-2">
                    <TextField
                      label="Project name"
                      error={errors.projectName?.message}
                      {...register("projectName")}
                    />
                    <SelectControl
                      label="Sector"
                      error={errors.sector?.message}
                      {...register("sector")}
                    >
                      <option value="">Select sector</option>
                      {sectors.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </SelectControl>
                    <SelectControl
                      label="Space"
                      error={errors.space?.message}
                      {...register("space")}
                    >
                      <option value="">Select space</option>
                      {spaces.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </SelectControl>
                    <TextField
                      label="Location"
                      error={errors.location?.message}
                      {...register("location")}
                    />
                  </div>
                </fieldset>
              )}
              {step === 1 && (
                <fieldset>
                  <legend className="type-h2">Project requirements</legend>
                  <p className="type-body-sm text-ink-muted mt-3">
                    Share known information. Technical suitability remains
                    subject to validation.
                  </p>
                  <div className="mt-8 grid gap-7 sm:grid-cols-2">
                    <SelectControl
                      label="Product interest"
                      error={errors.productInterest?.message}
                      {...register("productInterest")}
                    >
                      <option value="">Select a product family</option>
                      {productFamilies.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                      <option value="unsure">Not yet determined</option>
                    </SelectControl>
                    <SelectControl
                      label="Project stage"
                      error={errors.projectStage?.message}
                      {...register("projectStage")}
                    >
                      <option value="">Select stage</option>
                      <option value="concept">Concept</option>
                      <option value="design-development">
                        Design development
                      </option>
                      <option value="specification">Specification</option>
                      <option value="procurement">Procurement</option>
                      <option value="delivery">Delivery planning</option>
                    </SelectControl>
                    <div className="sm:col-span-2">
                      <TextArea
                        label="Technology requirements"
                        hint="Include known displays, cameras, audio, controllers, computing, rack, power or access needs."
                        error={errors.technologyRequirements?.message}
                        {...register("technologyRequirements")}
                      />
                    </div>
                    <TextField
                      label="Quantity"
                      hint="An estimate is acceptable."
                      error={errors.quantity?.message}
                      {...register("quantity")}
                    />
                    <SelectControl
                      label="Timeline"
                      error={errors.timeline?.message}
                      {...register("timeline")}
                    >
                      <option value="">Select timeline</option>
                      <option value="0-3-months">0–3 months</option>
                      <option value="3-6-months">3–6 months</option>
                      <option value="6-12-months">6–12 months</option>
                      <option value="12-plus-months">12+ months</option>
                      <option value="unknown">To be confirmed</option>
                    </SelectControl>
                    <label className="sm:col-span-2">
                      <span className="type-spec-label block">
                        File uploads
                      </span>
                      <span className="type-caption text-ink-muted mt-2 block">
                        Up to five PDF, DWG, DXF, PNG or JPG files; maximum 10
                        MB each. Files are validated server-side.
                      </span>
                      <span className="border-line bg-surface mt-3 flex min-h-14 items-center gap-3 border px-4">
                        <Paperclip aria-hidden className="text-accent size-4" />
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
                          onChange={(event) =>
                            setFiles(
                              [...(event.target.files ?? [])].slice(0, 5),
                            )
                          }
                          className="w-full text-sm"
                        />
                      </span>
                      {files.length > 0 && (
                        <span className="type-caption mt-2 block">
                          {files.length} file{files.length === 1 ? "" : "s"}{" "}
                          selected
                        </span>
                      )}
                    </label>
                  </div>
                </fieldset>
              )}
              {step === 2 && (
                <fieldset>
                  <legend className="type-h2">Contact details</legend>
                  <p className="type-body-sm text-ink-muted mt-3">
                    We’ll use these details only to respond to this project
                    enquiry and coordinate relevant support.
                  </p>
                  <div className="mt-8 grid gap-7 sm:grid-cols-2">
                    <TextField
                      label="Name"
                      autoComplete="name"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <TextField
                      label="Company"
                      autoComplete="organization"
                      error={errors.company?.message}
                      {...register("company")}
                    />
                    <TextField
                      label="Work email"
                      type="email"
                      autoComplete="email"
                      error={errors.workEmail?.message}
                      {...register("workEmail")}
                    />
                    <TextField
                      label="Phone"
                      type="tel"
                      autoComplete="tel"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                    <TextField
                      label="Role"
                      error={errors.role?.message}
                      {...register("role")}
                    />
                  </div>
                </fieldset>
              )}
              {step === 3 && (
                <fieldset>
                  <legend className="type-h2">Review and consent</legend>
                  <p className="type-body-sm text-ink-muted mt-3">
                    Confirm the key details before submitting.
                  </p>
                  <dl className="bg-line mt-8 grid gap-px sm:grid-cols-2">
                    <Review label="Project" value={getValues("projectName")} />
                    <Review label="Location" value={getValues("location")} />
                    <Review
                      label="Technology requirements"
                      value={getValues("technologyRequirements")}
                    />
                    <Review
                      label="Contact"
                      value={`${getValues("name")} · ${getValues("workEmail")}`}
                    />
                  </dl>
                  <label className="mt-8 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent)]"
                    />
                    <span className="text-sm">
                      I consent to ONESPACE using these details and attachments
                      to respond to this project enquiry and coordinate relevant
                      project support.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="type-caption text-error mt-2" role="alert">
                      {errors.consent.message}
                    </p>
                  )}
                  <label className="sr-only" aria-hidden="true">
                    Website
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </label>
                  <div className="border-accent bg-accent-light mt-8 border-l-2 p-4">
                    <p className="type-body-sm">
                      Submissions are validated on the server. Additional abuse
                      protection will be applied according to the production
                      privacy configuration.
                    </p>
                  </div>
                </fieldset>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="border-line flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={status}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0.6, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="type-caption text-ink-muted"
            >
              {status}
            </motion.p>
          </AnimatePresence>
          <div className="flex gap-3">
            {step > 0 && (
              <SecondaryButton
                type="button"
                onClick={() => setStep((current) => current - 1)}
              >
                <ArrowLeft aria-hidden className="size-4" />
                Back
              </SecondaryButton>
            )}
            {step < steps.length - 1 ? (
              <PrimaryButton type="button" onClick={next}>
                Continue <ArrowRight aria-hidden className="size-4" />
              </PrimaryButton>
            ) : (
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Discuss Your Project"}
                <ArrowRight aria-hidden className="size-4" />
              </PrimaryButton>
            )}
          </div>
        </div>
      </form>
    </OnespaceMotionProvider>
  );
}
function Review({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface min-h-28 p-5">
      <dt className="type-spec-label">{label}</dt>
      <dd className="type-body-sm text-ink-muted mt-3">
        {value || "Not supplied"}
      </dd>
    </div>
  );
}
