import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
 
  loginForm: FormGroup = new FormGroup({
    email: this.emailCtrl,
    password: this.passwordCtrl,
  });

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  submit(){
   
    if(this.loginForm.invalid){
      return;
    }

    const { email, password} = this.loginForm.value;
    this.userService.login(email, password).subscribe(()=>{  

      this.router.navigate(['/recipes']);
    })
  }
}
