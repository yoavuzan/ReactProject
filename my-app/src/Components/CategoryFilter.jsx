import "./CategoryFilter.css";

function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="categoryFilters">
      <button
        className={activeCategory === "All" ? "active" : ""}
        onClick={() => onCategoryChange("All")}
      >
        All
      </button>
      {Object.keys(categories).map((cat) => (
        <button
          key={cat}
          style={{ backgroundColor: categories[cat] }}
          className={activeCategory === cat ? "active" : ""}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
