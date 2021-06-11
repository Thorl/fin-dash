import "./Dashboard.css";
import DashboardItem from "./DashboardItem";

const Dashboard = (props) => {
  return (
    <div id="dashboard-grid">
      {props.selectedGraphs.map((graph, index) => (
        <DashboardItem key={index} title={graph.title} />
      ))}
    </div>
  );
};

export default Dashboard;
