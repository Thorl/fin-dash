import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { highchartsConfig } from "./highcharts/highcharts-config";
import * as styles from "./Chart.module.css";

export const Chart = (props) => {
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
    <div className={styles.chart}>
      <button className={styles.closeButton} onClick={removeHandler}></button>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};
