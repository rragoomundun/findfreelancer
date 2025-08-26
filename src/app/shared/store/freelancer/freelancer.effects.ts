import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of, tap } from 'rxjs';

import * as FreelancerActions from './freelancer.actions';

import { Freelancer } from '../../models/Freelancer';

import { Freelancer as FreelancerService } from '../../services/freelancer/freelancer';
import { Auth as AuthService } from '../../../modules/auth/services/auth/auth';

@Injectable()
export class FreelancerEffects {
  private actions$ = inject(Actions);
  private freelancerService = inject(FreelancerService);
  private authService = inject(AuthService);

  getFreelancer = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.getFreelancer),
      exhaustMap(() =>
        this.freelancerService.getMe().pipe(
          map((freelancer: Freelancer) =>
            FreelancerActions.getFreelancerSuccess({ freelancer }),
          ),
          catchError(() => of(FreelancerActions.getFreelancerError())),
        ),
      ),
    ),
  );

  logoutFreelancer = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.logoutFreelancer),
      exhaustMap(() =>
        this.authService.logout().pipe(
          tap(() => {
            window.location.href = window.location.origin;
          }),
        ),
      ),
    ),
  );

  updateFreelancerSettingsIdentity = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.updateFreelancerSettingsIdentity),
      exhaustMap(({ email, firstName, lastName }) =>
        this.freelancerService
          .updateIdentity({ email, firstName, lastName })
          .pipe(
            map(() =>
              FreelancerActions.updateFreelancerSettingsIdentitySuccess({
                email,
                firstName,
                lastName,
              }),
            ),
            catchError((error) =>
              of(
                FreelancerActions.updateFreelancerSettingsIdentityError(
                  error.error,
                ),
              ),
            ),
          ),
      ),
    ),
  );
}
