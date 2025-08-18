import { Routes } from '@angular/router';

import { unauthGuard } from './core/guards/unauth/unauth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-module').then((m) => m.AuthModule),
    canActivate: [unauthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home-module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
