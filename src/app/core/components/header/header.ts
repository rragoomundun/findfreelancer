import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Freelancer } from '../../../shared/models/Freelancer';

import { AppState } from '../../../shared/store/app.state';
import * as FreelancerActions from '../../../shared/store/freelancer/freelancer.actions';
import {
  selectFreelancer,
  selectOnGetFreelancer,
} from '../../../shared/store/freelancer/freelancer.selectors';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, RouterModule, TranslateModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  freelancer$: Observable<Freelancer | null | undefined>;
  onGetFreelancer$: Observable<string>;

  formGroup = signal(
    new FormGroup({
      query: new FormControl('', [Validators.required]),
    }),
  );

  constructor() {
    this.freelancer$ = this.store.select(selectFreelancer);
    this.onGetFreelancer$ = this.store.select(selectOnGetFreelancer);
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
      '.navbar-collapse.collapse.show',
    );

    if (header?.contains(event.target) === false && navbarTogglerEl) {
      this.hideHamburgerMenu();
    }
  }

  onLogoutClick(): void {
    this.store.dispatch(FreelancerActions.logoutFreelancer());
  }

  onSearch(): void {
    const query = this.formGroup().controls.query.value;

    this.router.navigate(['/search'], { queryParams: { query } });
    this.formGroup().controls.query.setValue('');
  }
}
