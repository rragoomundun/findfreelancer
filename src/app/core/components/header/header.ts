import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Freelancer } from '../../../shared/models/Freelancer';

import { AppState } from '../../../shared/store/app.state';
import { selectFreelancer } from '../../../shared/store/freelancer/freelancer.selectors';

@Component({
  selector: 'app-header',
  imports: [RouterModule, TranslateModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private store = inject(Store<AppState>);

  freelancer$: Observable<Freelancer | null>;

  constructor() {
    this.freelancer$ = this.store.select(selectFreelancer);
  }

  hideHamburgerMenu(): void {
    const hamburgerIconEl = <HTMLButtonElement>(
      document.querySelector('#this-hamburger-icon')
    );

    if (hamburgerIconEl && window.innerWidth < 992) {
      hamburgerIconEl.click();
    }
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: any): void {
    const header = document.querySelector('header');
    const navbarTogglerEl = document.querySelector(
      '.navbar-collapse.collapse.show'
    );

    if (header?.contains(event.target) === false && navbarTogglerEl) {
      this.hideHamburgerMenu();
    }
  }
}
