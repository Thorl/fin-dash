import "./SearchResult.css";

const SearchResult = (props) => {
  return (
    <div class="search-result">
      <div>
        <h3>{props.name}</h3>
        <h5>{props.symbol}</h5>
      </div>
      <button>Select</button>
    </div>
  );
};

export default SearchResult;
