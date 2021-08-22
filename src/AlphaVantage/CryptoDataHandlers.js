import apiKey from "./AlphaVantageKey";
import digitalCurrencyList from "./DigitalCurrencyList";
import physicalCurrencyList from "./PhysicalCurrencyList";

const fetchCryptoSymbols = (currencyPair) => {
  const firstCurrencySymbol = currencyPair.match(/^([a-z]{3,9})(\/)/i);

  const secondCurrencySymbol = currencyPair.match(
    /^([a-z]{3,9}\/)([a-z]{1,3})$/i
  );

  if (
    firstCurrencySymbol &&
    digitalCurrencyList.some(
      (currency) =>
        currency.symbol
          .toLowerCase()
          .indexOf(firstCurrencySymbol[1].toLowerCase()) > -1
    ) &&
    !secondCurrencySymbol
  ) {
    // Bug to fix: When 3+ letters match in a search, but the user then puts a forward slash
    // before the whole name is entered. Leads to a crash because "cannot read property 'name' of undefined".

    const firstCurrencyName = digitalCurrencyList.filter(
      (currency) =>
        currency.symbol.toLowerCase() === firstCurrencySymbol[1].toLowerCase()
    );
    return physicalCurrencyList.map((currency) => {
      return {
        symbol: `${firstCurrencySymbol[1].toUpperCase()}/${currency.symbol}`,
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
    const firstCurrencyName = digitalCurrencyList.filter(
      (currency) =>
        currency.symbol.toLowerCase() === firstCurrencySymbol[1].toLowerCase()
    );
    return physicalCurrencyList
      .filter(
        (currency) =>
          currency.symbol.toLowerCase() !== firstCurrencySymbol[1].toLowerCase()
      )
      .map((currency) => {
        return {
          symbol: `${firstCurrencySymbol[1].toUpperCase()}/${currency.symbol}`,
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

const fetchCryptoData = async (currencyPair) => {
  const regexMatch = currencyPair.match(
    /^(?<fromCurrency>[a-z]{3,9})\/(?<toCurrency>[a-z]{3})$/i
  );
  const fromCurrency = regexMatch.groups.fromCurrency;
  const toCurrency = regexMatch.groups.toCurrency;
  console.log(fromCurrency, toCurrency);

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${fromCurrency}&market=${toCurrency}&outputsize=full&apikey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    console.log(data);

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
    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.log(error.message);
  }
};

export { fetchCryptoSymbols, fetchCryptoData };
