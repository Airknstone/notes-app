import { Schema, model, Model, Types } from 'mongoose';
/* subdocument */
/* Subdocument definition */
export interface INoteItems {
  noteTitle: string,
  noteBody: { type: string, required: true; },
  tags: [ string ];
}

/* Document Definition */
export interface INote {
  folderName: string,
  description: string,
  notes: INoteItems[];
}

type NoteModel = Model<INote>;
const NoteSchema = new Schema<INote, NoteModel>(
  {
    folderName: { type: String, required: true },
    description: { type: String, required: true },
    notes: [ new Schema<INoteItems>({
      noteTitle: String,
      noteBody: String,
      tags: [ Array ]
    }) ]
  },
  { collection: 'notes' },
);

const Notes = model<INote>('Note', NoteSchema);

export default Notes;
