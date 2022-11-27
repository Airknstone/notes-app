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
export interface Notes {
  _id: string,
  folderName: string,
  description: string,
  notes: INoteItems[];
}


