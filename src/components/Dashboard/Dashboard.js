import "./Dashboard.css";
import DashboardItem from "./DashboardItem";

const Dashboard = (props) => {
  return (
    <div id="dashboard-grid">
      {props.selectedCharts.map((item, index) => (
        <DashboardItem
          key={index}
          name={item.name}
          data={item.stockCandleData}
        />
      ))}
    </div>
  );
};

export default Dashboard;
