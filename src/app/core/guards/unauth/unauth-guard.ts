import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs';

import { AppState } from '../../../shared/store/app.state';

import { selectFreelancer } from '../../../shared/store/freelancer/freelancer.selectors';

export const unauthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectFreelancer).pipe(
    map((freelancer) => {
      if (freelancer === null) {
        return true;
      }
      return router.createUrlTree(['/']);
    }),
  );
};
