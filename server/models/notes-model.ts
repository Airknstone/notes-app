import mongoose, { model, Schema, Types } from 'mongoose';
import { INotesItems } from '../schemas/notes-schema';

interface INotes {
  category: string;

  notes: Types.Array<INotesItems>;

}

const NoteSchema = new Schema<INotes>({
  category: { type: String, required: true },
  notes: []
}, { collection: 'Test_Collection' });

const Notes = model<INotes>('Note', NoteSchema);
export default Notes;
