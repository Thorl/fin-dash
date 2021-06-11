import "./DashboardItem.css";

const DashboardItem = (props) => {
  return (
    <div class="dashboard-item">
      <p>{props.title}</p>
    </div>
  );
};

export default DashboardItem;
