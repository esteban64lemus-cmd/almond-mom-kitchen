import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ShopPage from "./page";

// Mock the child components to isolate the ShopPage layout test
jest.mock("@/components/grocery-upgrader", () => {
  return function MockGroceryUpgrader() {
    return <div data-testid="mock-grocery-upgrader">Mock Grocery Upgrader</div>;
  };
});

jest.mock("@/components/bottom-nav", () => ({
  BottomNav: function MockBottomNav() {
    return <div data-testid="mock-bottom-nav">Mock Bottom Nav</div>;
  },
}));

describe("ShopPage", () => {
  it("renders the main container", () => {
    render(<ShopPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  });

  it("renders the GroceryUpgrader component", () => {
    render(<ShopPage />);
    expect(screen.getByTestId("mock-grocery-upgrader")).toBeInTheDocument();
  });

  it("renders the BottomNav component", () => {
    render(<ShopPage />);
    expect(screen.getByTestId("mock-bottom-nav")).toBeInTheDocument();
  });
});