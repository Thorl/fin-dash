import { fetchCurrencyData } from "../../api/alpha-vantage/currency-data-handlers";
import { fetchStockData } from "../../api/alpha-vantage/stock-data-handlers";
import { fetchCryptoData } from "../../api/alpha-vantage/crypto-data-handlers";
import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import "./Result.css";

const Result = (props) => {
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
    <div className="searchResultsWrapper">
      <div className="search-result">
        <div>{props.type}</div>
      </div>
      <div className="search-result">
        <div>{props.symbol}</div>
      </div>
      <div className="search-result">
        <div>{props.name}</div>
      </div>
      <div className="search-result btn">
        <button className="addButton" onClick={loadData}></button>
      </div>
    </div>
  );
};

export default Result;
