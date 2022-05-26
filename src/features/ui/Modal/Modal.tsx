import ReactDOM from "react-dom";

import classNames from "classnames";

import { Search } from "../../Search/Search";
import { ChartModel } from "../../../ts-models/chart.model";
import styles from "./Modal.module.css";

interface ModalProps {
  isModalShowing: boolean;
  onShowModal: (bool: boolean) => void;
  onAddChart: (newChart: ChartModel) => void;
}

export const Modal = (props: ModalProps) => {
  const handleCloseModalClick = () => {
    props.onShowModal(false);
  };

  return ReactDOM.createPortal(
    <div
      className={classNames(styles.modal, {
        [styles.modal_show]: props.isModalShowing,
      })}
      onClick={handleCloseModalClick}
    >
      <div
        className={classNames(styles.modalContent, {
          [styles.modalContent_show]: props.isModalShowing,
        })}
        data-testid={`${props.isModalShowing ? "modalTest" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Search for charts</h2>
          <button
            className={styles.closeModalButton}
            onClick={handleCloseModalClick}
          ></button>
        </div>
        <Search onAddChart={props.onAddChart} />
      </div>
    </div>,
    document.getElementById("modal-overlay")!
  );
};
