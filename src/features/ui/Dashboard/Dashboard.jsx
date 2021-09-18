import * as styles from "./Dashboard.module.css";
import Chart from "../../Chart/Chart";

const Dashboard = (props) => {
  return (
    <div className={styles["DashboardGrid"]}>
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

export default Dashboard;
