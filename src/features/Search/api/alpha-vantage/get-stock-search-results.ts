import { apiKey } from "./alpha-vantage-key";
import * as resultType from "../../constants/result-types";

export interface StockSearchResults {
  name: string | undefined;
  symbol: string | undefined;
  type: string | undefined;
}

export const getStockSearchResults = async (
  searchQuery: string,
  signal: AbortSignal
) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${apiKey}`,
      { signal }
    );
    if (!response.ok) {
      throw new Error(
        "Something went wrong while fetching stock search results!"
      );
    }
    const data = await response.json();

    const stocksList: StockSearchResults[] | undefined = [...data.bestMatches]
      .filter((stock) => stock["3. type"] === "Equity")
      .map((stock) => {
        return {
          symbol: stock["1. symbol"],
          name: stock["2. name"],
          type: resultType.EQUITY,
        };
      });

    return stocksList;
  } catch (error: any) {
    console.error(error.message);
  }
};
