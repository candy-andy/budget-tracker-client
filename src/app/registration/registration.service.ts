import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserRegistration {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  // TODO: extract to .env
  private registrationUrl = 'http://localhost:8080/api/user/register';

  constructor(private httpClient: HttpClient) {}

  // TODO: add User type
  register(user: UserRegistration): Observable<UserRegistration> {
    return this.httpClient.post<UserRegistration>(this.registrationUrl, user);
  }
}
