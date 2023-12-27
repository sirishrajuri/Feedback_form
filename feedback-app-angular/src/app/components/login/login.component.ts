import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  public submitted = false;
  authError=''
  roles: string[] = [];

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username':new FormControl('', [Validators.required]),
      'password':new FormControl('', [Validators.required]),
    })
  }
  constructor(private authService:AuthService, private tokenStorage: TokenStorageService,private router : Router) {

  }
  submitLogin() {
   
    this.submitted = true;
    if(this.loginForm.valid) {
      this.submitted=false
      this.authService.login(this.loginForm.value['username'], this.loginForm.value['password']).subscribe(
        data => {
          console.log(data);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(["/"]);
          //this.reloadPage();
        },
        err => {
          this.authError = err.error.error;
        }
      );
    }
  }

  
  reloadPage(): void {
    window.location.reload();
  }
}
