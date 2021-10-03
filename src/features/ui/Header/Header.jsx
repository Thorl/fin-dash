import * as styles from "./Header.module.css";

export const Header = (props) => {
  const toggleModalHandler = () => {
    props.toggleModal(true);
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>FinDash</h1>
      <button
        className={styles.header__modal__open}
        onClick={toggleModalHandler}
      >
        Add chart
      </button>
    </header>
  );
};
