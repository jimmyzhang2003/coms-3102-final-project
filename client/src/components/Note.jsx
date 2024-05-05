import React, { useState, useEffect } from "react";
import moment from "moment";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdOutlineDone, MdCancel } from "react-icons/md";

function Note(props) {
	const [note, setNote] = useState({
		id: props.id,
		title: props.title,
		content: props.content,
		dateCreated: moment(new Date(props.dateCreated)).format(
			"M/D/YYYY, h:mm:ssa"
		),
		dateModified: moment(new Date(props.dateModified)).format(
			"M/D/YYYY, h:mm:ssa"
		),
	});

	const [editedTitle, setEditedTitle] = useState(props.title);
	const [editedContent, setEditedContent] = useState(props.content);
	const [editMode, setEditMode] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [isInitialRender, setIsInitialRender] = useState(true);

	// send patch request after edits are confirmed, but do not send request on initial render
	useEffect(() => {
		if (isInitialRender) {
			setIsInitialRender(false);
		} else {
			props.onEdit(note.id, note);
			setEditMode(false);
		}
	}, [note]);

	// update note state upon editing title or content
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "title") {
			setEditedTitle(value);
		} else if (name === "content") {
			setEditedContent(value);
		}
	};

	// to handle submitted edits
	const handleSubmit = (e) => {
		e.preventDefault();

		// if either title or content is empty, show a message and do not create new note
		if (editedTitle === "" || editedContent === "") {
			setShowWarning(true);

			// make warning disappear after 3 seconds
			setTimeout(() => {
				setShowWarning(false);
			}, 3000);
		}
		// if note title and content unchanged, do nothing
		else if (editedTitle === note.title && editedContent === note.content) {
			console.log("Note unchanged");
			setEditMode(false);
		} else {
			setNote((prevNote) => {
				return {
					...prevNote,
					title: editedTitle,
					content: editedContent,
					dateModified: moment(Date.now()).format("M/D/YYYY, h:mm:ssa"),
				};
			});
		}
	};

	// discard edits when cancel button is clicked
	const handleCancel = () => {
		console.log("Edits cancelled");
		setEditedTitle(note.title);
		setEditedContent(note.content);
		setEditMode(false);
	};

	return (
		<div className="note">
			{/* Edit Mode */}
			{editMode ? (
				<form onSubmit={handleSubmit}>
					<input
						name="title"
						placeholder="Title"
						value={editedTitle}
						onChange={handleChange}
					/>

					<textarea
						name="content"
						placeholder="Take a note..."
						rows="3"
						value={editedContent}
						onChange={handleChange}
					/>

					{showWarning && (
						<p className="warning-message">
							Title and content fields cannot be empty
						</p>
					)}

					<button type="submit" className="save-button">
						<MdOutlineDone />
					</button>

					<button
						type="button"
						className="cancel-button"
						onClick={handleCancel}
					>
						<MdCancel />
					</button>
				</form>
			) : (
				<div>
					<h1>{note.title}</h1>
					<p className="note-content">{note.content}</p>
					<div>
						<p className="date">Created on: {note.dateCreated}</p>
						<p className="date">Modified on: {note.dateModified}</p>
					</div>
					<button
						className="delete-button"
						onClick={() => props.onDelete(props.id)}
					>
						<FaTrashAlt />
					</button>
					<button className="edit-button" onClick={() => setEditMode(true)}>
						<FaEdit />
					</button>
				</div>
			)}
		</div>
	);
}

export default Note;
