import { apiKey } from "./alpha-vantage-key";
import { physicalCurrencyList } from "./currency-lists/physical-currency-list";

export const fetchCurrencySymbols = (searchQuery) => {
  return physicalCurrencyList.filter((currency) => {
    return currency.searchParams.some((param) => {
      return param.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    });
  });
};

export const fetchCurrencyData = async (currencyPair) => {
  const regexMatch = currencyPair.match(
    /^(?<fromCurrency>[a-z]{3})\/(?<toCurrency>[a-z]{3})$/i
  );
  const fromCurrency = regexMatch.groups.fromCurrency;
  const toCurrency = regexMatch.groups.toCurrency;

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&outputsize=full&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const timeseriesData = data["Time Series FX (Daily)"];

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
  } catch (error) {
    console.log(error.message);
  }
};
