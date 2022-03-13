import { useState } from "react";

import { v4 as uuid } from "uuid";

import { SearchInput } from "./components/Input/SearchInput";
import { SearchResult } from "./components/Result/SearchResult";
import { getDataBasedOnResultType } from "./api/alpha-vantage/get-data-based-on-result-type";
import styles from "./Search.module.css";

export const Search = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wasSearchMade, setWasSearchMade] = useState(false);

  const handleSetSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleIsLoading = (bool) => {
    setIsLoading(bool);
  };

  const handleWasSearchMade = (bool) => {
    setWasSearchMade(bool);
  };

  return (
    <>
      <SearchInput
        setSearchResults={handleSetSearchResults}
        isLoading={handleIsLoading}
        wasSearchMade={handleWasSearchMade}
      />
      <div className={styles.searchGrid}>
        <h3 className={styles.searchHeader}>Type</h3>
        <h3 className={styles.searchHeader}>Symbol</h3>
        <h3
          className={`${styles.searchHeader} 
          ${styles.searchHeader__name}`}
        >
          Name
        </h3>

        {isLoading && <p className={styles.loading}>Loading...</p>}
        {wasSearchMade && searchResults.length === 0 && (
          <p className={styles.noResultsFound}>
            No results found. Please try another search.
          </p>
        )}
        {searchResults.map((result, index) => {
          const handleAddChartClick = async () => {
            props.onAddChart({
              id: uuid(),
              name: result.name,
              data: await getDataBasedOnResultType(result.type, result.symbol),
            });
          };

          return (
            <SearchResult
              key={index}
              symbol={result.symbol}
              name={result.name}
              type={result.type}
              onClick={handleAddChartClick}
            />
          );
        })}
      </div>
    </>
  );
};
