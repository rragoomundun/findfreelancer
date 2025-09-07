import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';
import { Languages as LanguagesService } from '../../../../shared/services/languages/languages';

import { FreelancerLanguage } from '../../../../shared/models/FreelancerLanguage';

@Component({
  selector: 'app-profile-edit-languages',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './profile-edit-languages.html',
  styleUrl: './profile-edit-languages.scss',
})
export class ProfileEditLanguages {
  private freelancerService = inject(FreelancerService);
  private languagesService = inject(LanguagesService);

  formGroup = signal(
    new FormGroup({
      languages: new FormArray<
        FormGroup<{
          code: FormControl<string | null>;
          level: FormControl<string | null>;
        }>
      >([]),
    }),
  );
  onUpdateLanguage = signal('false');

  get languagesControls() {
    return this.formGroup().controls.languages.controls;
  }

  constructor() {
    this.freelancerService.getLanguages().subscribe({
      next: (languages: FreelancerLanguage[]) => {
        for (const language of languages) {
          this.formGroup().controls.languages.push(
            new FormGroup({
              code: new FormControl(language.code, [Validators.required]),
              level: new FormControl(language.level, [Validators.required]),
            }),
          );
        }
      },
    });
  }

  getLanguages(
    selectedLanguageIndex: number,
  ): { code: string; name: string }[] {
    let selectedLanguages = this.languagesControls.map(
      (languageControl) => languageControl.controls.code.value,
    );
    selectedLanguages = selectedLanguages.filter(
      (selectedLanguage) =>
        selectedLanguage !==
        this.languagesControls[selectedLanguageIndex].controls['code'].value,
    );

    return this.languagesService
      .languages()
      .filter(
        (language) => selectedLanguages.includes(language.code) === false,
      );
  }

  onDeleteLanguageClick(languageIndex: number): void {
    this.formGroup().controls.languages.removeAt(languageIndex);
  }

  onAddLanguageClick(): void {
    this.languagesControls.push(
      new FormGroup({
        code: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]),
      }),
    );
  }

  onSubmit(): void {
    const languages: FreelancerLanguage[] = this.languagesControls.map(
      (languageControl) => ({
        code: <string>languageControl.controls.code.value,
        level: <string>languageControl.controls.level.value,
      }),
    );

    this.onUpdateLanguage.set('true');

    this.freelancerService.updateLanguages(languages).subscribe({
      complete: () => {
        this.onUpdateLanguage.set('success');
      },
    });
  }
}
