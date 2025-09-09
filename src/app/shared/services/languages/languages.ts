import { Injectable, signal } from '@angular/core';

import languagesJSON from '../../../../../public/languages.json';

@Injectable({
  providedIn: 'root',
})
export class Languages {
  languages = signal<{ code: string; name: string }[]>([]);

  constructor() {
    this.languages.set(
      languagesJSON.map((language) => ({
        code: language.code,
        name: language.name,
      })),
    );
  }

  getLanguageName(code: string) {
    return this.languages().find((language) => language.code === code)?.name;
  }
}
