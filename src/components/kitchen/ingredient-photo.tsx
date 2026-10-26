import Image from "next/image";
import { ingredientPhoto } from "@/lib/kitchen";
import { cn } from "@/lib/utils";

export function IngredientPhoto({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ingredient-jump relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm",
        className,
      )}
    >
      <Image
        src={ingredientPhoto(name)}
        alt={name}
        fill
        sizes="64px"
        className="object-cover"
      />
    </div>
  );
}
