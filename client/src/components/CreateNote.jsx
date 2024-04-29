import React, { useState } from "react";

function CreateNote(props) {
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	// update note state upon editing title or content
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});
	};

	// upon clicking add button, add current note to notes array and update note state
	const handleSubmit = (e) => {
		e.preventDefault();

		// add current note to notes array
		props.onCreate(note);

		// after rendering current note, clear input and textfield
		setNote({
			title: "",
			content: "",
		});
	};

	return (
		<div className="create-note-container">
			<form onSubmit={handleSubmit}>
				{/* use input field for note title */}
				<input
					name="title"
					placeholder="Title"
					value={note.title}
					onChange={handleChange}
				/>
				{/* use textarea for note content */}
				<textarea
					name="content"
					placeholder="Take a note..."
					rows="3"
					value={note.content}
					onChange={handleChange}
				/>
				<button type="submit" className="add-button">
					Add
				</button>
			</form>
		</div>
	);
}

export default CreateNote;
