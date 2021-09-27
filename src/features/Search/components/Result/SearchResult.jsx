import styles from "./SearchResult.module.css";

export const SearchResult = (props) => {
  return (
    <div className={styles["SearchResultWrapper"]}>
      <div className={styles["SearchResult"]}>
        <div>{props.type}</div>
      </div>
      <div className={styles["SearchResult"]}>
        <div>{props.symbol}</div>
      </div>
      <div className={styles["SearchResult"]}>
        <div>{props.name}</div>
      </div>
      <div className={styles["SearchResultButton"]}>
        <button
          className={styles["SearchResultButton__AddChart"]}
          onClick={props.onClick}
        ></button>
      </div>
    </div>
  );
};
