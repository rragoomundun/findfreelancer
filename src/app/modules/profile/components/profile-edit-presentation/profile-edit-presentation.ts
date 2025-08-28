import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';

import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';

import { FreelancerPresentationInformation } from '../../../../shared/models/FreelancerPresentationInformation';

@Component({
  selector: 'app-profile-edit-presentation',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    InputComponent,
    TextAreaComponent,
  ],
  templateUrl: './profile-edit-presentation.html',
  styleUrl: './profile-edit-presentation.scss',
})
export class ProfileEditPresentation {
  private freelancerService = inject(FreelancerService);

  formGroup = signal(
    new FormGroup({
      title: new FormControl(''),
      presentationText: new FormControl(''),
    }),
  );
  onUpdate = signal('false');

  constructor() {
    this.freelancerService.getPresentationInformation().subscribe({
      next: (presentationInformation: FreelancerPresentationInformation) => {
        this.formGroup().controls.title.setValue(presentationInformation.title);
        this.formGroup().controls.presentationText.setValue(
          presentationInformation.presentationText,
        );
      },
    });
  }

  onSubmit(): void {
    const params = {
      title: this.formGroup().controls.title.value,
      presentationText: this.formGroup().controls.presentationText.value,
    };

    this.onUpdate.set('true');

    this.freelancerService.updatePresentationInformation(params).subscribe({
      complete: () => {
        this.onUpdate.set('success');
      },
    });
  }
}
