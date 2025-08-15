import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_PREFIX = 'auth';

  private http = inject(HttpClient);

  register(params: {
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    passwordConfirmation: string | null | undefined;
  }): Observable<Object | null> {
    return this.http.post(`${this.API_PREFIX}/register`, params);
  }

  registerConfirm(confirmationToken: string): Observable<null> {
    return this.http.post<null>(
      `${this.API_PREFIX}/register/confirm/${confirmationToken}`,
      {},
      { withCredentials: true },
    );
  }

  login(params: {
    email: string;
    password: string;
  }): Observable<Object | null> {
    return this.http.post<Object | null>(`${this.API_PREFIX}/login`, params, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.API_PREFIX}/logout`, {
      withCredentials: true,
    });
  }

  passwordForgotten(params: { email: string }): Observable<null> {
    return this.http.post<null>(`${this.API_PREFIX}/password/forgot`, params);
  }

  resetPassword(
    resetPasswordToken: string,
    params: { password: string; passwordConfirmation: string },
  ): Observable<Object | null> {
    return this.http.post<Object | null>(
      `${this.API_PREFIX}/password/reset/${resetPasswordToken}`,
      params,
      { withCredentials: true },
    );
  }
}
