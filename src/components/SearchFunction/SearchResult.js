import { getStockCandles } from "../../AlphaVantage/AlphaVantage";
import "./SearchResult.css";

const SearchResult = (props) => {
  const fetchStockCandles = async () => {
    const data = await getStockCandles(props.symbol);
    console.log(data);
    return props.onAddChart({ name: props.name, stockCandleData: data });
  };

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
