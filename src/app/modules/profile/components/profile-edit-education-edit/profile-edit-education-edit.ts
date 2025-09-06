import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { AppState } from '../../../../shared/store/app.state';

import * as FreelancerActions from '../../../../shared/store/freelancer/freelancer.actions';
import {
  selectOnCreateEducation,
  selectOnUpdateEducation,
} from '../../../../shared/store/freelancer/freelancer.selectors';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { DatePickerMonthYear as DatePickerMonthYearComponent } from '../../../../shared/components/date-picker-month-year/date-picker-month-year';
import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';

import { Countries as CountriesService } from '../../../../shared/services/countries/countries';

import { FreelancerEducation } from '../../../../shared/models/FreelancerEducation';
import { DateYear } from '../../../../shared/models/DateYear';

@Component({
  selector: 'app-profile-edit-education-edit',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    AsyncPipe,
    InputComponent,
    TextAreaComponent,
    DatePickerMonthYearComponent,
  ],
  templateUrl: './profile-edit-education-edit.html',
  styleUrl: './profile-edit-education-edit.scss',
})
export class ProfileEditEducationEdit {
  private modalService = inject(NgbModal);
  private store = inject(Store<AppState>);

  countriesService = inject(CountriesService);

  onCreateEducation$: Observable<string>;
  onUpdateEducation$: Observable<string>;

  modalEl = viewChild<ElementRef>('modal');

  formGroup = signal<
    FormGroup<{
      school: FormControl<string | null>;
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
      studyingHere: FormControl<boolean | null>;
      description: FormControl<string | null>;
    }>
  >(
    new FormGroup({
      school: new FormControl('', [Validators.required]),
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
      studyingHere: new FormControl(false, [Validators.required]),
      description: new FormControl('', [Validators.required]),
    }),
  );
  minEndDate = signal<DateYear | null>(null);
  educationId = signal<string | null>(null);

  constructor() {
    this.onCreateEducation$ = this.store.select(selectOnCreateEducation);
    this.onUpdateEducation$ = this.store.select(selectOnUpdateEducation);
  }

  open(education: FreelancerEducation | null): void {
    this.store.dispatch(FreelancerActions.updateFreelancerEducationInit());

    if (education) {
      this.educationId.set(education._id);

      const startDate = new Date(education.startDate);
      let endDate = null;

      if (education.endDate) {
        endDate = new Date(education.endDate);
      }

      this.formGroup().controls['school'].setValue(education.school);
      this.formGroup().controls['town'].setValue(education.town);
      this.formGroup().controls['countryCode'].setValue(education.countryCode);
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
        this.formGroup().controls['studyingHere'].setValue(false);
      } else {
        (<FormGroup>this.formGroup().controls['endDate']).controls[
          'month'
        ].setValue('');
        (<FormGroup>this.formGroup().controls['endDate']).controls[
          'year'
        ].setValue('');
        this.formGroup().controls['studyingHere'].setValue(true);
      }

      this.formGroup().controls['description'].setValue(education.description);
    } else {
      this.formGroup().controls['school'].setValue('');
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

      this.formGroup().controls['studyingHere'].setValue(false);
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
      this.formGroup().controls.studyingHere.value === false &&
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

    const education: FreelancerEducation | null = {
      _id: '',
      school: <string>this.formGroup().controls.school.value,
      town: <string>this.formGroup().controls.town.value,
      countryCode: <string>this.formGroup().controls.countryCode.value,
      startDate,
      endDate,
      description: <string>this.formGroup().controls.description.value,
    };

    if (this.educationId()) {
      education._id = <string>this.educationId();

      this.store.dispatch(
        FreelancerActions.updateFreelancerEducation({ education }),
      );
    } else {
      this.store.dispatch(
        FreelancerActions.createFreelancerEducation({ education }),
      );
    }

    this.modalService.dismissAll();
  }
}
