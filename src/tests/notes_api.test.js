const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../../app');
const api = supertest(app);
const Note = require('../models/Note');

beforeEach(async () => {
    await Note.deleteMany({});

    for (let note of helper.initialNotes) {
        let noteObject = new Note(note);
        await noteObject.save();
    }
});

describe('there are notes saved', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes');
    
        expect(response.body).toHaveLength(helper.initialNotes.length);
    });

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes');
    
        const notes = response.body.map(note => note.content);
    
        expect(notes).toContain('Learn MongoDB');
    });
});

describe('testing a specific note', () => {
    test('a specific note can be retrieved', async () => {
        const notes = await helper.notesInDb();
    
        const resultNote = await api
            .get(`/api/notes/${notes[0].id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    
        const viewNote = JSON.parse(JSON.stringify(resultNote));
    
        expect(resultNote.text).toEqual(viewNote.text);
    });
});


describe('adding a note', () => {
    test('a valid note can be added', async () => {
        const newNote = {
            content: 'This is a valid note',
            important: true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    
        const notesAtEnd = await helper.notesInDb();
        const contents = notesAtEnd.map(n => n.content);
    
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);
        expect(contents).toContain('This is a valid note');
    });

    test('note without content is not saved into the db', async () => {
        const newNote = {
            important: true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
    
        const response = await api.get('/api/notes');
    
        expect(response.body).toHaveLength(helper.initialNotes.length);
    });
});

describe('deleting a note', () => {
    test('deletion of a note with valid id succeeds', async () => {
        const initialNotes = await helper.notesInDb();
    
        await api
            .delete(`/api/notes/${initialNotes[0].id}`)
            .expect(204);
    
        const updatedNotes = await helper.notesInDb();
        const finalNotes = updatedNotes.map(note => note.content);
    
        expect(updatedNotes).toHaveLength(helper.initialNotes.length - 1);
        expect(finalNotes).not.toContain(initialNotes[0].content);
    });
});

afterAll(() => {
    mongoose.connection.close();
});