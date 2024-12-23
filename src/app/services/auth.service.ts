import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
user: User | undefined;

  constructor() {}

  setAuth(token: string ) {
   sessionStorage.setItem('token', token);
 
  }
  setUser(user: User){
   sessionStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
   return sessionStorage.getItem('token');
  }

  getUser(){
    return sessionStorage.getItem('user') || '';
  }

  removeAuth(){
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  } 
  
}
