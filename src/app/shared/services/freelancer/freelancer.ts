import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Freelancer as FreelancerModel } from '../../models/Freelancer';

@Injectable({
  providedIn: 'root',
})
export class Freelancer {
  private readonly API_PREFIX = 'freelancer';

  private http = inject(HttpClient);

  getMe(): Observable<FreelancerModel> {
    return of({
      _id:"689f19de670f3481d89cadd5",
      email:"maeva.ragoomundun@protonmail.com",
      firstName:"Maeva",
      lastName:"Ragoomundun",
      image:""
    }).pipe(
        delay(3000),
      ); //this.http.get<FreelancerModel>(this.API_PREFIX, {
      // withCredentials: true,
    // });
  }
}
