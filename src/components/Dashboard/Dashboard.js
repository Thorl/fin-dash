import "./Dashboard.css";
import DashboardItem from "./DashboardItem";

const Dashboard = (props) => {
  return (
    <div id="dashboard-grid">
      {props.selectedCharts.map((item, index) => (
        <DashboardItem
          key={index}
          id={item.id}
          name={item.name}
          data={item.stockCandleData}
          onRemoveChart={props.onRemoveChart}
        />
      ))}
    </div>
  );
};

export default Dashboard;
