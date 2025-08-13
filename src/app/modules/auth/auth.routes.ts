import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Register as RegisterComponent } from './components/register/register';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'REGISTER_PAGE.TITLE' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutes {}
