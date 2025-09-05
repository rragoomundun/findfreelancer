import { Component, input, output } from '@angular/core';
import {
  NgbDate,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class DatePicker {
  id = input<string>();
  label = input<string>();
  control = input<string>();
  minDate = input<NgbDateStruct | null>();
  dateSelect = output<NgbDateStruct>();

  onDateSelect(date: NgbDate): void {
    this.dateSelect.emit(date);
  }
}
