import {
  AFFILIATE_DISCLOSURE,
  AMAZON_ASSOCIATES_TAG,
  getAffiliateLink,
  getAffiliateSearchLink,
} from "./Affiliate-Engine";

describe("Affiliate-Engine", () => {
  it("builds a tagged Amazon search for one ingredient", () => {
    const href = getAffiliateLink("Extra Virgin Olive Oil");
    expect(href).toContain("https://www.amazon.com/s?k=");
    expect(href).toContain(`tag=${AMAZON_ASSOCIATES_TAG}`);
    expect(href).toContain("olive");
  });

  it("builds a multi-ingredient affiliate search", () => {
    const href = getAffiliateSearchLink(["Greek yogurt", "blueberries"]);
    expect(href).toContain("greek%20yogurt");
    expect(href).toContain("blueberries");
    expect(href).toContain(`tag=${AMAZON_ASSOCIATES_TAG}`);
  });

  it("exposes FTC-friendly disclosure copy", () => {
    expect(AFFILIATE_DISCLOSURE.toLowerCase()).toContain("amazon associate");
    expect(AFFILIATE_DISCLOSURE.toLowerCase()).toContain("qualifying purchases");
  });
});
