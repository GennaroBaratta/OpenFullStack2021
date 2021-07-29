const SearchBar = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)}></input>
    </div>
  );
};

export default SearchBar;
