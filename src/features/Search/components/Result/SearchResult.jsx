import styles from "./SearchResult.module.css";

export const SearchResult = (props) => {
  return (
    <>
      <p className={styles.searchResult}>{props.type}</p>
      <p className={styles.searchResult}>{props.symbol}</p>
      <p className={styles.searchResult}>{props.name}</p>
      <div className={styles.searchResultButton}>
        <button
          className={styles.searchResultButton__addChart}
          onClick={props.onClick}
        ></button>
      </div>
      <div className={styles.bottomBorder}></div>
    </>
  );
};
