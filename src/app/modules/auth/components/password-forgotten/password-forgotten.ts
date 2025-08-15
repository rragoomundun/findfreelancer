import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Auth as AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-password-forgotten',
  imports: [TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './password-forgotten.html',
  styleUrl: './password-forgotten.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordForgotten {
  private authService = inject(AuthService);

  formGroup = signal(
    new FormGroup({
      email: new FormControl('', [Validators.required]),
    }),
  );
  formErrors = signal({ email: '' });
  onForget = signal('false');
  passwordForgottenError = signal('');

  onSubmit(): void {
    const params = {
      email: <string>this.formGroup().get('email')?.value,
    };

    this.onForget.set('true');

    this.authService.passwordForgotten(params).subscribe({
      complete: () => {
        this.onForget.set('success');
        this.formErrors.set({ email: '' });
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onForget.set('error');

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors.set(error.error.error);
            this.passwordForgottenError.set('');
          } else {
            this.formErrors.set({ email: '' });
            this.passwordForgottenError.set(
              `PASSWORD_FORGOTTEN_PAGE.ERRORS.${type}`,
            );
          }
        }
      },
    });
  }
}
