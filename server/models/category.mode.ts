import { Schema, model } from 'mongoose';

/* Interface for ICategory, used to create a category and then will have
notesBody pushed to it. */
export interface ICategory {
  category: string,
  description: string,
}

const categorySchema = new Schema<ICategory>({
  category: { type: String, required: true },
  description: { type: String, required: true }
},
  { collection: 'notes' },);
const Category = model<ICategory>('Category', categorySchema);
export default Category;
