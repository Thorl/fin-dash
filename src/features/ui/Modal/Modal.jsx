import ReactDOM from "react-dom";

import cx from "classnames";

import { Search } from "../../Search/Search";
import * as styles from "./Modal.module.css";

const ModalOverlay = (props) => {
  const closeModal = () => {
    props.onClose(false);
  };

  return (
    <div
      className={cx(styles.modal, {
        [styles.modal__show]: props.show,
      })}
      onClick={closeModal}
    >
      <div
        className={cx(styles.modal__content, {
          [styles.modal__content__show]: props.show,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Add chart</h2>
          <button
            className={styles.modal__button__close}
            onClick={closeModal}
          />
        </div>
        <Search
          onAddChart={props.onAddChart}
          onCloseModal={closeModal}
        />
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
