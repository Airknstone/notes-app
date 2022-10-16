import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from 'server/models/notes-model';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor (private http: HttpClient) { }

  findAllNotes(): Observable<any> {
    return this.http.get('/api/notes');
  }

  addCategory(note: INote): Observable<any> {
    return this.http.post('/api/notes', {
      category: note.category,
      description: note.description,
      note: {
        noteTitle: "",
        noteBody: "",
        links: {}
      }
    });
  }
  deleteNoteCategory(noteId: string): Observable<any> {
    return this.http.delete<any>(`/api/notes/${noteId}`);
  }
}
