import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';

@Component({
  selector: 'app-settings-security',
  imports: [ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './settings-security.html',
  styleUrl: './settings-security.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSecurity {
  private freelancerService = inject(FreelancerService);

  formGroup = signal(
    new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    }),
  );
  formErrors = signal({
    password: '',
    passwordConfirmation: '',
  });
  onUpdatePassword = signal('false');

  onSubmit(): void {
    const params = {
      password: <string>this.formGroup().get('password')?.value,
      passwordConfirmation: <string>(
        this.formGroup().get('passwordConfirmation')?.value
      ),
    };

    this.onUpdatePassword.set('true');

    this.freelancerService.updateSecurity(params).subscribe({
      complete: () => {
        this.onUpdatePassword.set('success');

        this.formErrors.set({
          password: '',
          passwordConfirmation: '',
        });
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onUpdatePassword.set('error');

        if (type && type === 'INVALID_PARAMETERS') {
          this.formErrors.set(error.error.error);
        }
      },
    });
  }
}
