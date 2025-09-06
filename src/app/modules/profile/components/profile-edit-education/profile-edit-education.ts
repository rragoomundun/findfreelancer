import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
  DestroyRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';

import * as FreelancerActions from '../../../../shared/store/freelancer/freelancer.actions';
import {
  selectFreelancerEducations,
  selectOnDeleteEducation,
} from '../../../../shared/store/freelancer/freelancer.selectors';

import { ProfileEditEducationEdit as ProfileEditEducationEditComponent } from '../profile-edit-education-edit/profile-edit-education-edit';
import { ShowMore as ShowMoreComponent } from '../../../../shared/components/show-more/show-more';

import { Countries as CountriesService } from '../../../../shared/services/countries/countries';
import { DateService } from '../../../../shared/services/date/date';

import { FreelancerEducation } from '../../../../shared/models/FreelancerEducation';

@Component({
  selector: 'app-profile-edit-education',
  imports: [
    TranslateModule,
    AsyncPipe,
    ProfileEditEducationEditComponent,
    ShowMoreComponent,
  ],
  templateUrl: './profile-edit-education.html',
  styleUrl: './profile-edit-education.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditEducation {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  countriesService = inject(CountriesService);
  dateService = inject(DateService);

  profileEditEducationEditComponent =
    viewChild<ProfileEditEducationEditComponent>(
      'profileEditEducationEditComponent',
    );

  educations$: Observable<FreelancerEducation[] | null | undefined>;
  onDeleteEducation$: Observable<{ [key: string]: string }>;

  constructor() {
    this.store.dispatch(FreelancerActions.getFreelancerEducations());

    this.educations$ = this.store.select(selectFreelancerEducations);
    this.onDeleteEducation$ = this.store.select(selectOnDeleteEducation);

    const educationsSubscription = this.educations$.subscribe(
      (educations: FreelancerEducation[] | null | undefined) => {
        if (educations) {
          const educationsIds = <string[]>(
            educations?.map((education) => education._id)
          );

          this.store.dispatch(
            FreelancerActions.deleteFreelancerEducationInit({ educationsIds }),
          );
        }
      },
    );

    this.destroyRef.onDestroy(() => educationsSubscription.unsubscribe());
  }

  onEditEducationClick(education: FreelancerEducation | null): void {
    this.profileEditEducationEditComponent()?.open(education);
  }

  onDeleteEducationClick(educationId: string): void {
    this.store.dispatch(
      FreelancerActions.deleteFreelancerEducation({ educationId }),
    );
  }
}
