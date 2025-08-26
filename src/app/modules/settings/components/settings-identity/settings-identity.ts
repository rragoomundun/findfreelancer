import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { AppState } from '../../../../shared/store/app.state';

import {
  selectFreelancer,
  selectOnUpdateFreelancerSettingsIdentity,
} from '../../../../shared/store/freelancer/freelancer.selectors';
import * as FreelancerActions from '../../../../shared/store/freelancer/freelancer.actions';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Freelancer } from '../../../../shared/models/Freelancer';

@Component({
  selector: 'app-settings-identity',
  imports: [ReactiveFormsModule, TranslateModule, AsyncPipe, InputComponent],
  templateUrl: './settings-identity.html',
  styleUrl: './settings-identity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsIdentity {
  private store = inject(Store<AppState>);

  freelancer: Observable<Freelancer | null | undefined>;
  onUpdateFreelancerSettingsIdentity: Observable<string>;
  formGroup = signal(
    new FormGroup({
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    }),
  );
  formErrors = signal({
    email: '',
    firstName: '',
    lastName: '',
  });
  // onIdentityUpdate = signal('false');

  constructor() {
    this.freelancer = this.store.select(selectFreelancer);
    this.onUpdateFreelancerSettingsIdentity = this.store.select(
      selectOnUpdateFreelancerSettingsIdentity,
    );

    this.freelancer
      .pipe(take(1))
      .subscribe((freelancer: Freelancer | null | undefined) => {
        this.formGroup().controls.email.setValue(freelancer!?.email);
        this.formGroup().controls.firstName.setValue(freelancer!?.firstName);
        this.formGroup().controls.lastName.setValue(freelancer!?.lastName);
      });
  }

  onSubmit(): void {
    this.store.dispatch(
      FreelancerActions.updateFreelancerSettingsIdentity({
        email: <string>this.formGroup().controls.email.value,
        firstName: <string>this.formGroup().controls.firstName.value,
        lastName: <string>this.formGroup().controls.lastName.value,
      }),
    );
  }
}
