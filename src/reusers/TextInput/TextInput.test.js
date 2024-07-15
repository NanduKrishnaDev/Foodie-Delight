import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TextInput from "./TextInput";

describe("TextInput Component", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
  });

  test("should render TextInput component with a text input field", () => {
    render(
      <TextInput
        label="Name"
        text=""
        error=""
        dispatch={dispatchMock}
        field="name"
        placeholder="Enter your name"
      />
    );

    // Check if the label is rendered
    expect(screen.getByLabelText("Name")).toBeInTheDocument();

    // Check if the input field is rendered
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();

    // Check if the error message is not rendered
    expect(screen.queryByText(/Enter a valid name/)).not.toBeInTheDocument();
  });

  test("should call dispatch with SET_VALUE action when text changes", () => {
    render(
      <TextInput
        label="Name"
        text=""
        error=""
        dispatch={dispatchMock}
        field="name"
        placeholder="Enter your name"
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "John" },
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "SET_VALUE",
      payload: { field: "name", value: "John" },
    });
  });

  test("should display error message when error prop is provided", () => {
    render(
      <TextInput
        label="Name"
        text=""
        error="Name is required"
        dispatch={dispatchMock}
        field="name"
        placeholder="Enter your name"
      />
    );

    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  test("should not apply `error` class if there is no error", () => {
    render(
      <TextInput
        label="Name"
        text=""
        error=""
        dispatch={dispatchMock}
        field="name"
        placeholder="Enter your name"
      />
    );

    expect(screen.getByPlaceholderText("Enter your name")).not.toHaveClass(
      "error"
    );
  });

  test("should apply `error` class if there is an error", () => {
    render(
      <TextInput
        label="Name"
        text=""
        error="Name is required"
        dispatch={dispatchMock}
        field="name"
        placeholder="Enter your name"
      />
    );

    expect(screen.getByPlaceholderText("Enter your name")).toHaveClass("error");
  });

  test("should call dispatch with SET_ERROR action when the field is rating and rating is invalid", () => {
    render(
      <TextInput
        label="Rating"
        text=""
        error=""
        dispatch={dispatchMock}
        field="rating"
        placeholder="Enter a rating"
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter a rating"), {
      target: { value: "6" },
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "SET_ERROR",
      payload: { field: "rating", value: "Enter a valid rating" },
    });
  });
});
