import { apiKey } from "./alpha-vantage-key";
import * as searchTypes from "../../constants/result-types";

export const getStockSearchResults = async (searchQuery, signal) => {
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
