import { render, screen, queryByRole } from "@testing-library/react";
import { Header } from "./Header";

describe("Header component", () => {
  beforeEach(() => {
    const mockFn = jest.fn();

    render(<Header onShowModal={mockFn} />);
  });

  test("header logo is displayed", () => {
    const logo = screen.queryByRole("img");

    expect(logo).toBeInTheDocument();
  });

  test("'Add chart'-button is displayed", () => {
    const addChartButton = screen.queryByRole("button", { name: "Add chart" });

    expect(addChartButton).toBeInTheDocument();
  });
});
