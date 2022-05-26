import userEvent from "@testing-library/user-event";
import { render, screen, queryByText } from "@testing-library/react";

import { App } from "../App";

describe("when the modal is closed", () => {
  beforeAll(() => {
    const modalOverlay = document.createElement("div");

    modalOverlay.setAttribute("id", "modal-overlay");

    document.body.appendChild(modalOverlay);
  });

  test("the modal is NOT shown when 'Add chart'-button hasn't been clicked", () => {
    render(<App />);

    const modal = screen.queryByTestId("modalTest");

    expect(modal).toBeNull();
  });

  test("the modal is opened when the 'Add chart'-button is clicked", () => {
    render(<App />);

    const openModalButton = screen.queryByRole("button", {
      name: "Add chart",
    })!;

    userEvent.click(openModalButton);

    const modal = screen.queryByText("Search for charts");

    expect(modal).toBeInTheDocument();
  });
});

describe("when the modal is open", () => {
  beforeAll(() => {
    const modalOverlay = document.createElement("div");

    modalOverlay.setAttribute("id", "modal-overlay");

    document.body.appendChild(modalOverlay);
  });

  beforeEach(() => {
    render(<App />);

    const openModalButton = screen.queryByRole("button", {
      name: "Add chart",
    })!;

    userEvent.click(openModalButton);
  });

  test("the modal is closed when the 'X'-button is clicked", () => {
    const closeModalButton = screen
      .queryByText("Search for charts")
      ?.closest("div")
      ?.querySelector("button")!;

    userEvent.click(closeModalButton);

    const modal = screen.queryByTestId("modalTest");

    expect(modal).toBeNull();
  });

  test("the modal is closed when the area outside the modal is clicked", () => {
    const modalOverlay = screen
      .queryByText("Search for charts")
      ?.closest(".modal")!;

    userEvent.click(modalOverlay);

    const modal = screen.queryByTestId("modalTest");

    expect(modal).toBeNull();
  });
});
