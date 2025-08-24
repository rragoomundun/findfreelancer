import { Injectable } from '@angular/core';

import countries from '../../../../../public/countries.json';

@Injectable({
  providedIn: 'root',
})
export class Countries {
  getCountryName(countryCode: string): string {
    return countries.find((country) => countryCode === country.isoAlpha2)!.name;
  }
}
