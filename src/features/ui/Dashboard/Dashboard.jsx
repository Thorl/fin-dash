import classNames from "classnames";

import { Chart } from "../../Chart/Chart";
import * as styles from "./Dashboard.module.css";

export const Dashboard = (props) => {
  return (
    <>
      <div
        className={classNames({
          [styles.placeholder]: !props.addedCharts.length,
        })}
      >
        {!props.addedCharts.length && (
          <p className={styles.placeholder__Text}>
            Click 'Add chart' to begin adding charts...
          </p>
        )}
      </div>
      <div className={styles.dashboardGrid}>
        {props.addedCharts.map((item, index) => (
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
