import { useState, useEffect } from "react";
import "./GenrateNotes.css";
import Note from "./Note";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

const categories = {
  Personal: "#ffd966",
  Work: "#6fa8dc",
  Study: "#93c47d",
  Other: "#cccccc",
};

function GenrateNotes() {
  const [Notes, SetNotes] = useState([]);
  const [Txt, SetTxt] = useState("");
  const [Title, SetTitle] = useState("");
  const [Category, SetCategory] = useState("Personal");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      SetNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(Notes));
  }, [Notes]);

  function updateNote(idToUpdate, updatedFields) {
    SetNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === idToUpdate ? { ...note, ...updatedFields } : note
      )
    );
  }

  function addNote() {
    if (Txt.trim() !== "" || Title.trim() !== "") {
      const newNote = {
        id: Date.now(),
        txt: Txt,
        title: Title,
        category: Category,
      };
      SetNotes([...Notes, newNote]);
      SetTxt("");
      SetTitle("");
      SetCategory("Personal");
    }
  }

  function deleteNote(idToDelete) {
    if (confirm("Are you sure you want to delete this item?")) {
      SetNotes(Notes.filter((note) => note.id !== idToDelete));
    }
  }

  // Filter notes by search term and category
  const filteredNotes = Notes.filter((note) => {
    const matchesSearch = note.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || note.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="inputTxt">
        <p>title</p>
        <input
          className="TitleTxt"
          onChange={(e) => SetTitle(e.target.value)}
          value={Title}
        />
        <p>Info</p>
        <div>
          <textarea
            className="txtBox"
            onChange={(e) => SetTxt(e.target.value)}
            value={Txt}
          />
        </div>

        <p>Category</p>
        <select
          value={Category}
          onChange={(e) => SetCategory(e.target.value)}
          className="categorySelect"
        >
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div>
          <button onClick={addNote}>add</button>
        </div>
      </div>
      <div className="filterBar">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <CategoryFilter
          categories={categories}
          activeCategory={filterCategory}
          onCategoryChange={setFilterCategory}
        />
      </div>
      <div className="showNotes">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onUpdate={updateNote}
              bgColor={categories[note.category]}
            />
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </>
  );
}

export default GenrateNotes;
