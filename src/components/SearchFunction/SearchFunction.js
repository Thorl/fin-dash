import SearchResult from "./SearchResult";
import getStockSymbols from "../../Finnhub/Finnhub";
import { useRef, useEffect, useState } from "react";

const SearchFunction = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const focusSearch = useRef(null);

  useEffect(() => {
    focusSearch.current.focus();
  });

  const fetchStockSymbols = (query) => {
    return getStockSymbols(query);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadStocks = async () => {
      if (!searchQuery) return setSearchResults([]);
      setIsLoading(true);
      setSearchResults([]);

      await sleep(500);
      if (currentQuery) {
        const stocks = await fetchStockSymbols(searchQuery, controller);
        setSearchResults(stocks);
        setIsLoading(false);
      }
    };

    loadStocks();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [searchQuery]);

  return (
    <>
      <div className="modal-header">
        <h4 className="modal-title" id="stocks">
          Stocks
        </h4>
        <h4 className="modal-title" id="currencies">
          Currencies
        </h4>
        <h4 className="modal-title" id="cryptocurrencies">
          Cryptocurrencies
        </h4>
      </div>
      <div className="modal-search-field">
        <input
          type="text"
          placeholder="Enter your search here"
          onChange={(event) => setSearchQuery(event.target.value)}
          ref={focusSearch}
        ></input>
      </div>
      {isLoading && <p>Loading...</p>}
      {searchResults.map((elem, index) => (
        <SearchResult
          key={index}
          name={elem.description}
          symbol={elem.symbol}
        />
      ))}
    </>
  );
};

export default SearchFunction;
