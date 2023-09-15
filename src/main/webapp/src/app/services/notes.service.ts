import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS, SERVER_URL } from '../utils/app.constants';
import { NotesResponse } from '../utils/app.types';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getAllNotes() {
    return this.http.get<any[]>(`${SERVER_URL}${ENDPOINTS.NOTES}`);
  }

  addNote(title: string, description: string) {
    return this.http.post(`${SERVER_URL}${ENDPOINTS.NOTES}`, { title: title, description: description});
  }

  editNote(noteId: number, title: string, description: string) {
    return this.http.post(`${SERVER_URL}${ENDPOINTS.NOTES}/${noteId}`, { title: title, description: description});
  }

  deleteNote() {

  }

}
