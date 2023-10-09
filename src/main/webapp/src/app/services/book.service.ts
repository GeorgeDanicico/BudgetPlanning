import { Injectable } from '@angular/core';
import { Book } from '../utils/app.types';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS, SERVER_URL } from '../utils/app.constants';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<any[]>(`${SERVER_URL}${ENDPOINTS.BOOKS}`);
  }

  addBook(title: string, author: string, status: string) {
    return this.http.post(`${SERVER_URL}${ENDPOINTS.BOOKS}`, { title: title, author: author, status: status });
  }

  editBook(bookId: number, status: string) {
    return this.http.put(`${SERVER_URL}${ENDPOINTS.BOOKS}/${bookId}/${status}`, {});
  }

  deleteBook(bookId: number) {
    return this.http.delete(`${SERVER_URL}${ENDPOINTS.BOOKS}/${bookId}`);
  }
}
