import { fetchCurrencyData } from "../../AlphaVantage/CurrencyDataHandlers";
import { fetchStockData } from "../../AlphaVantage/StockDataHandlers";
import { fetchCryptoData } from "../../AlphaVantage/CryptoDataHandlers";
import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import "./SearchResult.css";

const SearchResult = (props) => {
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
    <div className="search-result">
      <div>
        <h3>{props.name}</h3>
        <h5>{props.symbol}</h5>
      </div>
      <button onClick={loadData}>Select</button>
    </div>
  );
};

export default SearchResult;
