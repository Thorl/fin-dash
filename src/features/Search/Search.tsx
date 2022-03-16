import { useState } from "react";

import { v4 as uuid } from "uuid";

import { SearchInput } from "./components/Input/SearchInput";
import { SearchResult } from "./components/Result/SearchResult";
import { getDataBasedOnResultType } from "./api/alpha-vantage/get-data-based-on-result-type";
import { ChartModel } from "../../ts-models/chart.model";
import { CurrencyList } from "../../ts-models/currency-list.model";
import { StockSearchResults } from "./api/alpha-vantage/get-stock-search-results";
import styles from "./Search.module.css";

interface SearchProps {
  onAddChart: (newChart: ChartModel) => void;
}

export const Search = (props: SearchProps) => {
  const [searchResults, setSearchResults] = useState<
    (StockSearchResults | CurrencyList | undefined)[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wasSearchMade, setWasSearchMade] = useState(false);

  const handleSetSearchResults = (
    results: (StockSearchResults | CurrencyList | undefined)[]
  ) => {
    setSearchResults(results);
  };

  const handleIsLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  const handleWasSearchMade = (bool: boolean) => {
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
              name: result!.name as string,
              data: await getDataBasedOnResultType(
                result!.type as string,
                result!.symbol as string
              ),
            });
          };

          return (
            <SearchResult
              key={index}
              symbol={result?.symbol}
              name={result?.name}
              type={result?.type}
              onClick={handleAddChartClick}
            />
          );
        })}
      </div>
    </>
  );
};
