import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor (private http: HttpClient) { }

  findAllNotes(): Observable<any> {
    return this.http.get('/api/notes');
  }
}
