import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  // loginForm = new FormGroup({
  //   userName: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  // });
  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const credentials = this.loginForm.value;
  //     console.log('Submitting:', credentials);
  //   }
  // }

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.loginService.checkauthenticate(credentials).subscribe(
        (response: any)=>{
          if(response.authenticated)
          {
            console.log(response.userData.userName);
             console.log(response.userData.password);
             console.log(response.token);
             this.loginService.setUserData(response.userData);
            this.router.navigate(['/customer_details']);
          }
          else
          {
            console.log("Login Failed!!!!!");
            console.log(response.message);
          }
        }
      )
      console.log('Submitting:', credentials);
    }
  }
}
