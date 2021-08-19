import apiKey from "./AlphaVantageKey";
import physicalCurrencyList from "./PhysicalCurrencyList";

const fetchStockSymbols = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    const loadedStocks = [...data.bestMatches]
      .filter((stock) => stock["3. type"] === "Equity")
      .map((stock) => {
        return { symbol: stock["1. symbol"], name: stock["2. name"] };
      });

    return loadedStocks;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchStockData = async (stockSymbol) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    const timeseriesData = data["Time Series (Daily)"];

    const reformattedData = Object.keys(timeseriesData)
      .sort()
      .map((key) => {
        const formatDate = key.split("-");
        return [
          Date.UTC(formatDate[0], formatDate[1] - 1, formatDate[2]),
          +timeseriesData[key]["1. open"],
          +timeseriesData[key]["2. high"],
          +timeseriesData[key]["3. low"],
          +timeseriesData[key]["4. close"],
        ];
      });
    return reformattedData;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchCurrencySymbols = (currencyPair) => {
  const firstCurrencySymbol = currencyPair.match(/^[a-z]{3}/i);

  const secondCurrencySymbol = currencyPair.match(
    /^([a-z]{3}\/?)([a-z]{1,3})$/i
  );

  if (
    firstCurrencySymbol &&
    physicalCurrencyList.some(
      (el) =>
        el.symbol.toLowerCase().indexOf(firstCurrencySymbol[0].toLowerCase()) >
        -1
    ) &&
    !secondCurrencySymbol
  ) {
    const firstCurrencyName = physicalCurrencyList.filter(
      (currency) =>
        currency.symbol
          .toLowerCase()
          .indexOf(firstCurrencySymbol[0].toLowerCase()) > -1
    );
    const searchResults = physicalCurrencyList
      .filter(
        (currency) =>
          currency.symbol.toLowerCase() !== firstCurrencySymbol[0].toLowerCase()
      )
      .map((currency) => {
        return {
          symbol: `${firstCurrencySymbol[0].toUpperCase()}/${currency.symbol}`,
          name: `${firstCurrencyName[0].name}/${currency.name}`,
        };
      });
    return searchResults;
  } else if (
    firstCurrencySymbol &&
    secondCurrencySymbol &&
    physicalCurrencyList.some(
      (currency) =>
        currency.symbol
          .toLowerCase()
          .indexOf(secondCurrencySymbol[2].toLowerCase()) > -1
    )
  ) {
    const firstCurrencyName = physicalCurrencyList.filter(
      (currency) =>
        currency.symbol.toLowerCase() === firstCurrencySymbol[0].toLowerCase()
    );
    const searchResults = physicalCurrencyList
      .filter(
        (currency) =>
          currency.symbol.toLowerCase() !== firstCurrencySymbol[0].toLowerCase()
      )
      .map((currency) => {
        return {
          symbol: `${firstCurrencySymbol[0].toUpperCase()}/${currency.symbol}`,
          name: `${firstCurrencyName[0].name}/${currency.name}`,
        };
      });

    return searchResults.filter((currency) => {
      return (
        currency.symbol
          .match(/([a-z]{3})$/i)[0]
          .toLowerCase()
          .indexOf(secondCurrencySymbol[2].toLowerCase()) > -1
      );
    });
  } else {
    return [];
  }
};

const fetchCurrencyData = async (currencyPair) => {
  const regexMatch = currencyPair.match(
    /^(?<fromCurrency>[a-z]{3})\/(?<toCurrency>[a-z]{3})$/i
  );
  const fromCurrency = regexMatch.groups.fromCurrency;
  const toCurrency = regexMatch.groups.toCurrency;

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&interval=60min&outputsize=full&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const timeseriesData = data["Time Series FX (Daily)"];

    const reformattedData = Object.keys(timeseriesData)
      .sort()
      .map((key) => {
        const formatDate = key.split("-");
        return [
          Date.UTC(formatDate[0], formatDate[1] - 1, formatDate[2]),
          +timeseriesData[key]["1. open"],
          +timeseriesData[key]["2. high"],
          +timeseriesData[key]["3. low"],
          +timeseriesData[key]["4. close"],
        ];
      });
    return reformattedData;
  } catch (error) {
    console.log(error.message);
  }
};

export {
  fetchStockSymbols,
  fetchStockData,
  fetchCurrencyData,
  fetchCurrencySymbols,
};
