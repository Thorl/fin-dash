import { useState } from "react";

import { v4 as uuid } from "uuid";

import { SearchInput } from "./components/Input/SearchInput";
import { SearchResult } from "./components/Result/SearchResult";
import { getDataBasedOnResultType } from "./api/alpha-vantage/get-data-based-on-result-type";
import styles from "./Search.module.css";

export const Search = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSetIsLoading = (bool) => {
    setIsLoading(bool);
  };

  return (
    <>
      <SearchInput
        setSearchResults={handleSetSearchResults}
        setIsLoading={handleSetIsLoading}
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
