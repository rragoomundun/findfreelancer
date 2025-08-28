import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Freelancer as FreelancerModel } from '../../models/Freelancer';
import { FreelancerGeneralInformation } from '../../models/FreelancerGeneralInformation';

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

  updateSecurity(params: {
    password: string;
    passwordConfirmation: string;
  }): Observable<null> {
    return this.http.put<null>(`${this.API_PREFIX}/settings/security`, params, {
      withCredentials: true,
    });
  }

  deleteAccount(): Observable<null> {
    return this.http.delete<null>(`${this.API_PREFIX}`, {
      withCredentials: true,
    });
  }

  getGeneralInformation(): Observable<FreelancerGeneralInformation> {
    return this.http.get<FreelancerGeneralInformation>(
      `${this.API_PREFIX}/general`,
      {
        withCredentials: true,
      },
    );
  }

  updateGeneralInformation(
    params: FreelancerGeneralInformation,
  ): Observable<null> {
    return this.http.put<null>(`${this.API_PREFIX}/profile/general`, params, {
      withCredentials: true,
    });
  }
}
