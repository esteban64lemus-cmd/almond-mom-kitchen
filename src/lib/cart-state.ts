export type CartLine = {
  id: string;
  name: string;
  amount: string;
  priceCents: number;
  qty: number;
};

export type Order = {
  id: string;
  lines: CartLine[];
  totalCents: number;
  placedAt: string;
};

export function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.id === "string" &&
    line.id.length > 0 &&
    typeof line.name === "string" &&
    typeof line.amount === "string" &&
    typeof line.priceCents === "number" &&
    Number.isInteger(line.priceCents) &&
    line.priceCents >= 0 &&
    typeof line.qty === "number" &&
    Number.isInteger(line.qty) &&
    line.qty > 0
  );
}

export function addLine(
  lines: CartLine[],
  item: Omit<CartLine, "qty">,
  qty = 1,
): CartLine[] {
  if (qty <= 0 || !item.id) return lines;
  const existing = lines.find((line) => line.id === item.id);
  if (!existing) return [...lines, { ...item, qty }];
  return lines.map((line) =>
    line.id === item.id ? { ...line, qty: line.qty + qty, amount: item.amount } : line,
  );
}

export function setLineQty(lines: CartLine[], id: string, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((line) => line.id !== id);
  return lines.map((line) => (line.id === id ? { ...line, qty } : line));
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function cartTotalCents(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.priceCents * line.qty, 0);
}

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function orderAfterCartEdit(lastOrder: Order | null, nextLines: CartLine[]): Order | null {
  return nextLines.length === 0 ? null : lastOrder;
}

export function buildOrder(lines: CartLine[], now = Date.now()): Order {
  const snapshot = lines.map((line) => ({ ...line }));
  return {
    id: `AM-${now.toString(36).toUpperCase()}`,
    lines: snapshot,
    totalCents: cartTotalCents(snapshot),
    placedAt: new Date(now).toISOString(),
  };
}
