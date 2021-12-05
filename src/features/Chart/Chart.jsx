import Highcharts from "highcharts/highstock";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import HighchartsReact from "highcharts-react-official";

import { highchartsConfig } from "./highcharts/highcharts-config";
import * as styles from "./Chart.module.css";

export const Chart = (props) => {
  const handleOnClick = () => {
    props.onRemoveChart(props.id);
  };

  NoDataToDisplay(Highcharts);

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
    ...highchartsConfig,
  };

  return (
    <div className={styles.chart}>
      <button className={styles.closeButton} onClick={handleOnClick}></button>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};
