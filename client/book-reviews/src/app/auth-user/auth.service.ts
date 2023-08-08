import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './userType';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>('/api/auth/login', { email, password });
  }

  register(email: string, username: string, password: string) {
    return this.http.post<User>('/api/auth/register', { email, username, password });
  }
}
