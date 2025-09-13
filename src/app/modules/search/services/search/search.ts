import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FreelancerSearchResult } from '../../models/FreelancerSearchResult';

@Injectable({
  providedIn: 'root',
})
export class Search {
  private readonly API_PREFIX = 'search';

  private http = inject(HttpClient);

  search(params: any): Observable<{
    freelancers: FreelancerSearchResult[];
    totalFreelancers: number;
    nbPages: number;
  }> {
    return this.http.get<{
      freelancers: FreelancerSearchResult[];
      totalFreelancers: number;
      nbPages: number;
    }>(`${this.API_PREFIX}/freelancer`, { params });
  }
}
