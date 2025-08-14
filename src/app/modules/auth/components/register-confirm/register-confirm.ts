import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { Auth as AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-register-confirm',
  imports: [TranslateModule],
  templateUrl: './register-confirm.html',
  styleUrl: './register-confirm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterConfirm implements OnInit {
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  onRegisterConfirm = signal('true');

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const { confirmationToken } = this.activatedRoute.snapshot.params;

      this.authService.registerConfirm(confirmationToken).subscribe({
        complete: () => {
          this.onRegisterConfirm.set('success');
          setTimeout(
            () => (window.location.href = window.location.origin),
            3000
          );
        },
        error: () => this.onRegisterConfirm.set('error'),
      });
    }
  }
}
