import apiKey from "./AlphaVantageKey";

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

    const formattedData = Object.keys(timeseriesData)
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
    return formattedData;
  } catch (error) {
    console.log(error.message);
  }
};

export { fetchStockSymbols, fetchStockData };
