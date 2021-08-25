import apiKey from "./AlphaVantageKey";
import digitalCurrencyList from "./DigitalCurrencyList";

const fetchCryptoSymbols = (searchQuery) => {
  return digitalCurrencyList.filter((currency) => {
    return currency.searchParams.some((param) => {
      return param.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    });
  });
};

const fetchCryptoData = async (currencyPair) => {
  const regexMatch = currencyPair.match(
    /^(?<fromCurrency>[a-z]{3,9})\/(?<toCurrency>[a-z]{3})$/i
  );
  const fromCurrency = regexMatch.groups.fromCurrency;
  const toCurrency = regexMatch.groups.toCurrency;

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${fromCurrency}&market=${toCurrency}&outputsize=full&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const timeseriesData = data["Time Series (Digital Currency Daily)"];

    const formattedData = Object.keys(timeseriesData)
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
    return formattedData;
  } catch (error) {
    console.log(error.message);
  }
};

export { fetchCryptoSymbols, fetchCryptoData };
