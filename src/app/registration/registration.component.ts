import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { RegistrationService, UserRegistration } from './registration.service';

const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  const isPasswordsMatch =
    password && confirmPassword && password.value === confirmPassword.value;

  return isPasswordsMatch ? null : { passwordsDontMatch: true };
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator }
  );

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  get email() {
    return this.registrationForm.get('email')!;
  }

  get password() {
    return this.registrationForm.get('password')!;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')!;
  }

  onSubmit() {
    const { email, password } = this.registrationForm.value;

    if (email && password) {
      this.registrationService
        .register({ email, password })
        .subscribe((data: UserRegistration) => console.log(data));
    }
  }
}
