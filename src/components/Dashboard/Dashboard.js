import "./Dashboard.css";
import DashboardItem from "./DashboardItem";

const Dashboard = (props) => {
  return (
    <div id="dashboard-grid">
      {props.selectedCharts.map((item, index) => (
        <DashboardItem key={index} />
      ))}
    </div>
  );
};

export default Dashboard;
