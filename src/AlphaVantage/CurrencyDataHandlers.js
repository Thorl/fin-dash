import apiKey from "./AlphaVantageKey";
import physicalCurrencyList from "./PhysicalCurrencyList";

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
        currency.symbol.toLowerCase() === firstCurrencySymbol[0].toLowerCase()
    );
    return physicalCurrencyList
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
    return physicalCurrencyList
      .filter(
        (currency) =>
          currency.symbol.toLowerCase() !== firstCurrencySymbol[0].toLowerCase()
      )
      .map((currency) => {
        return {
          symbol: `${firstCurrencySymbol[0].toUpperCase()}/${currency.symbol}`,
          name: `${firstCurrencyName[0].name}/${currency.name}`,
        };
      })
      .filter((currency) => {
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

export { fetchCurrencyData, fetchCurrencySymbols };
