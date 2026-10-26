"use client";

import { motion, useReducedMotion } from "framer-motion";
import { parseIngredientLine, type ShoppableItem } from "@/lib/shoppable";
import { formatMoney } from "@/lib/cart-state";
import { useCart } from "@/components/cart-provider";
import { MEAL_EASE } from "@/components/meal-motion";

function cartDraft(item: ShoppableItem) {
  return {
    id: item.id,
    name: item.productName,
    amount: item.amount,
    priceCents: item.priceCents,
  };
}

function AddButton({ item }: { item: ShoppableItem }) {
  const { add, qtyOf } = useCart();
  const qty = qtyOf(item.id);

  return (
    <button
      type="button"
      onClick={() => add(cartDraft(item))}
      aria-label={
        qty > 0
          ? `Add another ${item.productName} to cart, ${qty} in cart`
          : `Add ${item.productName} to cart`
      }
      className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase ${
        qty > 0 ? "bg-sage/20 text-sage" : "bg-stone-900 text-white"
      }`}
    >
      {qty > 0 ? `In cart · ${qty}` : "Add"}
    </button>
  );
}

const restingRow = {
  hidden: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
  show: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
};

const arrivingRow = {
  hidden: { opacity: 0, y: 16, scale: 0.96, rotateX: 7 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.55, ease: MEAL_EASE },
  },
};

export function ShoppableIngredients({
  lines,
  active = true,
  enter = false,
}: {
  lines: string[];
  active?: boolean;
  enter?: boolean;
}) {
  const { addMany } = useCart();
  const reduced = useReducedMotion();
  const groups = lines
    .map((line, index) => ({ line, index, items: parseIngredientLine(line) }))
    .filter((group) => group.items.length > 0);
  const drafts = groups.flatMap((group) => group.items.map(cartDraft));
  const play = enter && !reduced;

  if (groups.length === 0) return null;

  return (
    <motion.ul
      className="mt-4 space-y-4 border-t border-stone-100 pt-4"
      style={{ perspective: 900 }}
      initial={play ? "hidden" : false}
      animate={!play || active ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: play ? 0.05 : 0,
            delayChildren: play ? 0.1 : 0,
          },
        },
      }}
    >
      {groups.map((group) => (
        <motion.li
          key={`${group.index}-${group.line}`}
          variants={play ? arrivingRow : restingRow}
          style={{ transformOrigin: "center center" }}
        >
          <p className="text-sm leading-snug text-stone-700">{group.line}</p>
          <div className="mt-2 space-y-2">
            {group.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-stone-900">
                    {item.productName}
                    {item.optional ? (
                      <span className="ml-2 text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                        Optional
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-stone-500">
                    {item.amount} · {formatMoney(item.priceCents)}
                  </p>
                </div>
                <AddButton item={item} />
              </div>
            ))}
          </div>
        </motion.li>
      ))}
      <motion.li variants={play ? arrivingRow : restingRow} className="list-none">
        <button
          type="button"
          onClick={() => addMany(drafts)}
          className="w-full rounded-md border border-stone-200 bg-white py-2.5 text-[10px] font-bold tracking-[0.16em] text-stone-800 uppercase"
        >
          Add all to cart
        </button>
      </motion.li>
    </motion.ul>
  );
}
