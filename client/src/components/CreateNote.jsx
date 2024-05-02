import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

function CreateNote(props) {
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const [showWarning, setShowWarning] = useState(false);

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

		// if either title or content is empty, show a message and do not create new note
		if (note.title === "" || note.content === "") {
			setShowWarning(true);

			// make warning disappear after 3 seconds
			setTimeout(() => {
				setShowWarning(false);
			}, 3000);
		} else {
			// add current note to notes array
			props.onCreate(note);

			// after rendering current note, clear input and textfield
			setNote({
				title: "",
				content: "",
			});
		}
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

				{showWarning && (
					<p className="warning-message">
						Title and content fields cannot be empty
					</p>
				)}

				<button type="submit" className="add-button">
					<IoIosAdd size={28} />
				</button>
			</form>
		</div>
	);
}

export default CreateNote;
