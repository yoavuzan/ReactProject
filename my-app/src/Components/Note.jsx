import { useState } from "react";
import ReactModal from "react-modal";
import "./Note.css";

ReactModal.setAppElement("#root");

function Note({ note, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [txt, setTxt] = useState(note.txt);

  const handleOpenModal = () => {
    setTitle(note.title);
    setTxt(note.txt);
    setShowModal(true);
  };
  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onUpdate(note.id, { title, txt });
    setShowModal(false);
  };

  return (
    <>
      <div className="note" onClick={handleOpenModal}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
        >
          X
        </button>
        <p>{new Date(note.id).toLocaleString()}</p>
        <h3>{note.title}</h3>
        <p>{note.txt}</p>
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
