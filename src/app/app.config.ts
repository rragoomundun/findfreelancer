import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { freelancerReducer } from './shared/store/freelancer/freelancer.reducer';
import { FreelancerEffects } from './shared/store/freelancer/freelancer.effects';

import { routes } from './app.routes';

import { apiInterceptor } from './core/interceptors/api/api-interceptor';

import { App as AppService } from './shared/services/app/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideAppInitializer(() => {
      const appService = inject(AppService);
      return appService.init();
    }),
    provideClientHydration(withEventReplay()),
    provideStore({ freelancer: freelancerReducer }),
    provideEffects([FreelancerEffects]),
  ],
};
