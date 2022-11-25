"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var NoteSchema = new mongoose_1.Schema({
    folderName: { type: String, required: true },
    description: { type: String, required: true },
    // notesa: { ref: 'Note', type: Schema.Types.ObjectId },
    notes: [new mongoose_1.Schema({
            noteTitle: String,
            noteBody: String,
            tags: [new mongoose_1.Schema({
                    tag: String
                })]
        })]
}, { collection: 'notes' });
var Notes = (0, mongoose_1.model)('Note', NoteSchema);
exports["default"] = Notes;
