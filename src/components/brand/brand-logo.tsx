import Image from "next/image";
import { brandSettings } from "@/config/brand";
import { cn } from "@/lib/utils";

export function BrandLogo({
  variant = "dark",
  className,
  priority = false,
}: {
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  if (variant === "dark") {
    return (
      <picture>
        <source
          media="(prefers-color-scheme: dark)"
          srcSet={brandSettings.logoLight}
        />
        <Image
          src={brandSettings.logoDark}
          alt={brandSettings.brandName}
          width={620}
          height={96}
          priority={priority}
          className={cn("h-auto w-48", className)}
        />
      </picture>
    );
  }

  return (
    <Image
      src={brandSettings.logoLight}
      alt={brandSettings.brandName}
      width={620}
      height={96}
      priority={priority}
      className={cn("h-auto w-48", className)}
    />
  );
}
