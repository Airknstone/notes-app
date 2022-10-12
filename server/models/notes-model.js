const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotesSchema = require('../schemas/notes-schema');

const NoteSchema = new Schema(
  {
    category: { type: String, required: true },
    notes: [NotesSchema],
  },
  { collection: 'notes' },
);

module.exports = mongoose.model('Note', NoteSchema);
