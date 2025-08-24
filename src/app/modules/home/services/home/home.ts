import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Home as HomeModel } from '../../models/Home';

@Injectable({
  providedIn: 'root',
})
export class Home {
  private readonly API_PREFIX = 'home';

  private http = inject(HttpClient);

  getHomeContent(): Observable<HomeModel> {
    return this.http.get<HomeModel>(this.API_PREFIX);
  }
}
