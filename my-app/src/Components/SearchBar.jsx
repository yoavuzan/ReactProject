import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
       <button onClick={() => onSearchChange(searchTerm)}>Search</button>
    </div>
  );
}

export default SearchBar;
