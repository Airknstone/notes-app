
import { Schema, model, Types, InferSchemaType } from 'mongoose';


/* Approach 1 */
export interface INote {
  category: string,
  notesTitle: string;
  notesBody: string;
}

const NoteSchema = new Schema<INote>(
  {
    category: { type: String, required: true },
    notesTitle: { type: String, required: true },
    notesBody: { type: String, required: true },
  },
  { collection: 'notes' },
);

/* Approach 2 */
/* export type Note = InferSchemaType<typeof NoteSchema>; */


const Notes = model<INote>('Note', NoteSchema);
export default Notes;
