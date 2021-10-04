import styles from "./SearchResult.module.css";

export const SearchResult = (props) => {
  return (
    <div className={styles.searchResultWrapper}>
      <div className={styles.searchResult}>
        <div>{props.type}</div>
      </div>
      <div className={styles.searchResult}>
        <div>{props.symbol}</div>
      </div>
      <div className={styles.searchResult}>
        <div>{props.name}</div>
      </div>
      <div className={styles.searchResultButton}>
        <button
          className={styles.searchResultButton__addChart}
          onClick={props.onClick}
        ></button>
      </div>
    </div>
  );
};
