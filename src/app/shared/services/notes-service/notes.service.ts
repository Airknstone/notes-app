import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  _notesStream = new BehaviorSubject([]);
  constructor (private http: HttpClient) {
  }

  getValue(): Observable<any> {
    return this._notesStream.asObservable();
  }

  setValue(newValue: any): void {
    console.log(newValue);
    this._notesStream.next(newValue);
  }
  findAllNotes(): Observable<any> {
    console.log('Running findAllNotes');
    return this.http.get<any>('/api/notes');
  }

  findCategoryById(noteId: string): Observable<any> {
    return this.http.get<any>(`/api/notes/${noteId}`);
  }
  addCategory(note: any): Observable<any> {
    return this.http.post<any>('/api/notes', {
      category: note.category,
      description: note.description,
      /*       note: {
              noteTitle: "",
              noteBody: "",
              links: {}
            } */
    });
  }
  addNote(noteId: any, data: any): Observable<any> {
    return this.http.put(`/api/notes/${noteId}/note`,
      {
        noteTitle: data.noteTitle,
        noteBody: data.noteBody,
        links: {
          linkTitle: data.body.links.linkTitle,
          linkHref: data.body.links.linkHref
        }
      });
  };
  updateCategory(noteId: any, data: any): Observable<any> {
    return this.http.put<any>(`/api/notes/${noteId}`, {
      category: data.category,
      description: data.description,
    });
  }
  deleteNoteCategory(noteId: string): Observable<any> {
    return this.http.delete<any>(`/api/notes/${noteId}`);
  }

  deleteArrayOfObjId(objIds: string): Observable<any> {
    return this.http.delete<any>(`/api/notes/delete/${objIds}`);
  }

}
