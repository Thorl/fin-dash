import Result from "./components/Result/Result";
import * as styles from "./Search.module.css";
import fetchSymbolHandler from "./api/alpha-vantage/fetch-symbol-handler";
import { useRef, useEffect, useState } from "react";

const Search = (props) => {
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
      <div className={styles["SearchField"]}>
        <input
          className={styles["SearchField__Input"]}
          type="text"
          placeholder="Enter your search for a stock ticker or company name, currency pair, or crypto/fiat currency pair."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          ref={focusSearch}
        ></input>
      </div>
      <div className={styles["SearchResultsGrid"]}>
        <div className={styles["SearchResultsHeader"]}>
          <div>Type</div>
        </div>
        <div className={styles["SearchResultsHeader"]}>
          <div>Symbol</div>
        </div>
        <div
          className={`${styles["SearchResultsHeader"]} 
          ${styles["SearchResultsHeader__Name"]}`}
        >
          <div>Name</div>
        </div>
        {isLoading && <p>Loading...</p>}
        {searchResults.map((elem, index) => (
          <Result
            key={index}
            symbol={elem.symbol}
            name={elem.name}
            type={elem.type}
            onAddChart={props.onAddChart}
          />
        ))}
      </div>
    </>
  );
};

export default Search;
