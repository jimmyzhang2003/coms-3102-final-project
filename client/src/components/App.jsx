import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "./CreateNote";
import sampleNotes from "../data/notes";

function App() {
  const [notes, setNotes] = useState(sampleNotes);

  // to pass data from CreateNote to App, pass callback as prop to CreatNote
  const createNote = (newNote) => {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  };

  // to delete note, pass callback as prop to Note
  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note, index) => index !== id);
    });
  };

  return (
    <div>
      <Header />
      <CreateNote onCreate={createNote} />
      {notes &&
        // pass the index in the notes array as the id
        notes.map((note, index) => (
          <Note
            id={index}
            key={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}
      <Footer />
    </div>
  );
}

export default App;
