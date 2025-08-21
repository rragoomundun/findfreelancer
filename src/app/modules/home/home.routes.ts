import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home as HomeComponent } from './components/home';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'HOME_PAGE.TITLE' },
  },
];