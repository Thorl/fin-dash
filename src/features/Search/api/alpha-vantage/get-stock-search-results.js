import * as searchTypes from "../../constants/result-types";

export const getStockSearchResults = async (searchQuery, signal) => {
  let apiKey;

  fetch(".netlify/functions/api")
    .then((response) => response.json())
    .then((json) => {
      apiKey = json.api;
    });

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${apiKey}`,
      { signal }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    const stocksList = [...data.bestMatches]
      .filter((stock) => stock["3. type"] === "Equity")
      .map((stock) => {
        return {
          symbol: stock["1. symbol"],
          name: stock["2. name"],
          type: searchTypes.EQUITY,
        };
      });

    return stocksList;
  } catch (error) {
    console.log(error.message);
  }
};
