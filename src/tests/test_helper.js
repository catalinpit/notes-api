const Note = require('../models/Note');
const User = require('../models/User');

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

const usersInDb = async () => {
    const users = await User.find({});

    return users.map(u = u.toJSON());
};

const nonExistingId = async () => {
    const note = new Note(
        { 
            content: 'My note',
            date: new Date()
        }
    );

    await note.save();
    await note.remove();

    return note._id.toString();
};

const notesInDb = async () => {
    const notes = await Note.find({});
    
    return notes.map(note => note.toJSON());
};

module.exports = {
    initialNotes,
    usersInDb,
    nonExistingId,
    notesInDb
};