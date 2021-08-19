import SearchResult from "./SearchResult";
import "./SearchFunction.css";
import {
  fetchStockSymbols,
  fetchCurrencySymbols,
} from "../../AlphaVantage/AlphaVantage";
import { useRef, useEffect, useState } from "react";

const SearchFunction = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState("Stocks");
  const focusSearch = useRef(null);

  useEffect(() => {
    focusSearch.current.focus();
  });

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

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

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
        case "Stocks":
          if (currentQuery) {
            const stocks = await loadStockSymbols(searchQuery, controller);
            setSearchResults(stocks);
            setIsLoading(false);
          }
          break;
        case "Currencies":
          if (currentQuery) {
            const currencies = await loadCurrencySymbols(
              searchQuery,
              controller
            );
            setSearchResults(currencies);
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
    <>
      <div className="modal-header">
        <h4
          className={`modal-title ${searchType === "Stocks" ? "active" : ""}`}
          onClick={() => changeSearchType("Stocks")}
        >
          Stocks
        </h4>
        <h4
          className={`modal-title ${
            searchType === "Currencies" ? "active" : ""
          }`}
          onClick={() => changeSearchType("Currencies")}
        >
          Currencies
        </h4>
        <h4
          className={`modal-title ${
            searchType === "Cryptocurrencies" ? "active" : ""
          }`}
          onClick={() => changeSearchType("Cryptocurrencies")}
        >
          Cryptocurrencies
        </h4>
      </div>
      <div className="modal-search-field">
        <input
          type="text"
          placeholder="Enter your search here"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          ref={focusSearch}
        ></input>
      </div>
      {isLoading && <p>Loading...</p>}
      {searchResults.map((elem, index) => (
        <SearchResult
          key={index}
          symbol={elem.symbol}
          name={elem.name}
          searchType={searchType}
          onAddChart={props.onAddChart}
        />
      ))}
    </>
  );
};

export default SearchFunction;
