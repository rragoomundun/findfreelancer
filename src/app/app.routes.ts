import { Routes } from '@angular/router';

import { unauthGuard } from './core/guards/unauth/unauth-guard';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [unauthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.routes').then(
        (m) => m.settingsRoutes,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.routes').then((m) => m.profileRoutes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
