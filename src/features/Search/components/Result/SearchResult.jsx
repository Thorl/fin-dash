import styles from "./SearchResult.module.css";

export const SearchResult = (props) => {
  return (
    <div className={styles.searchResult__wrapper}>
      <div className={styles.searchResult}>
        <div>{props.type}</div>
      </div>
      <div className={styles.searchResult}>
        <div>{props.symbol}</div>
      </div>
      <div className={styles.searchResult}>
        <div>{props.name}</div>
      </div>
      <div className={styles.searchResult__button}>
        <button
          className={styles.searchResult__button__addChart}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};
