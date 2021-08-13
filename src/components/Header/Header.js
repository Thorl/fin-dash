import "./Header.css";

const Header = (props) => {
  const toggleModalHandler = () => {
    props.toggleModal(true);
  };
  // Fix styling of header
  return (
    <header>
      <h1>FinDash</h1>
      <button onClick={toggleModalHandler}>Add chart</button>
    </header>
  );
};

export default Header;
