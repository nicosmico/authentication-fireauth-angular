import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.userForm = this.formBuilder.group({
      email: ["", [ Validators.email, Validators.required ]],
      password: ["", [ Validators.required, Validators.minLength(6) ]],
      confirmPassword: ["", [ Validators.required, Validators.minLength(6) ]],
      username: ["", Validators.required],
      phone: ["", [ Validators.minLength(8), Validators.maxLength(8), Validators.required, Validators.pattern('[1-9]*') ]]
    },
    {
      validators: [CustomValidators.confirmPassword]
    });
  }

  saveUser(event: Event){
    event.preventDefault();
    if(this.userForm.valid){
      const user: User = this.userForm.value;

      this.authService.register(user)
        .then(response => { 
          this.userService.saveUser(user)
            .then(response => {
              this.router.navigateByUrl("/");
            });
        })
        .catch(response => {
          if(response.code == "auth/email-already-in-use"){
            this.emailField?.setErrors({'email-already-in-use': true});
          }else{
            console.log("Error al registrar usuario", response);
          }
        });
    }
  }

  get emailField(){
    return this.userForm.get('email');
  }
  get passwordField(){
    return this.userForm.get('password');
  }
  get confirmPasswordField(){
    return this.userForm.get('confirmPassword');
  }
  get usernameField(){
    return this.userForm.get('username');
  }
  get phoneField(){
    return this.userForm.get('phone');
  }

  get isEmailValid(){
    return (this.emailField?.touched || this.emailField?.dirty) && this.emailField.valid;
  }
  get isPasswordValid(){
    return (this.passwordField?.touched || this.passwordField?.dirty) && this.passwordField.valid;
  }
  get isConfirmPasswordValid(){
    return (this.confirmPasswordField?.touched || this.confirmPasswordField?.dirty) && this.confirmPasswordField.valid;
  }
  get isUsernameValid(){
    return (this.usernameField?.touched || this.usernameField?.dirty) && this.usernameField.valid;
  }
  get isPhoneValid(){
    return (this.phoneField?.touched || this.phoneField?.dirty) && this.phoneField.valid;
  }
  
  get isEmailInvalid(){
    return (this.emailField?.touched || this.emailField?.dirty) && this.emailField.invalid;
  }
  get isPasswordInvalid(){
    return (this.passwordField?.touched || this.passwordField?.dirty) && this.passwordField.invalid;
  }
  get isConfirmPasswordInvalid(){
    return (this.confirmPasswordField?.touched || this.confirmPasswordField?.dirty) && this.confirmPasswordField.invalid;
  }
  get isUsernameInvalid(){
    return (this.usernameField?.touched || this.usernameField?.dirty) && this.usernameField.invalid;
  }
  get isPhoneInvalid(){
    return (this.phoneField?.touched || this.phoneField?.dirty) && this.phoneField.invalid;
  }
}
