import { apiKey } from "./alpha-vantage-key";

export const getStockData = async (stockSymbol) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&outputsize=full&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    const timeseriesData = data["Time Series (Daily)"];

    if (!timeseriesData) {
      return [];
    } else {
      return Object.keys(timeseriesData)
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
    }
  } catch (error) {
    console.log(error.message);
  }
};
