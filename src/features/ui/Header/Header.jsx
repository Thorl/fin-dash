import * as styles from "./Header.module.css";

const Header = (props) => {
  const toggleModalHandler = () => {
    props.toggleModal(true);
  };
  return (
    <header className={styles["Header"]}>
      <h1 className={styles["Header__Title"]}>FinDash</h1>
      <button
        className={styles["Header__OpenModalButton"]}
        onClick={toggleModalHandler}
      >
        Add chart
      </button>
    </header>
  );
};

export default Header;
