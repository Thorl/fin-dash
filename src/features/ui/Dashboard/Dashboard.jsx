import { Chart } from "../../Chart/Chart";
import * as styles from "./Dashboard.module.css";

export const Dashboard = (props) => {
  return (
    <div className={styles.dashboard}>
      {props.selectedCharts.map((item, index) => (
        <Chart
          key={index}
          id={item.id}
          name={item.name}
          data={item.data}
          onRemoveChart={props.onRemoveChart}
        />
      ))}
    </div>
  );
};
