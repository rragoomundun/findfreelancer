import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMonthYear } from './date-picker-month-year';

describe('DatePickerMonthYear', () => {
  let component: DatePickerMonthYear;
  let fixture: ComponentFixture<DatePickerMonthYear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerMonthYear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerMonthYear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
