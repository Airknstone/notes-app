import { Schema, model, Model } from 'mongoose';
/* subdocument */
export interface ITag {
  tag: string;

}
/* Subdocument definition */
export interface INoteItems {
  noteTitle: string,
  noteBody: string,
  tags: ITag[];
}

/* Document Definition */
export interface INote {
  folderName: string,
  description: string,
  notes: INoteItems[];
  // notesa: Types.ObjectId;
}

type NoteModel = Model<INote>;
const NoteSchema = new Schema<INote, NoteModel>(
  {
    folderName: { type: String, required: true },
    description: { type: String, required: true },
    // notesa: { ref: 'Note', type: Schema.Types.ObjectId },
    notes: [ new Schema<INoteItems>({
      noteTitle: String,
      noteBody: String,
      tags: [ new Schema<ITag>({
        tag: String
      }) ],
    }) ]
  },
  { collection: 'notes' },
);

const Notes = model<INote>('Note', NoteSchema);

export default Notes;
