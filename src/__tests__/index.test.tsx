import Home from "../pages/index";
import { render } from "@testing-library/react";

describe("Home", () => {
  it("renders an h1 element", () => {
    const { container } = render(<Home />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
  });
});
