import { render, screen, queryByText, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "fetch-mock";

import { App } from "../App";

describe("when a search is made", () => {
  const mockValidResponse = {
    bestMatches: [
      {
        "1. symbol": "AAPL",
        "2. name": "Apple Inc",
        "3. type": "Equity",
      },
    ],
  };

  const mockInvalidResponse = {
    bestMatches: [],
  };

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

  afterEach(() => {
    fetchMock.restore();
  });

  test("the 'no results found' text is NOT visible before a search has been made", () => {
    const noResultsFoundText = screen.queryByText(
      "No results found. Please try another search."
    );

    expect(noResultsFoundText).not.toBeInTheDocument();
  });

  test("a list of results are returned when a valid search is made", async () => {
    fetchMock.mock(
      "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=aapl&apikey=PBKENT6HA5JNEIDY",
      mockValidResponse
    );

    const inputElement = screen.getByPlaceholderText("Enter your search", {
      exact: false,
    });

    userEvent.type(inputElement, "aapl");

    await waitFor(() => {
      const loadingText = screen.getByText("Loading...");

      expect(loadingText).toBeInTheDocument();
    }).then();

    await waitFor(
      () => {
        const searchResultSymbol = screen.getByText("AAPL");
        const searchResultName = screen.getByText("Apple Inc");
        const searchResultType = screen.getByText("EQUITY");

        expect(searchResultSymbol).toBeInTheDocument();
        expect(searchResultName).toBeInTheDocument();
        expect(searchResultType).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const noResultsFoundText = screen.queryByText(
      "No results found. Please try another search."
    );
    expect(noResultsFoundText).toBeNull();

    const loadingText = screen.queryByText("Loading...");
    expect(loadingText).toBeNull();
  });

  test("the 'no results found' text IS visible when no results are found", async () => {
    fetchMock.mock(
      "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=aapl&apikey=PBKENT6HA5JNEIDY",
      mockInvalidResponse
    );

    const inputElement = screen.getByPlaceholderText("Enter your search", {
      exact: false,
    });

    userEvent.type(inputElement, "aapl");

    await waitFor(() => {
      const loadingText = screen.getByText("Loading...");

      expect(loadingText).toBeInTheDocument();
    }).then();

    const noResultsFoundText = screen.queryByText(
      "No results found. Please try another search."
    );
    expect(noResultsFoundText).toBeInTheDocument();

    const loadingText = screen.queryByText("Loading...");
    expect(loadingText).toBeNull();
  });
});
