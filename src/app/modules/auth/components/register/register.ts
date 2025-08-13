import { Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Auth as AuthService } from '../../services/auth/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService);

  formGroup = signal(
    new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    })
  );
  formErrors = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  registerError = signal('');
  onRegister = signal('false');

  resetFormErrors(): void {
    this.formErrors.set({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });
  }

  onSubmit(): void {
    const params = {
      firstName: this.formGroup().get('firstName')?.value,
      lastName: this.formGroup().get('lastName')?.value,
      email: this.formGroup().get('email')?.value,
      password: this.formGroup().get('password')?.value,
      passwordConfirmation: this.formGroup().get('passwordConfirmation')?.value,
    };

    this.onRegister.set('true');

    this.authService.register(params).subscribe({
      complete: () => {
        this.onRegister.set('success');
        this.resetFormErrors();
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onRegister.set('error');

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors.set(error.error.error);
          } else {
            this.resetFormErrors();
            this.registerError.set(`REGISTER_PAGE.ERRORS.${type}`);
          }
        }
      },
    });
  }
}
