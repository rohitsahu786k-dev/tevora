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
  return (
    <Image
      src={
        variant === "light" ? brandSettings.logoLight : brandSettings.logoDark
      }
      alt={brandSettings.brandName}
      width={430}
      height={72}
      priority={priority}
      className={cn("h-auto w-40", className)}
    />
  );
}
