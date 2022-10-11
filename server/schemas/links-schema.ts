import { Schema, model } from 'mongoose';

export interface ILinks {
  linkTitle: string;
  linkHref: string;
}

const NotesLinksSchema: Schema = new Schema<ILinks>({
  linkTitle: { type: String },
  linkHref: { type: String }
});

const NoteLinks = model<ILinks>('NoteLink', NotesLinksSchema);
export default NoteLinks;
