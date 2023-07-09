import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { LoginError, User } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private _error: LoginError | null = null;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService
  ) {
    this.loginForm.controls['password'].valueChanges.subscribe(() => {
      if (this.error?.field === 'password') this.error = null;
    });
    this.loginForm.controls['email'].valueChanges.subscribe(() => {
      if (this.error?.field === 'email') this.error = null;
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get error() {
    return this._error!;
  }

  set error(error: LoginError | null) {
    this._error = error;
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.loginService.login({ email, password }).subscribe({
        next: (data: User) => console.log(data),
        error: (error: LoginError) => {
          this.error = error;
        },
        complete: () => console.log('Completed'), // TODO: navigate to dashboard
      });
    }
  }
}
