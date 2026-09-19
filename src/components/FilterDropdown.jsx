import "./FilterDropdown.css";

function FilterDropdown({ filterPattern, setFilterPattern, uniquePatterns }) {
  return (
    <select
      className="filter-dropdown"
      value={filterPattern}
      onChange={(e) => setFilterPattern(e.target.value)}
    >
      <option value="All">All</option>
      {uniquePatterns.map((pat) => (
        <option key={pat} value={pat}>
          {pat}
        </option>
      ))}
    </select>
  );
}

export default FilterDropdown;
