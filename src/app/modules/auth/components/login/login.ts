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
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Auth as AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [TranslateModule, ReactiveFormsModule, RouterModule, InputComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private authService = inject(AuthService);

  formGroup = signal(
    new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }),
  );
  formErrors = signal({
    email: '',
    password: '',
  });
  loginError = signal('');
  onLogin = signal('false');

  resetFormErrors(): void {
    this.formErrors.set({
      email: '',
      password: '',
    });
  }

  onSubmit(): void {
    const params = {
      email: <string>this.formGroup().get('email')?.value,
      password: <string>this.formGroup().get('password')?.value,
    };

    this.onLogin.set('true');

    this.authService.login(params).subscribe({
      complete: () => {
        this.onLogin.set('success');
        this.resetFormErrors();

        window.location.href = window.location.origin;
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onLogin.set('error');

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors.set(error.error.error);
          } else {
            this.resetFormErrors();
            this.loginError.set(`LOGIN_PAGE.ERRORS.${type}`);
          }
        }
      },
    });
  }
}
