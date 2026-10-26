import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ShopPage from "./page";
import { CartProvider } from "@/components/cart-provider";

// Mock the child components to isolate the ShopPage layout test
jest.mock("@/components/grocery-upgrader", () => {
  return function MockGroceryUpgrader() {
    return <div data-testid="mock-grocery-upgrader">Mock Grocery Upgrader</div>;
  };
});

jest.mock("@/components/bottom-nav", () => ({
  __esModule: true,
  default: function MockBottomNav() {
    return <div data-testid="mock-bottom-nav">Mock Bottom Nav</div>;
  },
}));

function renderShop() {
  return render(
    <CartProvider>
      <ShopPage />
    </CartProvider>,
  );
}

describe("ShopPage", () => {
  it("renders the main container", () => {
    renderShop();
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  });

  it("renders the GroceryUpgrader component", () => {
    renderShop();
    expect(screen.getByTestId("mock-grocery-upgrader")).toBeInTheDocument();
  });

  it("renders the BottomNav component", () => {
    renderShop();
    expect(screen.getByTestId("mock-bottom-nav")).toBeInTheDocument();
  });
});