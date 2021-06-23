import ModalListItem from "./ModalListItem";
import StockMarketIndexes from "./TypesOfCharts/StockMarketIndexes";
import Commodities from "./TypesOfCharts/Commodities";
import Currencies from "./TypesOfCharts/Currencies";
import Cryptocurrencies from "./TypesOfCharts/Cryptocurrencies";

const ModalList = (props) => {
  let listItems = "";

  switch (props.chartList) {
    case "stock-market-indexes":
      listItems = StockMarketIndexes;
      break;
    case "commodities":
      listItems = Commodities;
      break;
    case "currencies":
      listItems = Currencies;
      break;
    case "cryptocurrencies":
      listItems = Cryptocurrencies;
      break;
    default:
      console.log("Something went wrong!");
  }
  return (
    <>
      {listItems.map((obj, index) => (
        <ModalListItem
          key={index}
          title={obj.title}
          onAddChart={props.onAddChart}
        />
      ))}
    </>
  );
};

export default ModalList;
