import { useState } from "react";

import { SearchInput } from "./components/Input/SearchInput";
import { Result } from "./components/Result/Result";
import * as styles from "./Search.module.css";

export const Search = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SearchInput
        onSetSearchResults={setSearchResults}
        onSetIsLoading={setIsLoading}
      />
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
