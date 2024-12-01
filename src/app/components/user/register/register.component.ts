import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    repassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
  });

  submit(){
  
  }
}
