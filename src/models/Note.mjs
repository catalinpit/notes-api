import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const Note = mongoose.model('Note', noteSchema);

export { Note }