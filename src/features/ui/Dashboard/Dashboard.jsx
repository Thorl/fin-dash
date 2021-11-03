import classNames from "classnames";

import { Chart } from "../../Chart/Chart";
import * as styles from "./Dashboard.module.css";

export const Dashboard = (props) => {
  console.log(props.selectedCharts);
  return (
    <>
      <div
        className={classNames({
          [styles.placeholder]: !props.selectedCharts.length,
        })}
      >
        {!props.selectedCharts.length && (
          <p className={styles.placeholder__Text}>
            Press 'Add chart' to begin adding charts...
          </p>
        )}
      </div>
      <div className={styles.dashboardGrid}>
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
    </>
  );
};
