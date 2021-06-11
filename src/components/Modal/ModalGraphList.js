import ModalListItem from "./ModalListItem";
import StockMarketIndexes from "./TypesOfGraphs/StockMarketIndexes";
import Commodities from "./TypesOfGraphs/Commodities";
import Currencies from "./TypesOfGraphs/Currencies";
import Cryptocurrencies from "./TypesOfGraphs/Cryptocurrencies";

const ModalGraphList = (props) => {
  let graphs = "";

  switch (props.graphList) {
    case "stock-market-indexes":
      graphs = StockMarketIndexes;
      break;
    case "commodities":
      graphs = Commodities;
      break;
    case "currencies":
      graphs = Currencies;
      break;
    case "cryptocurrencies":
      graphs = Cryptocurrencies;
      break;
    default:
      console.log("Something went wrong!");
  }
  return (
    <>
      {graphs.map((obj, index) => (
        <ModalListItem
          key={index}
          title={obj.title}
          onAddGraph={props.onAddGraph}
        />
      ))}
    </>
  );
};

export default ModalGraphList;
