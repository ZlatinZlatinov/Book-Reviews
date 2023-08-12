import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../books/bookType';

@Injectable({
  providedIn: 'root'
})
export class TopRatedService {

  constructor(private http: HttpClient) { }

  getTopRatedBooks() {
    return this.http.get<Book[]>('/api/books/top');
  }
}
