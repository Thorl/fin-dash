import * as searchTypes from "./constants/search-types";

/**
 * @param {string} searchType
 * @returns {string}
 */
export const getPlaceholderText = (searchType) => {
    switch (searchType) {
        case searchTypes.CURRENCIES: {
            return "'eurusd' or 'gbp/jpy'";
        }

        case searchTypes.CRYPTOCURRENCIES: {
            return "'btc/eur' or 'Ethereum/United States Dollar'";
        }

        case searchTypes.STOCKS:
        default: {
            return "'aapl' or 'Apple'";
        }
    }
};
