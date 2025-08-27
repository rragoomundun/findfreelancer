import { Component, DestroyRef, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../shared/store/app.state';

import { selectFreelancer } from '../../../../shared/store/freelancer/freelancer.selectors';
import * as FreelancerActions from '../../../../shared/store/freelancer/freelancer.actions';

import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';
import { File as FileService } from '../../../../shared/services/file/file';

import { Freelancer } from '../../../../shared/models/Freelancer';

@Component({
  selector: 'app-settings-delete-account',
  imports: [TranslateModule],
  templateUrl: './settings-delete-account.html',
  styleUrl: './settings-delete-account.scss',
})
export class SettingsDeleteAccount {
  private store = inject(Store<AppState>);
  private freelancerService = inject(FreelancerService);
  private fileService = inject(FileService);
  private destroyRef = inject(DestroyRef);

  onDelete = signal('false');

  deleteAccount(): void {
    this.freelancerService.deleteAccount().subscribe({
      complete: () => {
        this.onDelete.set('success');

        setTimeout(
          () => this.store.dispatch(FreelancerActions.logoutFreelancer()),
          3000,
        );
      },
    });
  }

  onDeleteClick(): void {
    const freelancer = this.store.select(selectFreelancer);

    this.onDelete.set('true');

    const freelancerSubscription = freelancer.subscribe(
      (freelancer: Freelancer | null | undefined) => {
        if (freelancer?.image) {
          const filePath = freelancer.image.split('findfreelancer.com/')[1];

          this.fileService.deleteFile({ fileName: filePath }).subscribe({
            complete: () => {
              this.deleteAccount();
            },
          });
        } else {
          this.deleteAccount();
        }
      },
    );

    this.destroyRef.onDestroy(() => freelancerSubscription.unsubscribe());
  }
}
