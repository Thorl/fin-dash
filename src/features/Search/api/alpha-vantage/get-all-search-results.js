import { getStockSearchResults } from "./get-stock-search-results";
import { getCurrencySearchResults } from "./get-currency-search-results";
import { getCryptoSearchResults } from "./get-crypto-search-results";

export const getAllSearchResults = async (searchQuery, signal) => {
  const stockSearchResults = await getStockSearchResults(searchQuery, signal);
  const currencySearchResults = getCurrencySearchResults(searchQuery);
  const cryptoSearchResults = getCryptoSearchResults(searchQuery);

  const searchResults = [
    stockSearchResults,
    currencySearchResults,
    cryptoSearchResults,
  ];

  return searchResults.flat().filter((result, index) => result && index < 999);
};
