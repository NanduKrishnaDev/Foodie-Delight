import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
import { useResponsive } from "../../hooks/useResponsive";
import { useNavigate } from "react-router-dom";

// Mock dependencies
jest.mock("../../hooks/useResponsive", () => ({
  useResponsive: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Header Component", () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    useResponsive.mockReturnValue({ breakPoints: { md: false, sm: false } });
  });

  test("should render header with default logo", () => {
    render(<Header />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByAltText("logo")).toHaveAttribute("src", "delivery.png");
  });

  test('should navigate to "/" on logo click', () => {
    render(<Header />);

    fireEvent.click(screen.getByAltText("logo"));

    expect(navigate).toHaveBeenCalledWith("/");
  });

  test('should navigate to "/restaurant/add" on add button click', () => {
    render(<Header />);

    fireEvent.click(screen.getByText("Add"));

    expect(navigate).toHaveBeenCalledWith("restaurant/add");
  });
});
