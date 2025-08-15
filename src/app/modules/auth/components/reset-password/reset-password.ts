import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Auth as AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-reset-password',
  imports: [TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

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
  onReset = signal('false');
  resetPasswordError = signal('');

  resetFormErrors(): void {
    this.formErrors.set({
      password: '',
      passwordConfirmation: '',
    });
  }

  onSubmit(): void {
    const { resetPasswordToken } = this.activatedRoute.snapshot.params;
    const params = {
      password: <string>this.formGroup().get('password')?.value,
      passwordConfirmation: <string>(
        this.formGroup().get('passwordConfirmation')?.value
      ),
    };

    this.onReset.set('true');

    this.authService.resetPassword(resetPasswordToken, params).subscribe({
      complete: () => {
        this.onReset.set('success');
        this.resetFormErrors();

        setTimeout(() => (window.location.href = window.location.origin), 3000);
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onReset.set('error');

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors.set(error.error.error);
            this.resetPasswordError.set('');
          } else {
            this.resetFormErrors();
            this.resetPasswordError.set(`RESET_PASSWORD_PAGE.ERRORS.${type}`);
          }
        }
      },
    });
  }
}
