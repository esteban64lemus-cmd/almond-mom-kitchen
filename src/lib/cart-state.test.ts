import {
  addLine,
  buildOrder,
  cartTotalCents,
  formatMoney,
  isCartLine,
  orderAfterCartEdit,
  setLineQty,
  type CartLine,
} from "./cart-state";

const chia: Omit<CartLine, "qty"> = {
  id: "organic-chia-seed",
  name: "Organic Chia Seeds",
  amount: "2 tbsp",
  priceCents: 749,
};

const milk: Omit<CartLine, "qty"> = {
  id: "unsweetened-almond-milk",
  name: "Unsweetened Almond Milk",
  amount: "1/2 cup",
  priceCents: 429,
};

describe("cart state", () => {
  it("merges the same ingredient and keeps separate products", () => {
    const once = addLine([], chia);
    const twice = addLine(once, { ...chia, amount: "1 tbsp" });
    const withMilk = addLine(twice, milk);
    expect(withMilk).toEqual([
      { ...chia, amount: "1 tbsp", qty: 2 },
      { ...milk, qty: 1 },
    ]);
  });

  it("removes a line when the quantity drops to zero", () => {
    const lines = addLine(addLine([], chia), milk);
    expect(setLineQty(lines, chia.id, 3).find((line) => line.id === chia.id)?.qty).toBe(3);
    expect(setLineQty(lines, milk.id, 0).map((line) => line.id)).toEqual([chia.id]);
  });

  it("totals the cart in cents and formats dollars", () => {
    const lines = addLine(addLine([], chia, 2), milk);
    expect(cartTotalCents(lines)).toBe(749 * 2 + 429);
    expect(formatMoney(749)).toBe("$7.49");
    expect(formatMoney(0)).toBe("$0.00");
  });

  it("snapshots an order without charging a card", () => {
    const lines = addLine([], chia, 2);
    const order = buildOrder(lines, 1_700_000_000_000);
    expect(order.id.startsWith("AM-")).toBe(true);
    expect(order.totalCents).toBe(1498);
    expect(order.lines).toEqual([{ ...chia, qty: 2 }]);
    expect(order.lines).not.toBe(lines);
    expect(order.placedAt).toBe(new Date(1_700_000_000_000).toISOString());
  });

  it("drops a previous receipt when the cart is emptied again", () => {
    const placed = buildOrder([{ ...chia, qty: 1 }], 1_700_000_000_000);
    const restocked = [{ ...chia, qty: 1 }];
    expect(orderAfterCartEdit(placed, restocked)).toBe(placed);
    expect(orderAfterCartEdit(placed, [])).toBeNull();
  });

  it("rejects stored rows that are not a real cart line", () => {
    expect(isCartLine({ ...chia, qty: 1 })).toBe(true);
    expect(isCartLine({ ...chia, qty: 0 })).toBe(false);
    expect(isCartLine({ id: "x" })).toBe(false);
    expect(isCartLine(null)).toBe(false);
  });
});
