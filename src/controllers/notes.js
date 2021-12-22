const express = require('express');
const Note = require('../models/Note');

const personRouter = express.Router();

personRouter.get('/', (req, res) => {
	Note.find({}).then(notes => {
		res.json(notes);
	});
});

personRouter.get('/:id', (req, res, next) => {
	Note.findById(req.params.id)
		.then(note => {
			if (note) {
				res.json(note);
			} else {
				res.status(404).end();
			}
		})
		.catch(err => next(err));
});

personRouter.post('/', (req, res, next) => {
	const body = req.body;

	const note = new Note({
		content: body.content,
		date: new Date(),
		important: body.important || false
	});

	note.save().then(newNote => {
		res.json(newNote);
	})
		.catch(err => next(err));
});

personRouter.put('/:id', (req, res, next) => {
	const body = req.body;

	const note = {
		content: body.content,
		important: body.important
	};

	Note.findByIdAndUpdate(req.params.id, note, { new: true })
		.then(updatedNote => {
			res.json(updatedNote);
		})
		.catch(err => next(err));
});

personRouter.delete('/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end();
		})
		.catch(err => next(err));
});

module.exports = personRouter;