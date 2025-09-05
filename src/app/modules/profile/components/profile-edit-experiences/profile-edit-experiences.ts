import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../shared/store/app.state';

import {
  selectFreelancerExperiences,
  selectOnDeleteExperience,
} from '../../../../shared/store/freelancer/freelancer.selectors';

import * as FreelancerActions from '../../../../shared/store/freelancer/freelancer.actions';

import { ShowMore as ShowMoreComponent } from '../../../../shared/components/show-more/show-more';
import { ProfileEditExperiencesEdit as ProfileEditExperiencesEditComponent } from '../profile-edit-experiences-edit/profile-edit-experiences-edit';

import { Countries as CountriesService } from '../../../../shared/services/countries/countries';
import { DateService } from '../../../../shared/services/date/date';

import { FreelancerExperience } from '../../../../shared/models/FreelancerExperience';

@Component({
  selector: 'app-profile-edit-experiences',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe,
    ProfileEditExperiencesEditComponent,
    ShowMoreComponent,
  ],
  templateUrl: './profile-edit-experiences.html',
  styleUrl: './profile-edit-experiences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditExperiences {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  countriesService = inject(CountriesService);
  dateService = inject(DateService);

  profileEditExperienceEditComponent =
    viewChild<ProfileEditExperiencesEditComponent>(
      'profileEditExperienceEditComponent',
    );

  experiences$: Observable<FreelancerExperience[] | null | undefined>;
  onDeleteExperience$: Observable<{ [key: string]: string }>;

  constructor() {
    this.store.dispatch(FreelancerActions.getFreelancerExperiences());

    this.experiences$ = this.store.select(selectFreelancerExperiences);
    this.onDeleteExperience$ = this.store.select(selectOnDeleteExperience);

    const experiencesSubscription = this.experiences$.subscribe(
      (experiences: FreelancerExperience[] | null | undefined) => {
        if (experiences) {
          const experiencesIds = <string[]>(
            experiences?.map((experience) => experience._id)
          );

          this.store.dispatch(
            FreelancerActions.deleteFreelancerExperienceInit({
              experiencesIds,
            }),
          );
        }
      },
    );

    this.destroyRef.onDestroy(() => experiencesSubscription.unsubscribe());
  }

  onEditExperienceClick(experience: FreelancerExperience | null): void {
    this.profileEditExperienceEditComponent()?.open(experience);
  }

  onDeleteExperienceClick(experienceId: string): void {
    this.store.dispatch(
      FreelancerActions.deleteFreelancerExperience({ experienceId }),
    );
  }
}
