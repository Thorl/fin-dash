import SearchResult from "./SearchResult";
import "./SearchFunction.css";
import fetchSymbolHandler from "../../AlphaVantage/FetchSymbolHandler";
import { useRef, useEffect, useState } from "react";

const SearchFunction = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const focusSearch = useRef(null);

  useEffect(() => {
    focusSearch.current.focus();
  });

  const loadSymbols = (query) => {
    return fetchSymbolHandler(query);
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
      if (currentQuery) {
        const results = await loadSymbols(searchQuery, controller);
        setSearchResults(results);
        setIsLoading(false);
      }
    };

    loadSearchResults();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [searchQuery]);

  return (
    <>
      <div className="modal-header">
        <h4>Search</h4>
      </div>
      <div className="modal-search-field">
        <input
          type="text"
          placeholder="Enter your search for a stock ticker or company name, currency pair, or crypto/fiat currency pair."
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
          type={elem.type}
          onAddChart={props.onAddChart}
        />
      ))}
    </>
  );
};

export default SearchFunction;
