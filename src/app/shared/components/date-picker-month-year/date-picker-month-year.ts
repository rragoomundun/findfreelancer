import {
  Component,
  inject,
  input,
  signal,
  ChangeDetectionStrategy,
  output,
  OnInit,
  effect,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ReactiveFormsModule,
  ControlContainer,
  FormGroupDirective,
  FormControl,
} from '@angular/forms';

import { DateService } from '../../services/date/date';

import { DateYear } from '../../models/DateYear';

@Component({
  selector: 'app-date-picker-month-year',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './date-picker-month-year.html',
  styleUrl: './date-picker-month-year.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class DatePickerMonthYear implements OnInit {
  private dateService = inject(DateService);

  label = input<string>();
  minDate = input<DateYear | null>();
  monthControlName = input<string>();
  yearControlName = input<string>();
  monthControl = input<FormControl<string | null>>();
  yearControl = input<FormControl<string | null>>();
  dateChanged = output<DateYear>();

  months = signal<{ value: number; name: string }[]>([]);
  years = signal<number[]>([]);

  constructor() {
    effect(() => {
      if (this.minDate()) {
        if (
          this.yearControl()?.value &&
          Number(this.yearControl()?.value) < this.minDate()!.year
        ) {
          this.yearControl()?.setValue(String(this.minDate()!.year));
        }

        this.setMonths();
        this.setYears();
      }
    });
  }

  ngOnInit(): void {
    this.setYears();
    this.setMonths();

    this.onDateChanged();
  }

  setMonths(): void {
    const selectedYear = Number(this.yearControl()?.value);
    const minYear = <number>this.minDate()?.year;
    let startMonth = 1;

    this.months.set([]);

    if (selectedYear === minYear && this.monthControl()?.value !== '') {
      startMonth = <number>this.minDate()?.month;

      if (Number(this.monthControl()?.value) < startMonth) {
        this.monthControl()?.setValue(String(startMonth - 1));
      }
    }

    for (let i = startMonth - 1; i < 12; i++) {
      this.months().push({
        value: i,
        name: this.dateService.months()[i],
      });
    }
  }

  setYears(): void {
    const currentYear = new Date().getFullYear();

    this.years.set([]);

    for (let i = currentYear; i >= this.minDate()!?.year; i--) {
      this.years().push(i);
    }
  }

  onDateChanged(): void {
    this.dateChanged.emit({
      month: Number(this.monthControl()?.value),
      year: Number(this.yearControl()?.value),
    });
  }
}
