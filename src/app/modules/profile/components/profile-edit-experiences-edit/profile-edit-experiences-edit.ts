import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

import { AppState } from '../../../../shared/store/app.state';

import * as FreelancerActions from '../../../../shared/store/freelancer/freelancer.actions';
import {
  selectOnCreateExperience,
  selectOnUpdateExperience,
} from '../../../../shared/store/freelancer/freelancer.selectors';

import { DatePickerMonthYear as DatePickerMonthYearComponent } from '../../../../shared/components/date-picker-month-year/date-picker-month-year';
import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';

import { Countries as CountriesService } from '../../../../shared/services/countries/countries';

import { FreelancerExperience } from '../../../../shared/models/FreelancerExperience';
import { DateYear } from '../../../../shared/models/DateYear';

@Component({
  selector: 'app-profile-edit-experiences-edit',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe,
    DatePickerMonthYearComponent,
    TextAreaComponent,
  ],
  templateUrl: './profile-edit-experiences-edit.html',
  styleUrl: './profile-edit-experiences-edit.scss',
})
export class ProfileEditExperiencesEdit {
  private modalService = inject(NgbModal);
  private store = inject(Store<AppState>);

  countriesService = inject(CountriesService);

  modalEl = viewChild<ElementRef>('modal');

  onCreateExperience$: Observable<string>;
  onUpdateExperience$: Observable<string>;

  formGroup = signal<
    FormGroup<{
      title: FormControl<string | null>;
      organization: FormControl<string | null>;
      town: FormControl<string | null>;
      countryCode: FormControl<string | null>;
      startDate: FormGroup<{
        month: FormControl<string | null>;
        year: FormControl<string | null>;
      }>;
      endDate: FormGroup<{
        month: FormControl<string | null>;
        year: FormControl<string | null>;
      }>;
      workHere: FormControl<boolean | null>;
      description: FormControl<string | null>;
    }>
  >(
    new FormGroup({
      title: new FormControl('', [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
      countryCode: new FormControl('', [Validators.required]),
      startDate: new FormGroup({
        month: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
      }),
      endDate: new FormGroup({
        month: new FormControl('', []),
        year: new FormControl('', []),
      }),
      workHere: new FormControl(false, [Validators.required]),
      description: new FormControl('', [Validators.required]),
    }),
  );
  selectedStartDate = signal<DateYear | null>(null);
  minEndDate = signal<DateYear | null>(null);
  experienceId = signal<string | null>(null);

  constructor() {
    this.onCreateExperience$ = this.store.select(selectOnCreateExperience);
    this.onUpdateExperience$ = this.store.select(selectOnUpdateExperience);
  }

  open(experience: FreelancerExperience | null): void {
    this.store.dispatch(FreelancerActions.updateFreelancerExperienceInit());
    this.store.dispatch(FreelancerActions.createFreelancerExperienceInit());

    if (experience) {
      this.experienceId.set(experience._id);

      const startDate = new Date(experience.startDate);
      let endDate = null;

      if (experience.endDate) {
        endDate = new Date(experience.endDate);
      }

      this.formGroup().controls['title'].setValue(experience.title);
      this.formGroup().controls['organization'].setValue(
        experience.organization,
      );
      this.formGroup().controls['town'].setValue(experience.town);
      this.formGroup().controls['countryCode'].setValue(experience.countryCode);
      (<FormGroup>this.formGroup().controls['startDate']).controls[
        'month'
      ].setValue(startDate.getMonth());
      (<FormGroup>this.formGroup().controls['startDate']).controls[
        'year'
      ].setValue(startDate.getFullYear());

      if (endDate) {
        (<FormGroup>this.formGroup().controls['endDate']).controls[
          'month'
        ].setValue(endDate.getMonth());
        (<FormGroup>this.formGroup().controls['endDate']).controls[
          'year'
        ].setValue(endDate.getFullYear());
        this.formGroup().controls['workHere'].setValue(false);
      } else {
        (<FormGroup>this.formGroup().controls['endDate']).controls[
          'month'
        ].setValue('');
        (<FormGroup>this.formGroup().controls['endDate']).controls[
          'year'
        ].setValue('');
        this.formGroup().controls['workHere'].setValue(true);
      }

      this.formGroup().controls['description'].setValue(experience.description);
    } else {
      this.formGroup().controls['title'].setValue('');
      this.formGroup().controls['organization'].setValue('');
      this.formGroup().controls['town'].setValue('');
      this.formGroup().controls['countryCode'].setValue('');
      (<FormGroup>this.formGroup().controls['startDate']).controls[
        'month'
      ].setValue('');
      (<FormGroup>this.formGroup().controls['startDate']).controls[
        'year'
      ].setValue('');

      (<FormGroup>this.formGroup().controls['endDate']).controls[
        'month'
      ].setValue('');
      (<FormGroup>this.formGroup().controls['endDate']).controls[
        'year'
      ].setValue('');

      this.formGroup().controls['workHere'].setValue(false);
      this.formGroup().controls['description'].setValue('');
    }

    this.modalService.open(this.modalEl(), { size: 'lg' });
  }

  onStartDateChanged(date: DateYear): void {
    this.minEndDate.set({
      month: date.month + 1,
      year: date.year,
    });
  }

  onSaveClick(): void {
    let endDate = null;
    let startDate;
    let startDateMonth: string | number =
      Number(this.formGroup().controls.startDate.controls.month.value) + 1;

    if (startDateMonth < 10) {
      startDateMonth = `0${startDateMonth}`;
    }

    startDate = `${this.formGroup().controls.startDate.controls.year.value}-${startDateMonth}-01`;

    if (
      this.formGroup().controls.workHere.value === false &&
      this.formGroup().controls.endDate.controls.month.value !== '' &&
      this.formGroup().controls.endDate.controls.year.value
    ) {
      let month: string | number =
        Number(this.formGroup().controls.endDate.controls.month.value) + 1;

      if (month < 10) {
        month = `0${month}`;
      }

      endDate = `${this.formGroup().controls.endDate.controls.year.value}-${month}-01`;
    }

    const experience: FreelancerExperience | null = {
      _id: '',
      title: <string>this.formGroup().controls.title.value,
      organization: <string>this.formGroup().controls.organization.value,
      town: <string>this.formGroup().controls.town.value,
      countryCode: <string>this.formGroup().controls.countryCode.value,
      startDate,
      endDate,
      description: <string>this.formGroup().controls.description.value,
    };

    if (this.experienceId()) {
      experience._id = <string>this.experienceId();

      this.store.dispatch(
        FreelancerActions.updateFreelancerExperience({ experience }),
      );
    } else {
      this.store.dispatch(
        FreelancerActions.createFreelancerExperience({ experience }),
      );
    }

    this.modalService.dismissAll();
  }
}
