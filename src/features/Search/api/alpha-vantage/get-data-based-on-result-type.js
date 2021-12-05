import { getCryptoData } from "./get-crypto-data";
import { getCurrencyData } from "./get-currency-data";
import { getStockData } from "./get-stock-data";
import * as searchType from "../../constants/result-types";

export const getDataBasedOnResultType = (type, symbol) => {
  switch (type) {
    case searchType.EQUITY:
      return getStockData(symbol);
    case searchType.CURRENCY:
      return getCurrencyData(symbol);
    case searchType.CRYPTOCURRENCY:
      return getCryptoData(symbol);
    default:
      throw new Error("Something went wrong!");
  }
};
