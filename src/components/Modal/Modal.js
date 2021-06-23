import "./Modal.css";
import ModalList from "./ModalList";
import { useState } from "react";
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
  const closeModal = () => {
    props.onClose(false);
  };

  const [currentChartList, setCurrentCharts] = useState("stock-market-indexes");

  const chartListHandler = (event) => {
    setCurrentCharts(event.target.id);
  };
  return (
    <div className={`modal ${props.show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4
            className="modal-title"
            id="stock-market-indexes"
            onClick={chartListHandler}
          >
            Stock market indexes
          </h4>
          <h4
            className="modal-title"
            id="commodities"
            onClick={chartListHandler}
          >
            Commodities
          </h4>
          <h4
            className="modal-title"
            id="currencies"
            onClick={chartListHandler}
          >
            Currencies
          </h4>
          <h4
            className="modal-title"
            id="cryptocurrencies"
            onClick={chartListHandler}
          >
            Cryptocurrencies
          </h4>
        </div>
        <div className="modal-search-field">
          <input type="text" placeholder="Enter your search here"></input>
        </div>
        <div className="modal-body">
          <ModalList
            chartList={currentChartList}
            onAddChart={props.onAddChart}
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
          onAddChart={props.onAddChart}
        />,
        document.getElementById("modal-overlay")
      )}
    </>
  );
};

export default Modal;
