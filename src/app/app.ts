import { Component, inject } from '@angular/core';
import {
  Router,
  RouterOutlet,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from './shared/store/app.state';

import { selectOnGetFreelancer } from './shared/store/freelancer/freelancer.selectors';

import { Header as HeaderComponent } from './core/components/header/header';
import { Footer as FooterComponent } from './core/components/footer/footer';

import { Translation as TranslationService } from './shared/services/translation/translation';
import { App as AppService } from './shared/services/app/app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private titleService = inject(Title);
  private store = inject(Store<AppState>);
  private translationService = inject(TranslationService);

  appService = inject(AppService);

  onGetFreelancer$: Observable<string>;

  constructor() {
    this.onGetFreelancer$ = this.store.select(selectOnGetFreelancer);

    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';

          while (route!.firstChild) {
            route = route.firstChild;
          }

          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }

          return routeTitle;
        }),
      )
      .subscribe((title: string) => {
        if (title) {
          if (title === 'APP.TITLE') {
            this.titleService.setTitle(
              this.translationService.instant('APP.TITLE'),
            );
          } else {
            this.titleService.setTitle(
              `${this.translationService.instant(
                title,
              )} - ${this.translationService.instant('APP.TITLE')}`,
            );
          }
        }
      });
  }
}
