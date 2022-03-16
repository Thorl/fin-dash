import { getStockSearchResults } from "./get-stock-search-results";
import { getCurrencySearchResults } from "./get-currency-search-results";
import { getCryptoSearchResults } from "./get-crypto-search-results";
import { StockSearchResults } from "./get-stock-search-results";
import { CurrencyList } from "../../../../ts-models/currency-list.model";

export const getSearchResults = async (
  searchQuery: string,
  signal: AbortSignal
) => {
  const stockSearchResults = await getStockSearchResults(searchQuery, signal);
  const currencySearchResults = getCurrencySearchResults(searchQuery);
  const cryptoSearchResults = getCryptoSearchResults(searchQuery);

  const searchResults: (StockSearchResults[] | CurrencyList[] | undefined)[] = [
    stockSearchResults,
    currencySearchResults,
    cryptoSearchResults,
  ];

  return searchResults.flat().filter((result, index) => result && index < 999);
};
