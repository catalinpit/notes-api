const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const Note = require('../models/Note');

const initialNotes = [
    {
        "content": "HTML is Easy",
        "date": "2021-11-20T11:30:27.825Z",
        "important": false,
        "id": "6198dc5395bd649312c7912c"
    },
    {
        "content": "Learn MongoDB",
        "date": "2021-11-20T12:00:05.793Z",
        "important": true,
        "id": "6198e3454c66c663ba76e1f7"
    }
];

beforeEach(async () => {
    await Note.deleteMany({});
    let noteObject = new Note(initialNotes[0]);
    await noteObject.save();
    noteObject = new Note(initialNotes[1]);
    await noteObject.save();
});

const api = supertest(app);

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});

test('there are two notes', async () => {
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(initialNotes.length);
});

test('the second note is about MongoDB', async () => {
    const response = await api.get('/api/notes');

    expect(response.body[1].content).toBe('Learn MongoDB');
});

afterAll(() => {
    mongoose.connection.close();
});