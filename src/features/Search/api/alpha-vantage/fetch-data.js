import { fetchCryptoData } from "./crypto-data-handlers";
import { fetchCurrencyData } from "./currency-data-handlers";
import { fetchStockData } from "./stock-data-handlers";
import * as searchType from "../../constants/search-types";

export const fetchData = (type, symbol) => {
  switch (type) {
    case searchType.EQUITY:
      return fetchStockData(symbol);
    case searchType.CURRENCY:
      return fetchCurrencyData(symbol);
    case searchType.CRYPTOCURRENCY:
      return fetchCryptoData(symbol);
    default:
      throw new Error("Something went wrong!");
  }
};
