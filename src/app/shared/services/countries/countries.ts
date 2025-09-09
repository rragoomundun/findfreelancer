import { Injectable } from '@angular/core';

import countriesJSON from '../../../../../public/countries.json';

@Injectable({
  providedIn: 'root',
})
export class Countries {
  countries: { code: string; name: string }[];

  constructor() {
    this.countries = countriesJSON.map((country) => ({
      code: country.isoAlpha2,
      name: country.name,
    }));
  }

  getCountryName(countryCode: string | null | undefined): string {
    return this.countries.find((country) => countryCode === country.code)!.name;
  }
}
