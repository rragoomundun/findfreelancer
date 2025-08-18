import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { AppState } from '../../../shared/store/app.state';

import { selectFreelancer } from '../../../shared/store/freelancer/freelancer.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectFreelancer).pipe(
    map((freelancer) => {
      if (freelancer) {
        return true;
      }

      router.navigate(['/']);
      return false;
    }),
  );
};
