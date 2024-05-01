import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";

function Note(props) {
	const [note, setNote] = useState({
		id: props.id,
		title: props.title,
		content: props.content,
	});

	const [editMode, setEditMode] = useState(false);
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

	// to handle submitted edits
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
			props.onEdit(note.id, note);
			setEditMode(false);
		}
	};

	return (
		<div className="note">
			{/* Edit Mode */}
			{editMode ? (
				<form onSubmit={handleSubmit}>
					<input
						name="title"
						placeholder="Title"
						value={note.title}
						onChange={handleChange}
					/>

					<textarea
						name="content"
						placeholder="Take a note..."
						rows="3"
						value={note.content}
						onChange={handleChange}
					/>

					{showWarning && <p>Title and content fields cannot be empty</p>}

					<button type="submit" className="add-button">
						<MdOutlineDone />
					</button>
				</form>
			) : (
				<div>
					<h1>{props.title}</h1>
					<p>{props.content}</p>
					<button
						onClick={() => {
							setEditMode(true);
						}}
					>
						<FaEdit />
					</button>
					<button
						className="delete-button"
						onClick={() => props.onDelete(props.id)}
					>
						<FaTrashAlt />
					</button>
				</div>
			)}
		</div>
	);
}

export default Note;
