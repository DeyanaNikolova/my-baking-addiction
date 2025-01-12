import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  usernameCtrl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]);
  passwordCtrl =  new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
  repasswordCtrl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]);

  registerForm: FormGroup = new FormGroup({
    email: this.emailCtrl,
    username: this.usernameCtrl,
    password:this.passwordCtrl,
    repassword: this.repasswordCtrl,
  });

  constructor(private userService: UserService, private router: Router) {}


  submit(){
    const { email, username, password, repassword } = this.registerForm.value;

    if(password !== repassword){
      return;
    }
    this.userService.register( email, username, password ).subscribe(()=>{  
      this.router.navigate(['/recipes']);
    })
  }
}
