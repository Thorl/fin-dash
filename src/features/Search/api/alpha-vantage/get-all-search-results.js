import { getStockSearchResults } from "./get-stock-search-results";
import { getCurrencySearchResults } from "./get-currency-search-results";
import { getCryptoSearchResults } from "./get-crypto-search-results";

export const getAllSearchResults = async (searchQuery, signal) => {
  const searchResults = [];

  const stockSearchResults = await getStockSearchResults(searchQuery, signal);
  const currencySearchResults = getCurrencySearchResults(searchQuery);
  const cryptoSearchResults = getCryptoSearchResults(searchQuery);

  searchResults.push(
    stockSearchResults,
    currencySearchResults,
    cryptoSearchResults
  );

  const mergedSearchResults = searchResults
    .filter((obj) => obj && obj.length > 0)
    .flat()
    .filter((obj, index) => index < 999);

  return mergedSearchResults;
};
