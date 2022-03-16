import { getCryptoData } from "./get-crypto-data";
import { getCurrencyData } from "./get-currency-data";
import { getStockData } from "./get-stock-data";
import * as resultType from "../../constants/result-types";

export const getDataBasedOnResultType = (type: string, symbol: string) => {
  switch (type) {
    case resultType.EQUITY:
      return getStockData(symbol);
    case resultType.CURRENCY:
      return getCurrencyData(symbol);
    case resultType.CRYPTOCURRENCY:
      return getCryptoData(symbol);
    default:
      throw new Error("Something went wrong! Could not find case for " + type);
  }
};
