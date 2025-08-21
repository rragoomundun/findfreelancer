import { Routes } from '@angular/router';

import { Register as RegisterComponent } from './components/register/register';
import { RegisterConfirm as RegisterConfirmComponent } from './components/register-confirm/register-confirm';
import { Login as LoginComponent } from './components/login/login';
import { PasswordForgotten as PasswordForgottenComponent } from './components/password-forgotten/password-forgotten';
import { ResetPassword as ResetPasswordComponent } from './components/reset-password/reset-password';

export const authRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'REGISTER_PAGE.TITLE' },
  },
  {
    path: 'register/confirm/:confirmationToken',
    component: RegisterConfirmComponent,
    data: { title: 'REGISTER_CONFIRM_PAGE.TITLE' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'LOGIN_PAGE.TITLE' },
  },
  {
    path: 'password',
    children: [
      {
        path: 'forgotten',
        component: PasswordForgottenComponent,
        data: { title: 'PASSWORD_FORGOTTEN_PAGE.TITLE' },
      },
      {
        path: 'reset/:resetPasswordToken',
        component: ResetPasswordComponent,
        data: { title: 'RESET_PASSWORD_PAGE.TITLE' },
      },
    ],
  },
];
