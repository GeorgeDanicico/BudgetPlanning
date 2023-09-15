import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS, SERVER_URL } from '../utils/app.constants';
import { ILoginResponse } from '../utils/app.types';
import { access } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${ENDPOINTS.LOGIN}`, {username, password}, {responseType: 'json'});
  }

  register(username: string, password: string, email: string): Observable<Object> {
    return this.http.post(`${ENDPOINTS.REGISTER}`, {username, password, email}, {responseType: 'json'});
  }

  logout(): Observable<Object> {
    localStorage.removeItem('loggedIn');

    return this.http.post(`${ENDPOINTS.LOGOUT}`, {});
  }
}
