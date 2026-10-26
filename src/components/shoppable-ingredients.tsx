"use client";

import { parseIngredientLine, type ShoppableItem } from "@/lib/shoppable";
import { formatMoney } from "@/lib/cart-state";
import { useCart } from "@/components/cart-provider";
import { IngredientPhoto } from "@/components/kitchen/ingredient-photo";

function cartDraft(item: ShoppableItem, recipeTitle?: string) {
  return {
    id: item.id,
    name: item.productName,
    amount: item.amount,
    priceCents: item.priceCents,
    recipeTitle,
  };
}

function AddButton({ item, recipeTitle }: { item: ShoppableItem; recipeTitle?: string }) {
  const { add, qtyOf } = useCart();
  const qty = qtyOf(item.id);

  return (
    <button
      type="button"
      onClick={() => add(cartDraft(item, recipeTitle))}
      aria-label={
        qty > 0
          ? `Add another ${item.productName} to cart, ${qty} in cart`
          : `Add ${item.productName} to cart`
      }
      className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase ${
        qty > 0 ? "bg-protein/15 text-success" : "bg-coral text-white"
      }`}
    >
      {qty > 0 ? `In cart · ${qty}` : "Add"}
    </button>
  );
}

export function ShoppableIngredients({
  lines,
  recipeTitle,
}: {
  lines: string[];
  recipeTitle?: string;
}) {
  const { addMany } = useCart();
  const groups = lines
    .map((line, index) => ({ line, index, items: parseIngredientLine(line) }))
    .filter((group) => group.items.length > 0);
  const drafts = groups.flatMap((group) =>
    group.items.map((item) => cartDraft(item, recipeTitle)),
  );

  if (groups.length === 0) return null;

  return (
    <div className="mt-4 border-t border-stone-100 pt-4">
      <ul className="space-y-4">
        {groups.map((group) => (
          <li key={`${group.index}-${group.line}`}>
            <p className="text-sm leading-snug text-stone-700">{group.line}</p>
            <div className="mt-2 space-y-2">
              {group.items.map((item) => (
                <div key={item.id} className="ingredient-jump flex items-center gap-3 rounded-[20px] bg-white p-2">
                  <IngredientPhoto name={item.productName} className="size-12" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">
                      {item.productName}
                      {item.optional ? (
                        <span className="ml-2 text-[10px] font-bold tracking-wider text-faint uppercase">
                          Optional
                        </span>
                      ) : null}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.amount} · {formatMoney(item.priceCents)}
                    </p>
                  </div>
                  <AddButton item={item} recipeTitle={recipeTitle} />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => addMany(drafts)}
        className="mt-4 w-full rounded-2xl border border-stone-200 bg-white py-2.5 text-[10px] font-bold tracking-[0.16em] text-stone-800 uppercase"
      >
        Add all to cart
      </button>
    </div>
  );
}
