import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Notes } from '../../interfaces/notes.interface';

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
    console.log("Set Value from Notes Service");
    this._notesStream.next(newValue);
  }
  findAllNotes(): Observable<any> {
    return this.http.get<any>('/api/notes');
  }

  findCategoryById(noteId: string): Observable<any> {
    return this.http.get<any>(`/api/notes/${noteId}`);
  }
  addFolder(note: Notes): Observable<any> {
    return this.http.post<any>('/api/notes', {
      folderName: note.folderName,
      description: note.description,
    });
  }
  addNote(noteId: any, data: any): Observable<any> {
    console.log(noteId, data);
    return this.http.post(`/api/notes/${noteId}/note`,
      data);
  };
  updateCategory(noteId: any, data: any): Observable<any> {
    return this.http.put<any>(`/api/notes/${noteId}`, {
      folderName: data.folderName,
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
