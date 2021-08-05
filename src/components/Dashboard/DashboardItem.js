import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsConfig from "../../Highcharts/HighchartsConfig";
import "./DashboardItem.css";

const DashboardItem = (props) => {
  const options = {
    title: {
      text: props.name,
    },
    series: [
      {
        type: "candlestick",
        name: props.name,
        data: props.data,
      },
    ],
    chart: HighchartsConfig.chart,
    rangeSelector: HighchartsConfig.rangeSelector,
    plotOptions: HighchartsConfig.plotOptions,
  };

  return (
    <div class="dashboard-item">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default DashboardItem;
