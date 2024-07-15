import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

describe("Button Component", () => {
  test("renders Button component with a label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("renders Button component without a label", () => {
    render(<Button icon="/path/to/icon.png" onClick={() => {}} />);

    expect(screen.queryByText("Click Me")).not.toBeInTheDocument();
  });

  test("renders Button component without an icon", () => {
    render(<Button label="Click Me" onClick={() => {}} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick function when button is disabled", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} disabled={true} />);

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("does not have `button-green` class by default", () => {
    render(<Button label="Click Me" onClick={() => {}} />);

    expect(screen.getByText("Click Me")).not.toHaveClass("button-green");
  });

  test("renders the Button component with both icon and label", () => {
    render(
      <Button label="Click Me" icon="/path/to/icon.png" onClick={() => {}} />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("does not have the `disabled` attribute by default", () => {
    render(<Button label="Click Me" onClick={() => {}} />);

    expect(screen.getByText("Click Me")).not.toBeDisabled();
  });
});
