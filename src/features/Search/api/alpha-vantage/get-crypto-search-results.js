import { digitalCurrencyList } from "./currency-lists/digital-currency-list";

export const getCryptoSearchResults = (searchQuery) => {
  return digitalCurrencyList.filter((currency) => {
    return currency.searchParams.some((param) => {
      return param.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    });
  });
};
