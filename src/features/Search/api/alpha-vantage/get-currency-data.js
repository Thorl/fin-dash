import { apiKey } from "./alpha-vantage-key.js";

export const getCurrencyData = async (currencyPair) => {
  const splitCurrencyPair = currencyPair.split("/");

  const fromCurrency = splitCurrencyPair[0];
  const toCurrency = splitCurrencyPair[1];

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&outputsize=full&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const timeseriesData = data["Time Series FX (Daily)"];

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
