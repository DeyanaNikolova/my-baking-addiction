import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {}


  submit(){
    if(this.registerForm.invalid){
      return;
    }

    const { email, username, password } = this.registerForm.value;
    console.log(email, username, password);
    
    this.userService.register( email, username, password ).subscribe(()=>{  
      this.router.navigate(['/recipes']);
    })
  }
}
