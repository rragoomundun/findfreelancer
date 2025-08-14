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

  registerConfirm(confirmationToken: string): Observable<Object> {
    return this.http.post(
      `${this.API_PREFIX}/register/confirm/${confirmationToken}`,
      {},
      { withCredentials: true }
    );
  }
}
