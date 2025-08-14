import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Register as RegisterComponent } from './components/register/register';
import { RegisterConfirm as RegisterConfirmComponent } from './components/register-confirm/register-confirm';
import { Login as LoginComponent } from './components/login/login';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutes {}
