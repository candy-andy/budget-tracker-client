import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
