import "./Modal.css";
import ModalGraphList from "./ModalGraphList";
import { useState } from "react";
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
  const closeModal = () => {
    props.onClose(false);
  };

  const [currentGraphList, setCurrentGraphs] = useState("stock-market-indexes");

  const graphListHandler = (event) => {
    setCurrentGraphs(event.target.id);
  };
  return (
    <div className={`modal ${props.show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4
            className="modal-title"
            id="stock-market-indexes"
            onClick={graphListHandler}
          >
            Stock market indexes
          </h4>
          <h4
            className="modal-title"
            id="commodities"
            onClick={graphListHandler}
          >
            Commodities
          </h4>
          <h4
            className="modal-title"
            id="currencies"
            onClick={graphListHandler}
          >
            Currencies
          </h4>
          <h4
            className="modal-title"
            id="cryptocurrencies"
            onClick={graphListHandler}
          >
            Cryptocurrencies
          </h4>
        </div>
        <div className="modal-search-field">
          <input type="text" placeholder="Enter your search here"></input>
        </div>
        <div className="modal-body">
          <ModalGraphList
            graphList={currentGraphList}
            onAddGraph={props.onAddGraph}
          />
        </div>
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
          onAddGraph={props.onAddGraph}
        />,
        document.getElementById("modal-overlay")
      )}
    </>
  );
};

export default Modal;
