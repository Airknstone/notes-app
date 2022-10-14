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
export interface Notes {
  category: string,
  description: string,
  note: INoteItems[];
}


