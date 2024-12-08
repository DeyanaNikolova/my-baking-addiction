import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | undefined;


  constructor() {
    try {
      const user = sessionStorage.getItem('user') || '';
      this.user = JSON.parse(user);
    } catch (error) {
      this.user = undefined;
    }
  }

  setAuth(token: string ) {
   sessionStorage.setItem('token', token);
 
  }
  setUser(user: User){
   sessionStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    const token = sessionStorage.getItem('token');
    console.log(token); 
    return token;
  }

  getUser(){
    const user = sessionStorage.getItem('user') || '';
    this.user = JSON.parse(user);
    console.log(this.user); 
  }

  // get isAuthenticated(): boolean {
   
  // }

  removeAuth(){
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  }
  
  
}
