import { useEffect, useState, useRef } from "react";

import { getSearchResults } from "../../api/alpha-vantage/get-search-results";
import styles from "./SearchInput.module.css";

export const SearchInput = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const focusInput = useRef(null);

  useEffect(() => {
    focusInput.current.focus();
  });

  const loadSearchResults = useRef(async (query, signal) => {
    if (!query) {
      props.isLoading(false);
      props.wasSearchMade(false);
      props.setSearchResults([]);
      return;
    } else {
      props.wasSearchMade(false);
      props.isLoading(true);
      props.setSearchResults([]);

      const results = await getSearchResults(query, signal);

      props.setSearchResults(results);
      props.wasSearchMade(true);
      props.isLoading(false);
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

  let placeholderText;

  if (window.innerWidth <= 1000) {
    placeholderText = "Enter your search for a stock, currency, or crypto.";
  } else {
    placeholderText =
      "Enter your search for a stock ticker or company name, currency pair, or crypto/currency pair.";
  }

  return (
    <form className={styles.searchField}>
      <input
        className={styles.searchField__input}
        type="text"
        placeholder={placeholderText}
        onChange={(event) => setSearchQuery(event.target.value)}
        ref={focusInput}
      ></input>
    </form>
  );
};
