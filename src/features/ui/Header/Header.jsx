import logo from "../../../assets/logo/findash-logo.svg";
import * as styles from "./Header.module.css";

export const Header = (props) => {
  const handleOpenModalClick = () => {
    props.onShowModal(true);
  };
  return (
    <header className={styles.header}>
      <div className={styles.header__title}>
        <img
          src={logo}
          alt="FinDash logo"
          className={styles.header__title__logo}
        />
        <h1 className={styles.header__title__name}>FinDash</h1>
      </div>
      <button
        className={styles.header__openModalButton}
        onClick={handleOpenModalClick}
      >
        Add chart
      </button>
    </header>
  );
};
