const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
  linkTitle: { type: String, required: true },
  linkHref: { type: String, required: true },
});

const NotesSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  links: [linksSchema],
});

module.exports = NotesSchema;
