import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  login(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const email = this.form.value.email
      const password = this.form.value.password
      this.authService.login(email, password)
        .then(response => {
          console.log("Usuario logeado", response);
          this.router.navigateByUrl("/");
        })
        .catch(error => {
          switch (error.code) {
            case "auth/wrong-password":
              this.passwordField?.setErrors({'wrong-password': true});
              break;
            case "auth/user-not-found":
              this.emailField?.setErrors({'user-not-found': true});
              break;
            default:
              console.log("Error al logear", error);
              break;
          }
        });
    }
  }

  get emailField(){
    return this.form.get('email');
  }
  get passwordField(){
    return this.form.get('password');
  }

  get isEmailValid(){
    return (this.emailField?.touched || this.emailField?.dirty) && this.emailField.valid;
  }
  get isPasswordValid(){
    return (this.passwordField?.touched || this.passwordField?.dirty) && this.passwordField.valid;
  }

  get isEmailInvalid(){
    return (this.emailField?.touched || this.emailField?.dirty) && this.emailField.invalid;
  }
  get isPasswordInvalid(){
    return (this.passwordField?.touched || this.passwordField?.dirty) && this.passwordField.invalid;
  }

}
