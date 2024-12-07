import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
     return this.http.post<User>(this.apiUrl + '/users/login', {email, password});
  }
}
