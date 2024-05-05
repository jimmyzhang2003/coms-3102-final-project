import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateNote from "./CreateNote";

function App() {
	const [notes, setNotes] = useState([
		{
			_id: "6635240beea984248e9795f7",
			title: "adsfas",
			content: "fdsa",
			dateCreated: "2024-05-03T17:51:07.495Z",
			dateModified: "2024-05-03T17:51:13.011Z",
			__v: 0,
		},
	]);

	// pull all existing notes from database on initial render
	useEffect(() => {
		axios
			.get("/api")
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
			.post("/api", {
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
			.delete(`/api/${id}`)
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

		if (!existingNote) {
			console.error(`Cannot find note with id ${id}`);
		}

		axios
			.patch(`/api/${id}`, {
				title: updatedNote.title,
				content: updatedNote.content,
				dateCreated: new Date(existingNote.dateCreated),
				dateModified: new Date(),
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
									dateCreated: updatedNote.dateCreated,
									dateModified: updatedNote.dateModified,
							  }
							: note;
					});
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// to clear all notes, pass callback as prop to header
	const clearAllNotes = () => {
		axios
			.delete("/api")
			.then((res) => {
				console.log("Cleared all notes");
				setNotes([]);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div>
			<Header onClear={clearAllNotes} />
			<CreateNote onCreate={createNote} />
			{notes &&
				// pass the index in the notes array as the id
				notes.map((note) => (
					<Note
						id={note._id}
						key={note._id}
						title={note.title}
						content={note.content}
						dateCreated={note.dateCreated}
						dateModified={note.dateModified}
						onDelete={deleteNote}
						onEdit={editNote}
					/>
				))}
			<Footer />
		</div>
	);
}

export default App;
