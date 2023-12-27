import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm!:FormGroup
  public submitted = false;
  confirmPassword =false
  authError=''
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username':new FormControl('', [Validators.required]),
      'email':new FormControl('', [Validators.required, Validators.email]),
      'password':new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword':new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  constructor(private authService:AuthService, private router:Router) {

  }
  submitLogin() {
    this.confirmPassword=false
    if (this.loginForm.value.password !== this.loginForm.value.confirmPassword) {
      this.confirmPassword=true
      return;
    }
    this.submitted=true
    if(this.loginForm.valid) {
      this.submitted=false
      this.authService.register(this.loginForm.value['username'], this.loginForm.value['email'], this.loginForm.value['password']).subscribe(
        data => {
            this.router.navigate(['']);
        },
        err => {
          this.authError = err.error.message;
        }
      );
    }
  }
}
