import "./Modal.css";
import ReactDOM from "react-dom";
import {Search} from "../Search";

const ModalOverlay = (props) => {
  const closeModal = () => {
    props.onClose(false);
  };

  return (
    <div className={`modal ${props.show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Search
            show={props.show}
            onAddChart={props.onAddChart}
        />
        <div className="modal-footer">
          <button className="button" onClick={closeModal}>
            Close
          </button>
        </div>
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
