import "./Header.css";

const Header = (props) => {
  const toggleModalHandler = () => {
    props.toggleModal(true);
  };
  return (
    <header>
      <h1>FinDash</h1>
      <button onClick={toggleModalHandler}>Add chart</button>
    </header>
  );
};

export default Header;
