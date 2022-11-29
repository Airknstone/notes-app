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

  findFolderById(folderId: string): Observable<any> {
    return this.http.get<any>(`/api/notes/${folderId}`);
  }
  addFolder(note: Notes): Observable<any> {
    return this.http.post<any>('/api/notes', {
      folderName: note.folderName,
      description: note.description,
    });
  }
  addNote(folderId: any, data: any): Observable<any> {
    console.log(folderId, data);
    return this.http.post(`/api/notes/${folderId}/note`,
      data);
  };
  updateFolder(folderId: any, data: any): Observable<any> {
    console.log(data);
    return this.http.put<any>(`/api/notes/${folderId}`, {
      folderName: data.folderName,
      description: data.description,
      notes: data.notes
    });
  }
  deleteNoteCategory(folderId: string): Observable<any> {
    return this.http.delete<any>(`/api/notes/${folderId}`);
  }

  deleteArrayOfObjId(objIds: string): Observable<any> {
    return this.http.delete<any>(`/api/notes/delete/${objIds}`);
  }


  deleteNoteInsideFolder(folderId: string, noteId: string) {
    return this.http.delete<any>(`/api/notes/${folderId}/${noteId}`);
  }
}
