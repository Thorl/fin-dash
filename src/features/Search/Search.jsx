import { useState } from "react";

import { v4 as uuid } from "uuid";

import { SearchInput } from "./components/Input/SearchInput";
import { SearchResult } from "./components/Result/SearchResult";
import { fetchData } from "./api/alpha-vantage/fetch-data";
import styles from "./Search.module.css";

export const Search = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SearchInput
        onSetSearchResults={setSearchResults}
        onSetIsLoading={setIsLoading}
      />
      <div className={styles.searchResultGrid}>
        <div className={styles.searchResultHeader}>
          <div>Type</div>
        </div>
        <div className={styles.searchResultHeader}>
          <div>Symbol</div>
        </div>
        <div
          className={`${styles.searchResultHeader} 
          ${styles.searchResultHeader__name}`}
        >
          <div>Name</div>
        </div>
        {isLoading && <p>Loading...</p>}
        {searchResults.map((elem, index) => {
          const onClick = async () => {
            props.onAddChart({
              id: uuid(),
              name: elem.name,
              data: await fetchData(elem.type, elem.symbol),
            });
          };

          return (
            <SearchResult
              key={index}
              symbol={elem.symbol}
              name={elem.name}
              type={elem.type}
              onClick={onClick}
            />
          );
        })}
      </div>
    </>
  );
};
