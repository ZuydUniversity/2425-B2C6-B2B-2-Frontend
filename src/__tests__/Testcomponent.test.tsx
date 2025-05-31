import React from "react";
import { render } from "@testing-library/react";
import TestComponent from "../components/TestComponent";

describe("TestComponent", () => {
  it("renders without crashing", () => {
    const { container } = render(<TestComponent />);
    expect(container).not.toBeNull(); // eenvoudige check
  });
});
