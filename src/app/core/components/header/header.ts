import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
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
