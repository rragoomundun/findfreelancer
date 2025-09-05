import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Freelancer as FreelancerModel } from '../../models/Freelancer';
import { FreelancerGeneralInformation } from '../../models/FreelancerGeneralInformation';
import { FreelancerPresentationInformation } from '../../models/FreelancerPresentationInformation';
import { FreelancerExperience } from '../../models/FreelancerExperience';

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

  getPresentationInformation(): Observable<FreelancerPresentationInformation> {
    return this.http.get<FreelancerPresentationInformation>(
      `${this.API_PREFIX}/presentation`,
      { withCredentials: true },
    );
  }

  updatePresentationInformation(
    params: FreelancerPresentationInformation,
  ): Observable<null> {
    return this.http.put<null>(
      `${this.API_PREFIX}/profile/presentation`,
      params,
      { withCredentials: true },
    );
  }

  getSkills(): Observable<{ skills: string[] }> {
    return this.http.get<{ skills: string[] }>(`${this.API_PREFIX}/skills`, {
      withCredentials: true,
    });
  }

  updateSKills(params: { skills: string[] }): Observable<null> {
    return this.http.put<null>(`${this.API_PREFIX}/profile/skills`, params, {
      withCredentials: true,
    });
  }

  getExperiences(): Observable<FreelancerExperience[]> {
    return this.http.get<FreelancerExperience[]>(
      `${this.API_PREFIX}/experiences`,
      { withCredentials: true },
    );
  }

  createExperience(
    experience: FreelancerExperience,
  ): Observable<FreelancerExperience> {
    return this.http.post<FreelancerExperience>(
      `${this.API_PREFIX}/profile/experience`,
      experience,
      { withCredentials: true },
    );
  }

  updateExperience(experience: FreelancerExperience): Observable<null> {
    return this.http.put<null>(
      `${this.API_PREFIX}/profile/experience/${experience._id}`,
      experience,
      { withCredentials: true },
    );
  }

  deleteExperience(id: string): Observable<null> {
    return this.http.delete<null>(
      `${this.API_PREFIX}/profile/experience/${id}`,
      { withCredentials: true },
    );
  }
}
