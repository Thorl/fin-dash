import { apiKey } from "./alpha-vantage-key.js";

export const getCryptoData = async (currencyPair) => {
  const splitCurrencyPair = currencyPair.split("/");

  const fromCurrency = splitCurrencyPair[0];
  const toCurrency = splitCurrencyPair[1];

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${fromCurrency}&market=${toCurrency}&outputsize=full&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const timeseriesData = data["Time Series (Digital Currency Daily)"];

    if (!timeseriesData) {
      return [];
    } else {
      return Object.keys(timeseriesData)
        .sort()
        .map((key) => {
          const formatDate = key.split("-");
          return [
            Date.UTC(formatDate[0], formatDate[1] - 1, formatDate[2]),
            +timeseriesData[key][`1a. open (${toCurrency})`],
            +timeseriesData[key][`2a. high (${toCurrency})`],
            +timeseriesData[key][`3a. low (${toCurrency})`],
            +timeseriesData[key][`4a. close (${toCurrency})`],
          ];
        });
    }
  } catch (error) {
    console.error(error.message);
  }
};
