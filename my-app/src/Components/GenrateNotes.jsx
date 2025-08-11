import { useState, useEffect } from "react";
import "./GenrateNotes.css";
import Note from "./Note";

function GenrateNotes() {
  const [Notes, SetNotes] = useState([]);
  const [Txt, SetTxt] = useState("");
  const [Title, SetTitle] = useState("");

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
      const newNote = { id: Date.now(), txt: Txt, title: Title };
      SetNotes([...Notes, newNote]);
      SetTxt("");
      SetTitle("");
    }
  }

  function deleteNote(idToDelete) {
    if (confirm("Are you sure you want to delete this item?")) {
      SetNotes(Notes.filter((note) => note.id !== idToDelete));
    }
  }

  return (
    <>
      <div className="inputTxt">
        <p>title</p>
        <input
          className="TitleTxt"
          onChange={(e) => SetTitle(e.target.value)}
          value={Title}
        ></input>
        <p>info</p>
        <div>
          <textarea
            className="txtBox"
            onChange={(e) => SetTxt(e.target.value)}
            value={Txt}
          ></textarea>
        </div>
        <div>
          <button onClick={addNote}>add</button>
        </div>
      </div>

      <div className="showNotes">
        {Notes &&
          Notes.map((note) => (
            <Note note={note} onDelete={deleteNote} onUpdate={updateNote} />
          ))}
      </div>
    </>
  );
}
export default GenrateNotes;
