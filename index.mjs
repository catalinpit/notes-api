import express, { response } from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

let notes = [
    {
        id: 1,
        content: 'HTML is easy'
    }
];

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

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});