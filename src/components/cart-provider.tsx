"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import {
  addLine,
  buildOrder,
  cartCount,
  cartTotalCents,
  isCartLine,
  orderAfterCartEdit,
  setLineQty,
  type CartLine,
  type Order,
} from "@/lib/cart-state";

const CART_STORAGE_KEY = "almond-mom-cart";
const EMPTY: CartLine[] = [];

let snapshot: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const lines = parsed.filter(isCartLine);
    return lines.length > 0 ? lines : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): CartLine[] {
  if (!loaded) {
    loaded = true;
    snapshot = readStorage();
  }
  return snapshot;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(next: CartLine[]) {
  snapshot = next.length > 0 ? next : EMPTY;
  loaded = true;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // The cart still works in memory if storage is blocked.
  }
  listeners.forEach((listener) => listener());
}

type CartItemInput = Omit<CartLine, "qty">;

type CartContextValue = {
  lines: CartLine[];
  count: number;
  totalCents: number;
  lastOrder: Order | null;
  add: (item: CartItemInput, qty?: number) => void;
  addMany: (items: CartItemInput[]) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  placeOrder: () => Order | null;
  qtyOf: (id: string) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      totalCents: cartTotalCents(lines),
      lastOrder,
      add: (item, qty = 1) => commit(addLine(getSnapshot(), item, qty)),
      addMany: (items) =>
        commit(items.reduce((next, item) => addLine(next, item, 1), getSnapshot())),
      setQty: (id, qty) => {
        const next = setLineQty(getSnapshot(), id, qty);
        commit(next);
        setLastOrder((current) => orderAfterCartEdit(current, next));
      },
      remove: (id) => {
        const next = setLineQty(getSnapshot(), id, 0);
        commit(next);
        setLastOrder((current) => orderAfterCartEdit(current, next));
      },
      placeOrder: () => {
        const current = getSnapshot();
        if (current.length === 0) return null;
        const order = buildOrder(current);
        setLastOrder(order);
        commit([]);
        return order;
      },
      qtyOf: (id) => lines.find((line) => line.id === id)?.qty ?? 0,
    }),
    [lastOrder, lines],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within CartProvider");
  return cart;
}
