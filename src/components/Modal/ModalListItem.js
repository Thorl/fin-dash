import "./ModalListItem.css";

const ModalListItem = (props) => {
  const selectListItemHandler = () => {
    props.onAddChart();
  };
  return (
    <div class="list-item">
      <button onClick={selectListItemHandler}>Add Chart</button>
    </div>
  );
};

export default ModalListItem;
