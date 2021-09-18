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
      className={classNames(styles["Modal"], {
        [styles["Modal--Show"]]: props.show,
      })}
      onClick={closeModal}
    >
      <div
        className={classNames(styles["ModalContent"], {
          [styles["ModalContent--Show"]]: props.show,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["ModalHeader"]}>
          <h2 className={styles["ModalTitle"]}>Add chart</h2>
          <button
            className={styles["CloseModalButton"]}
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
