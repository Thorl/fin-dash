import ReactDOM from "react-dom";

import classNames from "classnames";

import { Search } from "../../Search/Search";
import * as styles from "./Modal.module.css";

const ModalOverlay = (props) => {
  const handleCloseModalClick = () => {
    props.onShowModal(false);
  };

  return (
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
          onShowModal={props.onShowModal}
          isModalShowing={props.isModalShowing}
          onAddChart={props.onAddChart}
        />,
        document.getElementById("modal-overlay")
      )}
    </>
  );
};
