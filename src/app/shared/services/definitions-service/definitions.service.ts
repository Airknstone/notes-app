
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Definitions } from '../../interfaces/definitions.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DefinitionsService {
  definitions: Definitions[] = [];
  constructor (private http: HttpClient) { }

  /* search database for matching terms and returns array of matches */
  getMatchingTerms(searchTerm: string): Observable<any> {
    return this.http.get<any>(`/api/search/${searchTerm}`);
  }
}

