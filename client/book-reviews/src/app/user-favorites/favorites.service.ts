import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../books/bookType';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

  getMyFavorites() {
    return this.http.get<Book[]>('/token/books/favorites');
  }
}
