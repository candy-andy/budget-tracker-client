import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { UserRegistration, UserRegistrationResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  // TODO: extract to .env
  private readonly REGISTRATION_URL = 'http://localhost:8080/api/user/register';

  constructor(private httpClient: HttpClient) {}

  register(user: UserRegistration): Observable<UserRegistrationResponse> {
    return this.httpClient
      .post<UserRegistration>(this.REGISTRATION_URL, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    switch (error.status) {
      case 0:
        errorMessage = 'Network error';
        break;
      case 409:
        errorMessage = 'Email already exists';
        break;
      default:
        errorMessage = 'Something went wrong';
    }

    return throwError(() => errorMessage);
  }
}
