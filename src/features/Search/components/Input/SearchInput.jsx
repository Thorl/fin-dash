import { useEffect, useState, useRef } from "react";

import { fetchSymbolHandler } from "../../api/alpha-vantage/fetch-symbol-handler";
import styles from "./SearchInput.module.css";

export const SearchInput = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const focusInput = useRef(null);

  useEffect(() => {
    focusInput.current.focus();
  });

  const loadSearchResults = useRef((query, signal) => {
    if (!query) {
      props.onSetIsLoading(false);
      props.onSetSearchResults([]);
      return;
    } else {
      props.onSetIsLoading(true);
      props.onSetSearchResults([]);

      const results = fetchSymbolHandler(query, signal);
      props.onSetSearchResults(results);
      props.onSetIsLoading(false);
    }
  }).current;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeOutId = setTimeout(
      () => loadSearchResults(searchQuery, signal),
      500
    );

    return () => {
      clearTimeout(timeOutId);
      controller.abort();
    };
  }, [searchQuery, loadSearchResults]);

  return (
    <form className={styles["SearchField"]}>
      <input
        className={styles["SearchField__Input"]}
        type="text"
        placeholder="Enter your search for a stock ticker or company name, currency pair, or crypto/currency pair."
        onChange={(event) => setSearchQuery(event.target.value)}
        ref={focusInput}
      ></input>
    </form>
  );
};
