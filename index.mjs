import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

let notes = [];

app.get('/', (req, res) => {
    res.send('Notes API');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});