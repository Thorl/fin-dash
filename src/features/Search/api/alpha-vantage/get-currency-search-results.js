import { physicalCurrencyList } from "./currency-lists/physical-currency-list";

export const getCurrencySearchResults = (searchQuery) => {
  return physicalCurrencyList.filter((currency) => {
    return currency.searchParams.some((param) => {
      return param.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    });
  });
};
