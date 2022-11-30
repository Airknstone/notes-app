import { Schema, model, Model } from 'mongoose';

/* Definition interface */
interface definition {
  word: string,
  wordtype: string,
  definition: string;
}

/* Schema */
const definitionSchema = new Schema<definition>({
  word: { type: String, required: true, default: 'null' },
  wordtype: { type: String, required: true, default: 'null' },
  definition: { type: String, required: true, default: 'null' },
}, {
  collection: 'Dictionary'
});

//Model
const Definition = model<definition>('Definition', definitionSchema);

export default Definition;
