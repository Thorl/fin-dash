import "./ModalListItem.css";

const ModalListItem = (props) => {
  const selectListItemHandler = () => {
    props.onAddGraph({ title: props.title });
  };
  return (
    <div class="list-item">
      <h2>{props.title}</h2>
      <button onClick={selectListItemHandler}>Select</button>
    </div>
  );
};

export default ModalListItem;
