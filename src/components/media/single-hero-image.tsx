import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroImage = {
  src: string;
  alt: string;
};

export function SingleHeroImage({
  image,
  className,
  priority = false,
  fit = "contain",
  aspect = "4/3",
}: {
  image: HeroImage;
  className?: string;
  priority?: boolean;
  fit?: "contain" | "cover";
  aspect?: "4/3" | "16/9";
}) {
  return (
    <figure
      className={cn(
        "border-line relative overflow-hidden border bg-white",
        aspect === "16/9" ? "aspect-[16/9]" : "aspect-[4/3]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 48vw, 100vw"
        className={cn(
          fit === "contain" ? "object-contain p-6 sm:p-8" : "object-cover",
        )}
      />
    </figure>
  );
}
