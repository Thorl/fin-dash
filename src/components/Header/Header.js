import "./Header.css";

const Header = (props) => {
  const toggleModalHandler = () => {
    props.toggleModal(true);
  };

  return (
    <header>
      <div id="page-nav">
        <h2>
          <a class="link">Home</a>
        </h2>
        <h2>
          <a class="link">About</a>
        </h2>
        <h2>
          <a class="link">Contact</a>
        </h2>
      </div>
      <h1>FinDash</h1>
      <button class="header-item" onClick={toggleModalHandler}>
        Add graph
      </button>
    </header>
  );
};

export default Header;
