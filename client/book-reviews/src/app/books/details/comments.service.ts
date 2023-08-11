import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../commentType';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  commentBook(bookId: string, text: string) {
    return this.http.post<Comment>('/token/books/comments', { bookId, text });
  }

  getBookComments(bookId: string) {
    return this.http.get<Comment[]>('/api/books/comments/' + bookId);
  }
}
