import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { AppState } from '../../store/app.state';

import * as FreelancerActions from '../../store/freelancer/freelancer.actions';
import { selectOnGetFreelancer } from '../../store/freelancer/freelancer.selectors';

@Injectable({
  providedIn: 'root',
})
export class App {
  private store = inject(Store<AppState>);
  private platformId = inject(PLATFORM_ID);

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.store.dispatch(FreelancerActions.getFreelancer());

      this.store
        .select(selectOnGetFreelancer)
        .pipe(
          filter((onGetFreelancer) =>
            ['success', 'error'].includes(onGetFreelancer),
          ),
          take(1),
        )
        .subscribe(() => resolve());
    });
  }

  platform(): 'browser' | 'server' {
    return isPlatformBrowser(this.platformId) ? 'browser' : 'server';
  }
}
