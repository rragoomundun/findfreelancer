import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'auth/register/confirm/:confirmationToken',
    renderMode: RenderMode.Client,
  },
  {
    path: 'auth/password/reset/:resetPasswordToken',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
