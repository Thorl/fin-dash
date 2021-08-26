import "./Dashboard.css";
import DashboardItem from "./DashboardItem";

const Dashboard = (props) => {
  return (
    <div className="dashboard-grid">
      {props.selectedCharts.map((item, index) => (
        <DashboardItem
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
