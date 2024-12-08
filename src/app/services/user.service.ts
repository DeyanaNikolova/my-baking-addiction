import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.api_url;

  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user$$.asObservable();
  user: User | undefined;

  subscription: Subscription;
  http = inject(HttpClient);

  constructor() {
    const token = sessionStorage.getItem('token');
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.apiUrl + '/users/login', { email, password })
      .pipe(
        tap((user) => {
          sessionStorage.setItem('token', user.accessToken);
          this.user$$.next(user);
        })
      );
  }

  register(
    email: string,
    username: string,
    password: string,
  ): Observable<User> {
    return this.http
      .post<User>(this.apiUrl + '/users/register', {
        email,
        username,
        password,
      })
      .pipe(
        tap((user) => {
          sessionStorage.setItem('token', user.accessToken);
          this.user$$.next(user);
        })
      );
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  authHeaders() {
    const token = this.getToken();
    const headers = new HttpHeaders({ 'X-Authorization': token as string });
    const options = {
      headers: headers,
    };
    return options;
  }

  logout(): Observable<User> {
   return this.http.get<User>(this.apiUrl + '/users/logout', this.authHeaders())
    .pipe(
      tap(() => {
        sessionStorage.removeItem('token');
        this.user$$.next(undefined);
        this.isLogged;
      }))
    
    
    
    // sessionStorage.removeItem('token');
    // this.user = undefined;
    // this.isLogged;
    // this.authService.removeUser();
  }
}
