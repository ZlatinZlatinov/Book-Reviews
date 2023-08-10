import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './bookType';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBookById(id: string) {
    return this.http.get<Book>('/api/books/catalog/' + id);
  }

  getAllBooks() {
    return this.http.get<Book[]>('/api/books/catalog');
  }

  createBook(title: string, author: string, genre: string, img: string, review: string) {

    return this.http.post<Book>('/token/books/create',
      { title, author, genre, img, review });
  }

  deleteBook(id: string) {

    return this.http.delete<any>('/token/books/delete/' + id, {
      headers: { ['Content-Type']: 'application/json' }
    });
  }

  addBookToUserFavorites(bookId: string) {
    return this.http.post<any>('/token/books/favorites/', { bookId });
  }

  like(bookId: string) {
    return this.http.post<any>('/token/books/likes', { bookId });
  }
}
