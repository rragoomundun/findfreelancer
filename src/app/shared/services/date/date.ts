import { inject, Injectable, signal } from '@angular/core';

import { Translation as TranslationService } from '../translation/translation';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private translationService = inject(TranslationService);

  months = signal<string[]>([]);

  constructor() {
    this.translationService.get('GENERAL.MONTHS').subscribe({
      next: (value: any) => {
        this.months.set([
          value.JANUARY,
          value.FEBRUARY,
          value.MARCH,
          value.APRIL,
          value.MAY,
          value.JUNE,
          value.JULY,
          value.AUGUST,
          value.SEPTEMBER,
          value.OCTOBER,
          value.NOVEMBER,
          value.DECEMBER,
        ]);
      },
    });
  }

  getDateMonthYYYY(date: Date | string): string {
    const dateObj = new Date(date);

    return `${this.months()[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  }
}
