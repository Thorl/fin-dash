import * as cryptoDataHandlers from "./CryptoDataHandlers";
import * as currencyDataHandlers from "./CurrencyDataHandlers";
import * as stockDataHandlers from "./StockDataHandlers";
import * as searchTypes from "../features/Search/constants/search-types";

/**
 * The function fetches data depends on the search-type that was passed
 *
 * @param {string} searchType
 * @param {string} symbol
 * @returns {Promise<unknown>}
 */
export const fetchData = (searchType, symbol) => {
    switch (searchType) {
        case searchTypes.CRYPTOCURRENCIES: {
            return cryptoDataHandlers.fetchCryptoData(symbol);
        }

        case searchTypes.CURRENCIES: {
            return currencyDataHandlers.fetchCurrencyData(symbol);
        }

        case searchTypes.STOCKS: {
            return stockDataHandlers.fetchStockData(symbol);
        }

        default: {
            throw new Error("Something went wrong!");
        }
    }
};
