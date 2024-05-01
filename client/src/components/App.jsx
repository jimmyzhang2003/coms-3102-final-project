import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "./CreateNote";

function App() {
	const [notes, setNotes] = useState([]);

	// pull all existing notes from database on initial render
	useEffect(() => {
		axios
			.get("http://localhost:3001/notes")
			.then((res) => {
				console.log("Retrieved all notes");
				setNotes(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	// to pass data from CreateNote to App, pass callback as prop to CreateNote
	const createNote = (newNote) => {
		axios
			.post("http://localhost:3001/notes", {
				title: newNote.title,
				content: newNote.content,
			})
			.then((res) => {
				console.log("Created new note");
				setNotes((prevNotes) => {
					return [...prevNotes, res.data];
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// to delete note, pass callback as prop to Note
	const deleteNote = (id) => {
		axios
			.delete(`http://localhost:3001/notes/${id}`)
			.then((res) => {
				console.log("Deleted note");
				setNotes((prevNotes) => {
					return prevNotes.filter((note) => note._id !== id);
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// to edit note, pass callback as prop to Note
	const editNote = (id, updatedNote) => {
		let existingNote = notes.find((note) => note._id === id);

		// if nothing changed, do not send patch request
		if (
			existingNote &&
			existingNote.title === updatedNote.title &&
			existingNote.content === updatedNote.content
		) {
			console.log("Edits cancelled");
			return;
		}

		axios
			.patch(`http://localhost:3001/notes/${id}`, {
				title: updatedNote.title,
				content: updatedNote.content,
				dateModified: Date.now(),
			})
			.then((res) => {
				console.log("Updated note");
				setNotes((prevNotes) => {
					return prevNotes.map((note) => {
						return note._id === id
							? {
									_id: note._id,
									title: updatedNote.title,
									content: updatedNote.content,
							  }
							: note;
					});
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div>
			<Header />
			<CreateNote onCreate={createNote} />
			{notes &&
				// pass the index in the notes array as the id
				notes.map((note) => (
					<Note
						id={note._id}
						key={note._id}
						title={note.title}
						content={note.content}
						onDelete={deleteNote}
						onEdit={editNote}
					/>
				))}
			<Footer />
		</div>
	);
}

export default App;
