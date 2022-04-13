import {
  render,
  screen,
  queryByText,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "fetch-mock";

import { App } from "../App";

describe("adding and removing a chart", () => {
  const mockValidSearchResponse = {
    bestMatches: [
      {
        "1. symbol": "AAPL",
        "2. name": "Apple Inc",
        "3. type": "Equity",
      },
    ],
  };

  const mockValidDataResponse = {
    "Meta Data": {
      "1. Information": "Daily Prices (open, high, low, close) and Volumes",
      "2. Symbol": "AAPL",
      "3. Last Refreshed": "2022-04-11",
      "4. Output Size": "Full size",
      "5. Time Zone": "US/Eastern",
    },
    "Time Series (Daily)": {
      "2022-04-11": {
        "1. open": "168.7100",
        "2. high": "169.0300",
        "3. low": "165.5000",
        "4. close": "165.7500",
        "5. volume": "72246706",
      },
    },
  };

  beforeAll(async () => {
    const modalOverlay = document.createElement("div");

    modalOverlay.setAttribute("id", "modal-overlay");

    document.body.appendChild(modalOverlay);

    render(<App />);

    const openModalButton = screen.queryByRole("button", {
      name: "Add chart",
    })!;

    userEvent.click(openModalButton);

    fetchMock.mock(
      "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=aapl&apikey=PBKENT6HA5JNEIDY",
      mockValidSearchResponse
    );

    const inputElement = screen.getByPlaceholderText("Enter your search", {
      exact: false,
    });

    userEvent.type(inputElement, "aapl");

    await waitFor(
      () => {
        screen.getByText("AAPL");
        screen.getByText("Apple Inc");
        screen.getByText("EQUITY");
      },
      { timeout: 3000 }
    );
  });

  test("when the '+'-button next to a search result is clicked, a chart is added to the dashboard", async () => {
    fetchMock.restore();

    fetchMock.mock(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=full&apikey=PBKENT6HA5JNEIDY",
      mockValidDataResponse
    );

    const addChartButton = screen.queryByText("Apple Inc")?.nextElementSibling!
      ?.firstChild as HTMLElement;

    userEvent.click(addChartButton);

    const closeModalButton = screen
      .queryByText("Search for charts")
      ?.closest("div")
      ?.querySelector("button")!;

    userEvent.click(closeModalButton);

    const modal = screen.queryByText("Search for charts");

    expect(modal).toBeNull();

    await waitFor(
      () => {
        const chart = screen.getByText("Apple Inc");

        expect(chart).toBeInTheDocument();
      },
      { timeout: 4000 }
    );

    const chartElement = document.querySelector(".chart") as HTMLElement;

    const removeChartButton = within(chartElement).getByRole("button");

    userEvent.click(removeChartButton);

    const chart = screen.queryByText("Apple Inc");

    expect(chart).not.toBeInTheDocument();
  });
});
