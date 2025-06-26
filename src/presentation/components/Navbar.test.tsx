import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar dropdown", () => {
  it("Does not display by default", () => {
    render(<Navbar />);
    expect(screen.queryByTestId("dropdownMenu")).not.toBeInTheDocument();
  });

  it("Displays when dropdown container is hovered", async () => {
    render(<Navbar />);

    const dropdown = screen.getByTestId("dropdown");

    expect(screen.queryByTestId("dropdownMenu")).not.toBeInTheDocument();

    await userEvent.hover(dropdown);

    expect(screen.queryByTestId("dropdownMenu")).toBeInTheDocument();
  });

  it("Does not display when dropdown container is unhovered", async () => {
    render(<Navbar />);

    const dropdown = screen.getByTestId("dropdown");

    expect(screen.queryByTestId("dropdownMenu")).not.toBeInTheDocument();

    await userEvent.hover(dropdown);

    expect(screen.queryByTestId("dropdownMenu")).toBeInTheDocument();

    await userEvent.unhover(dropdown);

    expect(screen.queryByTestId("dropdownMenu")).not.toBeInTheDocument();
  });

  it("Stays when switching hover from dropdown container to dropdown list", async () => {
    render(<Navbar />);

    const dropdown = screen.getByTestId("dropdown");

    expect(screen.queryByTestId("dropdownMenu")).not.toBeInTheDocument();

    await userEvent.hover(dropdown);

    expect(screen.queryByTestId("dropdownMenu")).toBeInTheDocument();

    const dropdownMenu = screen.getByTestId("dropdownMenu");

    // switch from dropdown container to dropdown list hover
    await userEvent.hover(dropdownMenu);
    await userEvent.unhover(dropdown);

    expect(screen.queryByTestId("dropdownMenu")).toBeInTheDocument();
  });
});
