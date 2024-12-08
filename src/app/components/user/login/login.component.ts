import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
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
