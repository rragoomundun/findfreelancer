import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, mergeMap, catchError, of, tap } from 'rxjs';

import * as FreelancerActions from './freelancer.actions';

import { Freelancer } from '../../models/Freelancer';

import { Freelancer as FreelancerService } from '../../services/freelancer/freelancer';
import { Auth as AuthService } from '../../../modules/auth/services/auth/auth';
import { FreelancerExperience } from '../../models/FreelancerExperience';
import { FreelancerEducation } from '../../models/FreelancerEducation';

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

  getFreelancerExperiences = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.getFreelancerExperiences),
      exhaustMap(() =>
        this.freelancerService.getExperiences().pipe(
          map((experiences: FreelancerExperience[]) =>
            FreelancerActions.getFreelancerExperiencesSuccess({ experiences }),
          ),
          catchError(() => of(FreelancerActions.getFreelancerExperiencesError)),
        ),
      ),
    ),
  );

  createFreelancerExperience = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.createFreelancerExperience),
      exhaustMap(({ experience }) =>
        this.freelancerService.createExperience(experience).pipe(
          map((createdExperience) =>
            FreelancerActions.createFreelancerExperienceSuccess({
              experience: createdExperience,
            }),
          ),
          catchError(() =>
            of(FreelancerActions.createFreelancerExperienceError),
          ),
        ),
      ),
    ),
  );

  updateFreelancerExperience = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.updateFreelancerExperience),
      exhaustMap(({ experience }) =>
        this.freelancerService.updateExperience(experience).pipe(
          map(() =>
            FreelancerActions.updateFreelancerExperienceSuccess({ experience }),
          ),
          catchError(() =>
            of(FreelancerActions.updateFreelancerExperienceError),
          ),
        ),
      ),
    ),
  );

  deleteFreelancerExperience = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.deleteFreelancerExperience),
      mergeMap(({ experienceId }) =>
        this.freelancerService.deleteExperience(experienceId).pipe(
          map(() =>
            FreelancerActions.deleteFreelancerExperienceSuccess({
              experienceId,
            }),
          ),
          catchError(() =>
            of(
              FreelancerActions.deleteFreelancerExperienceError({
                experienceId,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  getFreelancerEducations = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.getFreelancerEducations),
      exhaustMap(() =>
        this.freelancerService.getEducations().pipe(
          map((educations: FreelancerEducation[]) =>
            FreelancerActions.getFreelancerEducationsSuccess({ educations }),
          ),
          catchError(() => of(FreelancerActions.getFreelancerEducationsError)),
        ),
      ),
    ),
  );

  createFreelancerEducation = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.createFreelancerEducation),
      exhaustMap(({ education }) =>
        this.freelancerService.createEducation(education).pipe(
          map((createdEducation) =>
            FreelancerActions.createFreelancerEducationSuccess({
              education: createdEducation,
            }),
          ),
          catchError(() =>
            of(FreelancerActions.createFreelancerEducationError),
          ),
        ),
      ),
    ),
  );

  updateFreelancerEducation = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.updateFreelancerEducation),
      exhaustMap(({ education }) =>
        this.freelancerService.updateEducation(education).pipe(
          map(() =>
            FreelancerActions.updateFreelancerEducationSuccess({ education }),
          ),
          catchError(() =>
            of(FreelancerActions.updateFreelancerEducationError),
          ),
        ),
      ),
    ),
  );

  deleteFreelancerEducation = createEffect(() =>
    this.actions$.pipe(
      ofType(FreelancerActions.deleteFreelancerEducation),
      mergeMap(({ educationId }) =>
        this.freelancerService.deleteEducation(educationId).pipe(
          map(() =>
            FreelancerActions.deleteFreelancerEducationSuccess({ educationId }),
          ),
          catchError(() =>
            of(
              FreelancerActions.deleteFreelancerEducationError({ educationId }),
            ),
          ),
        ),
      ),
    ),
  );
}
