import { fetchStockSymbols } from "../../AlphaVantage/StockDataHandlers";
import { fetchCurrencySymbols } from "../../AlphaVantage/CurrencyDataHandlers";
import { useRef, useEffect, useState, Fragment } from "react";
import { fetchCryptoSymbols } from "../../AlphaVantage/CryptoDataHandlers";
import {SearchResult} from "./components/result";

import {NavigationItem} from "./components/navigation-item";
import {fetchData} from "../../AlphaVantage";
import * as searchTypes from './constants/search-types';
import {v4 as uuid} from "uuid";

import * as utils from './utils';
import * as styles from './index.module.css';

/**
 * @TODO We can split this Feature to diff sub-component like navigation, input and results it will be easier for
 * us as developers to read and understand the purpose of the component
 */
export const Search = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState(searchTypes.STOCKS);
  const focusSearch = useRef(null);

  useEffect(() => {
    if (props.show) {
      focusSearch.current.focus();
    }
  }, [props.show]);

  const changeSearchType = (event) => {
    setSearchType(event);
    setSearchQuery("");
  };

  const loadStockSymbols = (query) => {
    return fetchStockSymbols(query);
  };

  const loadCurrencySymbols = (query) => {
    return fetchCurrencySymbols(query);
  };

  const loadCryptoSymbols = (query) => {
    return fetchCryptoSymbols(query);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Todo this shouldn't be happning in useEffect but rather onChange
  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadSearchResults = async () => {
      if (!searchQuery) {
        setIsLoading(false);
        return setSearchResults([]);
      }

      setIsLoading(true);
      setSearchResults([]);

      await sleep(500);
      switch (searchType) {
        case searchTypes.STOCKS:
          if (currentQuery) {
            const stocks = loadStockSymbols(searchQuery, controller);
            setSearchResults(stocks);
            setIsLoading(false);
          }
          break;
        case searchTypes.CURRENCIES:
          if (currentQuery) {
            const currencies = loadCurrencySymbols(searchQuery, controller);
            setSearchResults(currencies);
            setIsLoading(false);
          }
          break;
        case searchTypes.CRYPTOCURRENCIES:
          if (currentQuery) {
            const cryptocurrencies = loadCryptoSymbols(searchQuery, controller);
            setSearchResults(cryptocurrencies);
            setIsLoading(false);
          }
          break;
        default:
          setSearchResults([]);
          setIsLoading(false);
      }
    };

    loadSearchResults();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [searchQuery, searchType]);

  return (
    <Fragment>
      <div className={styles.modalHeader}>
        <NavigationItem
          active={searchType === searchTypes.STOCKS}
          text="Stocks"
          onClick={() => changeSearchType(searchTypes.STOCKS)}
        />
        <NavigationItem
            active={searchType === searchTypes.CURRENCIES}
            text="Currencies"
            onClick={() => changeSearchType(searchTypes.CURRENCIES)}
        />
        <NavigationItem
            active={searchType === searchTypes.CRYPTOCURRENCIES}
            text="Cryptocurrencies"
            onClick={() => changeSearchType(searchTypes.CRYPTOCURRENCIES)}
        />
      </div>
      <div className={styles.modalSearchField}>
        <input
            className={styles.modalSearchField_input}
            type="text"
            placeholder={`Enter your search here, e.g. ${utils.getPlaceholderText(searchType)}`}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            ref={focusSearch}
        />
      </div>
      {
        isLoading &&
        <p className={styles.loading}>Loading...</p>
      }
      {
        searchResults.map((elem, index) => {
          const onClick = async () => {
            props.onAddChart({
              id: uuid(),
              name: props.name,
              data: await fetchData(searchType, elem.symbol),
            });
          };

          return (
            <SearchResult
              key={index}
              symbol={elem.symbol}
              name={elem.name}
              onClick={onClick}
            />
          );
        })
      }
    </Fragment>
  );
};
