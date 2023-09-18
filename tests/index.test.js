/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../src/pages/index";

describe("Home Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Home />);
    const headingElement = getByText("14.1 Scorecard");
    expect(headingElement).toBeInTheDocument();
  });

  it("should render the initial state", () => {
    render(<Home />);

    expect(screen.getByText("Player 1")).toBeInTheDocument();
    expect(screen.getByText("Player 2")).toBeInTheDocument();
    expect(screen.getByText("Remaining in Rack: 15")).toBeInTheDocument();
  });

  it("should allow editing player names", () => {
    render(<Home />);

    const editButton1 = screen.getByText("Player 1").nextSibling;
    fireEvent.click(editButton1);

    const nameInput1 = screen.getByDisplayValue("Player 1");

    fireEvent.change(nameInput1, { target: { value: "New Player 1" } });

    const checkmarkButton1 = screen.getAllByRole("button")[0];
    fireEvent.click(checkmarkButton1);

    // Assert that the updated name is displayed
    expect(screen.getByText("New Player 1")).toBeInTheDocument();
  });

  it("should increment and decrement scores", () => {
    render(<Home />);

    const plusButton1 = screen.getAllByText("+")[0];
    const plusButton2 = screen.getAllByText("+")[1];

    fireEvent.click(plusButton1);
    fireEvent.click(plusButton2);

    expect(screen.getAllByText("1")[0]).toBeInTheDocument();
    expect(screen.getAllByText("1")[1]).toBeInTheDocument();

    // Find and click the minus button for player 1
    const minusButton1 = screen.getAllByText("-")[0];
    const minusButton2 = screen.getAllByText("-")[1];

    fireEvent.click(minusButton1);
    fireEvent.click(minusButton2);

    // Assert that the score is decremented
    expect(screen.getAllByText("0")[0]).toBeInTheDocument();
    expect(screen.getAllByText("0")[1]).toBeInTheDocument();
  });
});
