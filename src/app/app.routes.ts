import { Routes } from '@angular/router';

import { unauthGuard } from './core/guards/unauth/unauth-guard';

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
        path: '**',
        redirectTo: '/auth/login',
      },
    ];
