import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { LoginFieldType, User, UserLogin } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // TODO: extract to .env
  private readonly LOGIN_URL = 'http://localhost:8080/api/auth/login';

  constructor(private readonly httpClient: HttpClient) {}

  login(data: UserLogin): Observable<User> {
    return this.httpClient
      .post<UserLogin>(this.LOGIN_URL, data)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    let field: LoginFieldType;

    switch (error.status) {
      case 0:
        errorMessage = 'Network error';
        field = 'email';
        break;
      case 401:
        errorMessage = 'Wrong password';
        field = 'password';
        break;
      case 404:
        errorMessage = 'Email does not exist';
        field = 'email';
        break;
      default:
        errorMessage = 'Something went wrong';
        field = 'email';
    }

    return throwError(() => ({ errorMessage, field }));
  }
}
