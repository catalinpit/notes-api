const express = require('express');
const Note = require('../models/Note');
const User = require('../models/User');

const personRouter = express.Router();

personRouter.get('/', async (request, response) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
	
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
	const user = await User.findById(body.userId);

	const note = new Note({
		content: body.content,
		date: new Date(),
		important: body.important || false,
		user: user._id
	});

	const savedNote = await note.save();
	user.notes = user.notes.concat(savedNote._id);
	await user.save();

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