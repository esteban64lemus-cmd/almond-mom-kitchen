import { render, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField", () => {
  it("renders the label correctly", () => {
    render(<InputField label="Email Address" />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("associates the label with the input element for accessibility", () => {
    render(<InputField label="Password" />);
    // getByLabelText will fail if the htmlFor and id don't match
    const input = screen.getByLabelText("Password");
    expect(input).toBeInTheDocument();
  });

  it("passes additional standard HTML props to the input element", () => {
    render(
      <InputField
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="Jane Doe"
        required
      />
    );
    const input = screen.getByLabelText("Full Name");
    expect(input).toHaveAttribute("name", "fullName");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Jane Doe");
    expect(input).toBeRequired();
  });

  it("applies custom className while retaining base styles", () => {
    render(<InputField label="Custom Class" className="border-red-500" />);
    const input = screen.getByLabelText("Custom Class");
    
    expect(input).toHaveClass("border-red-500");
    // Ensure it keeps the default base classes
    expect(input).toHaveClass("w-full", "rounded-full");
  });
});