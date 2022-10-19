import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { INote } from 'server/models/notes-model';

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
    this._notesStream.next(newValue);
  }
  findAllNotes(): Observable<any> {
    return this.http.get<any>('/api/notes');
  }

  findCategoryById(noteId: string): Observable<any> {
    return this.http.get<any>(`/api/notes/${noteId}`);
  }
  addCategory(note: INote): Observable<any> {
    return this.http.post<any>('/api/notes', {
      category: note.category,
      description: note.description,
      note: {
        noteTitle: "",
        noteBody: "",
        links: {}
      }
    });
  }

  updateCategory(noteId: any): Observable<any> {
    return this.http.put<any>(`/api/notes/${noteId}`, {
      category: noteId.category,
      description: noteId.description,
    });
  }
  deleteNoteCategory(noteId: string): Observable<any> {
    return this.http.delete<any>(`/api/notes/${noteId}`);
  }

  deleteArrayOfObjId(objIds: string): Observable<any> {
    return this.http.delete<any>(`/api/notes/delete/${objIds}`);
  }

}
