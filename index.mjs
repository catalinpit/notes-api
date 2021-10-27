import express, { response } from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

let notes = [];

app.get('/', (req, res) => {
    res.send('Notes API');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

app.post('/api/notes', (req, res) => {
    // not the recommended way to do this
    // change asap
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0;

    const body = req.body;

    if (!body.content) {
        return res.status(400).json({
            error: 'missing content'
        });
    }

    console.log(body);

    const note = {
        id: maxId + 1,
        data: new Date(),
        content: body.content,
        important: body.important
    }

    notes = notes.concat(note);

    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});