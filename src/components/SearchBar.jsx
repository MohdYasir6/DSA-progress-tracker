import "./SearchBar.css";
function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      className="search-bar"
      value={searchQuery}
      placeholder="Search the Problem"
      onChange={(e) => setSearchQuery(e.target.value)}
    ></input>
  );
}
export default SearchBar;
