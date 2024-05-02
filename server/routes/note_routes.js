const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

// GET endpoint
router.get("/", (req, res) => {
	Note.find()
		.exec()
		.then((results) => {
			console.log(results);
			res.status(200).json(results);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
});

// POST endpoint
router.post("/", (req, res) => {
	const note = new Note({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		content: req.body.content,
	});

	note
		.save()
		.then((result) => {
			console.log(result);
			res.status(201).json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
});

// PATCH endpoint
router.patch("/:id", (req, res) => {
	const id = req.params.id;

	Note.updateOne({ _id: id }, { $set: req.body })
		.exec()
		.then((result) => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
});

// DELETE (single) endpoint
router.delete("/:id", (req, res) => {
	const id = req.params.id;

	Note.deleteOne({ _id: id })
		.exec()
		.then((result) => {
			console.log(`Note deleted with id ${id}`);
			res.status(200).json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
});

// DELETE (all) endpoint
router.delete("/", (req, res) => {
	Note.deleteMany({})
		.exec()
		.then((results) => {
			console.log("All notes deleted");
			res.status(200).json(results);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err });
		});
});

module.exports = router;
