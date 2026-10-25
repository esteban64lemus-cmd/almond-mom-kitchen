"use client";

import Link from "next/link";
import { formatMoney } from "@/lib/cart-state";
import { useCart } from "@/components/cart-provider";
import { CartLink } from "@/components/cart-link";

export default function CartPage() {
  const { lines, totalCents, lastOrder, setQty, remove, placeOrder } = useCart();

  return (
    <div className="min-h-screen bg-[#FDFCFB] px-6 py-8 text-stone-800">
      <div className="mx-auto w-full max-w-2xl">
        <nav className="mb-8 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase"
          >
            ← Meals
          </Link>
          <CartLink />
        </nav>

        {lines.length === 0 && lastOrder ? (
          <Receipt />
        ) : lines.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <h1 className="mb-2 font-serif text-4xl text-stone-800 italic">Your cart</h1>
            <p className="mb-8 text-sm text-stone-500">
              Ingredients from the meals you opened. Adjust quantities, then buy.
            </p>
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="rounded-3xl border border-stone-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-stone-900">{line.name}</p>
                      <p className="text-xs text-stone-500">
                        {line.amount} · {formatMoney(line.priceCents)} each
                      </p>
                    </div>
                    <p className="font-semibold text-stone-900">
                      {formatMoney(line.priceCents * line.qty)}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Decrease ${line.name}`}
                        onClick={() => setQty(line.id, line.qty - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-700"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${line.name}`}
                        onClick={() => setQty(line.id, line.qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-700"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${line.name}`}
                      onClick={() => remove(line.id)}
                      className="text-[10px] font-bold tracking-[0.16em] text-stone-400 uppercase"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-3xl bg-stone-900 p-6 text-white">
              <div className="mb-5 flex items-baseline justify-between">
                <span className="text-[10px] font-bold tracking-[0.18em] text-white/60 uppercase">
                  Subtotal
                </span>
                <span className="font-serif text-3xl italic">{formatMoney(totalCents)}</span>
              </div>
              <button
                type="button"
                onClick={() => placeOrder()}
                className="w-full rounded-2xl bg-white py-3 text-[11px] font-bold tracking-[0.18em] text-stone-900 uppercase"
              >
                Buy ingredients
              </button>
              <p className="mt-3 text-center text-xs text-white/60">
                Demo checkout. Nothing is charged.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="rounded-3xl border border-stone-100 bg-white px-6 py-16 text-center">
      <h1 className="mb-3 font-serif text-4xl text-stone-800 italic">Your cart</h1>
      <p className="mb-8 text-sm text-stone-500">
        Nothing here yet. Open a meal and add the ingredients you want to buy.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex rounded-2xl bg-stone-900 px-5 py-3 text-[10px] font-bold tracking-[0.18em] text-white uppercase"
      >
        Back to meals
      </Link>
    </div>
  );
}

function Receipt() {
  const { lastOrder } = useCart();
  if (!lastOrder) return null;

  return (
    <div>
      <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
        Order placed
      </p>
      <h1 className="mb-2 font-serif text-4xl text-stone-800 italic">{lastOrder.id}</h1>
      <p className="mb-8 text-sm text-stone-500">
        Demo checkout. Nothing was charged — this kitchen does not take payment yet.
      </p>
      <ul className="space-y-3">
        {lastOrder.lines.map((line) => (
          <li
            key={line.id}
            className="flex items-start justify-between gap-3 rounded-3xl border border-stone-100 bg-white p-4"
          >
            <div>
              <p className="font-medium text-stone-900">
                {line.name}
                <span className="ml-2 text-stone-400">× {line.qty}</span>
              </p>
              <p className="text-xs text-stone-500">{line.amount}</p>
            </div>
            <p className="font-semibold">{formatMoney(line.priceCents * line.qty)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-baseline justify-between">
        <span className="text-[10px] font-bold tracking-[0.18em] text-stone-400 uppercase">
          Total
        </span>
        <span className="font-serif text-3xl italic">{formatMoney(lastOrder.totalCents)}</span>
      </div>
      <Link
        href="/dashboard"
        className="mt-8 inline-flex rounded-2xl bg-stone-900 px-5 py-3 text-[10px] font-bold tracking-[0.18em] text-white uppercase"
      >
        Back to meals
      </Link>
    </div>
  );
}
