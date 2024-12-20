import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: User | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  userProfile() {
    this.router.navigate(['/user-profile']);
  }

  get isAuthenticated(): boolean {
    return this.userService.isLogged;
  }
}
