import HomePage from "./index";
import {render} from "@testing-library/react";

describe("HomePage", () => {
  it("renders an h1 element", () => {
    const { container } = render(<HomePage />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
  });
});
