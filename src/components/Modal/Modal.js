import "./Modal.css";
import ReactDOM from "react-dom";
import SearchFunction from "../SearchFunction/SearchFunction";

const ModalOverlay = (props) => {
  const closeModal = () => {
    props.onClose(false);
  };

  return (
    <div className={`modal ${props.show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add chart</h2>
          <button className="closeModal" onClick={closeModal}></button>
        </div>
        <SearchFunction
          onAddChart={props.onAddChart}
          onCloseModal={closeModal}
        />
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onClose}
          show={props.show}
          onAddChart={props.onAddChart}
        />,
        document.getElementById("modal-overlay")
      )}
    </>
  );
};

export default Modal;
