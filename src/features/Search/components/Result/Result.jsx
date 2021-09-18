import { useCallback } from "react";

import { v4 as uuid } from "uuid";

import { fetchCurrencyData } from "../../api/alpha-vantage/currency-data-handlers";
import { fetchStockData } from "../../api/alpha-vantage/stock-data-handlers";
import { fetchCryptoData } from "../../api/alpha-vantage/crypto-data-handlers";
import * as styles from "./Result.module.css";

export const Result = (props) => {
  const loadData = useCallback(() => {
    switch (props.type) {
      case "Equity":
        (async () => {
          const data = await fetchStockData(props.symbol);
          return props.onAddChart({
            id: uuid(),
            name: props.name,
            data: data,
          });
        })();
        break;
      case "Currency":
        (async () => {
          const data = await fetchCurrencyData(props.symbol);
          return props.onAddChart({
            id: uuid(),
            name: props.name,
            data: data,
          });
        })();
        break;
      case "Crypto":
        (async () => {
          const data = await fetchCryptoData(props.symbol);
          return props.onAddChart({
            id: uuid(),
            name: props.name,
            data: data,
          });
        })();
        break;
      default:
        throw new Error("Something went wrong!");
    }
  }, [props]);
  return (
    <div className={styles["SearchResultsWrapper"]}>
      <div className={styles["SearchResult"]}>
        <div>{props.type}</div>
      </div>
      <div className={styles["SearchResult"]}>
        <div>{props.symbol}</div>
      </div>
      <div className={styles["SearchResult"]}>
        <div>{props.name}</div>
      </div>
      <div className={styles["SearchResult__Button"]}>
        <button
          className={styles["AddChartButton"]}
          onClick={loadData}
        ></button>
      </div>
    </div>
  );
};
