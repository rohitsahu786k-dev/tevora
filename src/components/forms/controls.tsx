import { Check, ChevronDown } from "lucide-react";
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type BaseProps = { label: string; hint?: string; error?: string };
export const TextField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & BaseProps
>(function TextField({ label, hint, error, className, id, ...props }, ref) {
  const generated = useId();
  const inputId = id ?? generated;
  const descriptionId = `${inputId}-description`;
  return (
    <label htmlFor={inputId} className="block">
      <span className="type-spec-label text-graphite block">{label}</span>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={hint || error ? descriptionId : undefined}
        className={cn(
          "bg-surface placeholder:text-ink-muted/65 focus:border-accent mt-2 min-h-12 w-full border px-4 text-base transition-colors outline-none",
          error ? "border-error" : "border-line",
          className,
        )}
        {...props}
      />
      {(hint || error) && (
        <span
          id={descriptionId}
          className={cn(
            "type-caption mt-1.5 block",
            error ? "text-error" : "text-ink-muted",
          )}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
});
export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & BaseProps
>(function TextArea({ label, hint, error, className, id, ...props }, ref) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <label htmlFor={inputId} className="block">
      <span className="type-spec-label block">{label}</span>
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={cn(
          "border-line bg-surface focus:border-accent mt-2 min-h-32 w-full resize-y border p-4 outline-none",
          className,
        )}
        {...props}
      />
      {(hint || error) && (
        <span
          className={cn(
            "type-caption mt-1.5 block",
            error ? "text-error" : "text-ink-muted",
          )}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
});
export const SelectControl = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & BaseProps
>(function SelectControl(
  { label, hint, error, className, id, children, ...props },
  ref,
) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <label htmlFor={inputId} className="block">
      <span className="type-spec-label block">{label}</span>
      <span className="relative mt-2 block">
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "border-line bg-surface focus:border-accent min-h-12 w-full appearance-none border px-4 pr-10 outline-none",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
        />
      </span>
      {(hint || error) && (
        <span
          className={cn(
            "type-caption mt-1.5 block",
            error ? "text-error" : "text-ink-muted",
          )}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
});
export function Checkbox({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
      <span className="relative grid size-5 place-items-center">
        <input
          type="checkbox"
          className="peer border-border-strong bg-surface checked:border-accent checked:bg-accent size-5 appearance-none border"
          {...props}
        />
        <Check
          aria-hidden
          className="pointer-events-none absolute size-3 text-white opacity-0 peer-checked:opacity-100"
        />
      </span>
      {label}
    </label>
  );
}
export function Radio({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
      <input
        type="radio"
        className="border-border-strong bg-surface checked:border-accent size-5 appearance-none rounded-full border checked:border-[6px]"
        {...props}
      />
      {label}
    </label>
  );
}
