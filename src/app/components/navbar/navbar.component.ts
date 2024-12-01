import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

 
  constructor(private router: Router) {}

  login(){
    this.router.navigate(['/login']);
  }

  register(){
    this.router.navigate(['/register'])
  }

  logout(){

  }

  userProfile(){
    this.router.navigate(['/user-profile']);
  }

}
