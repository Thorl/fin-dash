import ReactDOM from "react-dom";

import classNames from "classnames";

import { Search } from "../../Search/Search";
import * as styles from "./Modal.module.css";

const ModalOverlay = (props) => {
  const handleCloseModalClick = () => {
    props.onCloseModal(false);
  };

  return (
    <div
      className={classNames(styles.modal, {
        [styles.modal_show]: props.isModalVisible,
      })}
      onClick={handleCloseModalClick}
    >
      <div
        className={classNames(styles.modalContent, {
          [styles.modalContent_show]: props.isModalVisible,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add chart</h2>
          <button
            className={styles.closeModalButton}
            onClick={handleCloseModalClick}
          ></button>
        </div>
        <Search onAddChart={props.onAddChart} />
      </div>
    </div>
  );
};

export const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay
          onCloseModal={props.onCloseModal}
          isModalVisible={props.isModalVisible}
          onAddChart={props.onAddChart}
        />,
        document.getElementById("modal-overlay")
      )}
    </>
  );
};
