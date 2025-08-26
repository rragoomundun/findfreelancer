import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Freelancer as FreelancerModel } from '../../models/Freelancer';

@Injectable({
  providedIn: 'root',
})
export class Freelancer {
  private readonly API_PREFIX = 'freelancer';

  private http = inject(HttpClient);

  getMe(): Observable<FreelancerModel> {
    return this.http.get<FreelancerModel>(this.API_PREFIX, {
      withCredentials: true,
    });
  }

  updateIdentity(params: {
    email: string;
    firstName: string;
    lastName: string;
  }): Observable<null> {
    return this.http.put<null>(`${this.API_PREFIX}/settings/identity`, params, {
      withCredentials: true,
    });
  }
}
