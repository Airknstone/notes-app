import { Schema, model, Types, Model } from 'mongoose';
/* subdocument */
export interface ILinks {
  linkHref: string;
  linkTitle: string,

}
/* Subdocument definition */
export interface INoteItems {
  noteTitle: string,
  noteBody: string,
  links: ILinks[];
}

/* Document Definition */
export interface INote {
  category: string,
  note: INoteItems[];
}

type NoteModel = Model<INote>;
const NoteSchema = new Schema<INote, NoteModel>(
  {
    category: { type: String, required: true },
    note: [ new Schema<INoteItems>({
      noteTitle: String,
      noteBody: String,
      links: [ new Schema<ILinks>({
        linkTitle: String,
        linkHref: String
      }) ],
    }) ]
  },
  { collection: 'notes' },
);

const Notes = model<INote>('Note', NoteSchema);

export default Notes;
