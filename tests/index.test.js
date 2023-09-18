/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const title = screen.getByText("14.1 Scorecard");

    expect(title).toBeInTheDocument();
  });
});
