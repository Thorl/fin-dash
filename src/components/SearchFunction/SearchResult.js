import { getStockCandles } from "../../AlphaVantage/AlphaVantage";
import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import "./SearchResult.css";

const SearchResult = (props) => {
  const fetchStockCandles = useCallback(async () => {
    const data = await getStockCandles(props.symbol);
    console.log(data);
    return props.onAddChart({
      id: uuid(),
      name: props.name,
      stockCandleData: data,
    });
  }, [props]);

  return (
    <div class="search-result">
      <div>
        <h3>{props.name}</h3>
        <h5>{props.symbol}</h5>
      </div>
      <button onClick={fetchStockCandles}>Select</button>
    </div>
  );
};

export default SearchResult;
