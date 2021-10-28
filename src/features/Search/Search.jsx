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
