import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS, SERVER_URL } from '../utils/app.constants';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getAllEvents() {
    return this.http.get<any[]>(`${SERVER_URL}${ENDPOINTS.NOTES}`);
  }


  addEvent(title: string, description: string, start: string, end: string, allDay: boolean) {
    return this.http.post(`${SERVER_URL}${ENDPOINTS.NOTES}`, { title: title, description: description, start: start, end: end,
      allDay: allDay});
  }

  editEvent(noteId: number, title: string, description: string) {
    return this.http.put(`${SERVER_URL}${ENDPOINTS.NOTES}/${noteId}`, { title: title, description: description});
  }

  deleteEvent(noteId: number) {
    return this.http.delete(`${SERVER_URL}${ENDPOINTS.NOTES}/${noteId}`);
  }
}
