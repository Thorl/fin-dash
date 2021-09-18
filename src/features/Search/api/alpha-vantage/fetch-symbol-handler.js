import { fetchStockSymbols } from "./stock-data-handlers";
import { fetchCurrencySymbols } from "./currency-data-handlers";
import { fetchCryptoSymbols } from "./crypto-data-handlers";

export const fetchSymbolHandler = async (searchQuery) => {
  const searchResults = [];

  const stockSearchResults = await fetchStockSymbols(searchQuery);
  const currencySearchResults = fetchCurrencySymbols(searchQuery);
  const cryptoSearchResults = fetchCryptoSymbols(searchQuery);

  searchResults.push(
    stockSearchResults,
    currencySearchResults,
    cryptoSearchResults
  );

  const mergedSearchResults = searchResults
    .filter((obj) => obj.length > 0)
    .flat()
    .filter((obj, index) => index < 999);

  return mergedSearchResults;
};