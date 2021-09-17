import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsConfig from "./highcharts/highcharts-config";
import "./Chart.css";

const Chart = (props) => {
  const removeHandler = () => {
    props.onRemoveChart(props.id);
  };

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
    chart: highchartsConfig.chart,
    rangeSelector: highchartsConfig.rangeSelector,
    plotOptions: highchartsConfig.plotOptions,
  };

  return (
    <div className="dashboard-item">
      <button className="close" onClick={removeHandler}></button>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default Chart;
