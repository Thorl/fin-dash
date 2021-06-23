import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartOptions from "../Highcharts/HighchartOptions";

import "./DashboardItem.css";

const DashboardItem = (props) => {
  return (
    <div class="dashboard-item">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={highchartOptions}
      />
    </div>
  );
};

export default DashboardItem;
