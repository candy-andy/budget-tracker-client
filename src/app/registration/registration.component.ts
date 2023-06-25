import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { RegistrationService, UserRegistration } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm = this.formBuilder.group({
    email: '',
    password: '',
    confirmPassword: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  // TODO: add form validation
  onSubmit() {
    const { email, password } = this.registrationForm.value;

    if (email && password) {
      this.registrationService
        .register({ email, password })
        .subscribe((data: UserRegistration) => console.log(data));
    }
  }
}
