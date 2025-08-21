import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Freelancer as FreelancerModel } from '../../models/Freelancer';

@Injectable({
  providedIn: 'root',
})
export class Freelancer {
  private readonly API_PREFIX = 'freelancer';

  private http = inject(HttpClient);

  getMe(): Observable<FreelancerModel> {
    return of({
      _id: 'asdfasfd',
      firstName: 'asdfasdf',
      lastName: 'asdfasdf',
      email: 'asdf@asdf.com',
      image: 'test',}); //this.http.get<FreelancerModel>(this.API_PREFIX, {
      // withCredentials: true,
    // });
  }
}
