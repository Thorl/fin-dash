import ReactDOM from "react-dom";

import classNames from "classnames";

import { Search } from "../../Search/Search";
import * as styles from "./Modal.module.css";

const ModalOverlay = (props) => {
  const closeModal = () => {
    props.onClose(false);
  };

  return (
    <div
      className={classNames(styles.modal, {
        [styles.modal_show]: props.show,
      })}
      onClick={closeModal}
    >
      <div
        className={classNames(styles.modalContent, {
          [styles.modalContent_show]: props.show,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add chart</h2>
          <button
            className={styles.closeModalButton}
            onClick={closeModal}
          ></button>
        </div>
        <Search onAddChart={props.onAddChart} onCloseModal={closeModal} />
      </div>
    </div>
  );
};

export const Modal = (props) => {
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
