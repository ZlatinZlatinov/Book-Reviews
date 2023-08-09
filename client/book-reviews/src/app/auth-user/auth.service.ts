import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './userType';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<User | undefined>(undefined);
  user = this._user$.asObservable();
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth_token');
    this._isLoggedIn$.next(!!token);
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/auth/login', { email, password })
      .pipe(tap((response) => {
        this._isLoggedIn$.next(true);
        this._user$.next(response);
        localStorage.setItem('auth_token', response.accessToken);
      }));
  }

  register(email: string, username: string, password: string) {
    return this.http.post<User>('/api/auth/register', { email, username, password });
  }

  logOut() {
    let token;
    this.user.subscribe((u) => token = u?.accessToken);
    return this.http.post<unknown>('/api/auth/logout', { token }).subscribe(() => {
      localStorage.removeItem('auth_token');
      this._isLoggedIn$.next(false);
      this._user$.next(undefined);
    });
  }
}
