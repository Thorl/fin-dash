import { fetchStockSymbols } from "./StockDataHandlers";
import { fetchCurrencySymbols } from "./CurrencyDataHandlers";
import { fetchCryptoSymbols } from "./CryptoDataHandlers";

const fetchSymbolHandler = async (searchQuery) => {
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

export default fetchSymbolHandler;
