import styles from "./SearchResult.module.css";

interface SearchResultProps {
  symbol: string | undefined;
  name: string | undefined;
  type: string | undefined;
  onClick: () => void;
}

export const SearchResult = (props: SearchResultProps) => {
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
