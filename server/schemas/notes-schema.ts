import { model, Schema, Types } from "mongoose";
import { ILinks } from './links-schema';

export interface INotesItems {
  title: string,
  body: string,
  links: Types.Array<ILinks>;
}


const Notes: Schema = new Schema<INotesItems>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  links: [ { linkTitle: String, linkHref: String } ]
});

const Note = model<INotesItems>('Note', Notes);
export default Note;
