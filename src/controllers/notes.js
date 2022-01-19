const express = require('express');
const Note = require('../models/Note');

const personRouter = express.Router();

personRouter.get('/', async (request, response) => {
	const notes = await Note.find({});
	
	response.json(notes);
});

personRouter.get('/:id', async (request, response) => {
	const foundNote = await Note.findById(request.params.id);

	if (foundNote) {
		response.json(foundNote);
	} else {
		response.status(404).end();
	}
});

personRouter.post('/', async (request, response) => {
	const body = request.body;

	const note = new Note({
		content: body.content,
		date: new Date(),
		important: body.important || false
	});

	const savedNote = await note.save();

	response.status(201).json(savedNote);
});

personRouter.put('/:id', async (request, response) => {
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important
	};

	const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })

	response.json(updatedNote);
});

personRouter.delete('/:id', async (request, response) => {
	await Note.findByIdAndRemove(request.params.id);

	response.status(204).end();
});

module.exports = personRouter;