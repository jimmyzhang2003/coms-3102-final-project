const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now(),
	},
	dateModified: {
		type: Date,
		default: Date.now(),
	},
	starred: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Note", noteSchema);
