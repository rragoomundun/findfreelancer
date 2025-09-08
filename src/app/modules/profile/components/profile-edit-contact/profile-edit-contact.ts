import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';

import { FreelancerContact } from '../../../../shared/models/FreelancerContact';

@Component({
  selector: 'app-profile-edit-contact',
  imports: [ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './profile-edit-contact.html',
  styleUrl: './profile-edit-contact.scss',
})
export class ProfileEditContact {
  private freelancerService = inject(FreelancerService);

  formGroup = signal(
    new FormGroup({
      email: new FormControl(''),
      phone: new FormControl(''),
    }),
  );
  onUpdateContact = signal('false');

  constructor() {
    this.freelancerService.getContact().subscribe({
      next: (contact: FreelancerContact) => {
        this.formGroup().controls.email.setValue(contact.email);
        this.formGroup().controls.phone.setValue(contact.phone);
      },
    });
  }

  onSubmit(): void {
    const contact: FreelancerContact = {
      email: <string>this.formGroup().controls.email.value,
      phone: <string>this.formGroup().controls.phone.value,
    };

    this.onUpdateContact.set('true');

    this.freelancerService.updateContact(contact).subscribe({
      complete: () => {
        this.onUpdateContact.set('success');
      },
    });
  }
}
