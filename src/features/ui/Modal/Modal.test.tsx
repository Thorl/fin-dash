import { render, screen } from "@testing-library/react";

import { Modal } from "./Modal";

describe("Modal component", () => {
  beforeAll(() => {
    const modalOverlay = document.createElement("div");

    modalOverlay.setAttribute("id", "modal-overlay");

    document.body.appendChild(modalOverlay);
  });

  beforeEach(() => {
    const mockFn = jest.fn();

    render(
      <Modal isModalShowing={true} onShowModal={mockFn} onAddChart={mockFn} />
    );
  });

  test("headers are showing", () => {
    const modalTitle = screen.getByText("Search for charts");
    const typeColumn = screen.getByText("Type");
    const symbolColumn = screen.getByText("Symbol");
    const nameColumn = screen.getByText("Name");

    expect(modalTitle).toBeInTheDocument();
    expect(typeColumn).toBeInTheDocument();
    expect(symbolColumn).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
  });
});
