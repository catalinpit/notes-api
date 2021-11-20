import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Note } from './src/models/Note.mjs';
import { errorHandler, unknownEndpoint, reqLogger } from './src/middleware/handlers.mjs';
import './src/db/mongoose.mjs';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(reqLogger);

app.get('/', (req, res) => {
    res.send('Notes API');
});

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes);
    });
});

app.get('/api/notes/:id', (req, res, next) => {
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

app.post('/api/notes', (req, res, next) => {
    const body = req.body;

    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important
    });

    note.save().then(newNote => {
        res.json(newNote);
    })
    .catch(err => next(err));
});

app.put('/api/notes/:id', (req, res, next) => {
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

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end();
    })
    .catch(err => next(err));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});