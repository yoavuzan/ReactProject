import { useState } from "react";
import ReactModal from "react-modal";
import "./Note.css";

ReactModal.setAppElement("#root");

const categories = {
  Personal: "#ffd966",
  Work: "#6fa8dc",
  Study: "#93c47d",
  Other: "#cccccc",
};

function Note({ note, onDelete, onUpdate, bgColor }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [txt, setTxt] = useState(note.txt);
  const [category, setCategory] = useState(note.category || "Personal");

  const handleOpenModal = () => {
    setTitle(note.title);
    setTxt(note.txt);
    setCategory(note.category || "Personal");
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onUpdate(note.id, { title, txt, category });
    setShowModal(false);
  };

  return (
    <>
      <div
        className="note"
        onClick={handleOpenModal}
        style={{ backgroundColor: bgColor || "#fff" }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="delete-btn"
        >
          X
        </button>
        <small>{category}</small>
        <p>{new Date(note.id).toLocaleString()}</p>
        <h3>{title}</h3>
        <p>{txt}</p>
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Note Modal"
        shouldCloseOnOverlayClick={true}
      >
        <h2>Edit Note</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="inputEdit"
          />
        </label>
        <label>
          Text:
          <textarea
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            rows={5}
            className="txtEdit"
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="categorySelect"
          >
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSave} style={{ marginRight: "12px" }}>
            Save
          </button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      </ReactModal>
    </>
  );
}

export default Note;
