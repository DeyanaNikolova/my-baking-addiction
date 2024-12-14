import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

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

  constructor(private authService: AuthService) {
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
      .post<User>(this.apiUrl + '/login', { email, password })
      .pipe(
        tap((user) => {
          this.authService.setAuth(user.accessToken);
          this.authService.setUser(user);
          this.user$$.next(user);
        })
      );
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<User> {
    return this.http
      .post<User>(this.apiUrl + '/register', {
        email,
        username,
        password,
      })
      .pipe(
        tap((user) => {
          this.authService.setAuth(user.accessToken);
          this.authService.setUser(user);
          this.user$$.next(user);
        })
      );
  }

  authHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const token = this.authService.getToken();
    if (token) {
      headers = headers.append('X-Authorization', token);
    }
    const options = {
      headers: headers,
    };

    return options;
  }

  logout() {
    this.http.get(`${this.apiUrl}/logout`, this.authHeaders());
    this.authService.removeAuth();
    this.isLogged;
    this.user$$.next(undefined);
  }

  getUserData(): Observable<User> {
    const user = JSON.parse(this.authService.getUser());
    console.log(user._id);
    return this.http.get<User>(`${this.apiUrl}/${user._id}`, this.authHeaders());
  }
}
