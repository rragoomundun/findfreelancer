import { Component, signal, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../shared/store/app.state';

import { selectFreelancer } from '../../../../shared/store/freelancer/freelancer.selectors';

import { ShowMore as ShowMoreComponent } from '../../../../shared/components/show-more/show-more';

import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';
import { Countries as CountriesServices } from '../../../../shared/services/countries/countries';
import { DateService } from '../../../../shared/services/date/date';
import { Languages as LanguagesService } from '../../../../shared/services/languages/languages';

import { Freelancer as FreelancerModel } from '../../../../shared/models/Freelancer';
import { FreelancerProfile } from '../../../../shared/models/FreelancerProfile';
import { FreelancerVisibility } from '../../../../shared/models/FreelancerVisibility';

@Component({
  selector: 'app-freelancer',
  imports: [TranslateModule, RouterModule, ShowMoreComponent],
  templateUrl: './freelancer.html',
  styleUrl: './freelancer.scss',
})
export class Freelancer {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private freelancerService = inject(FreelancerService);
  private activatedRoute = inject(ActivatedRoute);

  countriesService = inject(CountriesServices);
  dateService = inject(DateService);
  languageService = inject(LanguagesService);

  freelancer = signal<FreelancerProfile | null>(null);
  visibilityInfos = signal<FreelancerVisibility | null>(null);
  onGetFreelancer = signal('false');

  constructor() {
    const { id } = this.activatedRoute.snapshot.params;

    this.onGetFreelancer.set('true');

    this.freelancerService.getFreelancer(id).subscribe({
      next: (freelancer: FreelancerProfile) => {
        this.freelancer.set(freelancer);
        this.onGetFreelancer.set('success');
      },
      error: () => {
        const subscription = this.store
          .select(selectFreelancer)
          .subscribe((freelancer: FreelancerModel | null | undefined) => {
            if (freelancer?._id === id) {
              this.freelancerService.getVisibility(id).subscribe({
                next: (visibilityInfos: FreelancerVisibility) => {
                  this.visibilityInfos.set(visibilityInfos);
                  this.onGetFreelancer.set('invisible');
                },
              });
            } else {
              this.onGetFreelancer.set('error');
            }
          });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
      },
    });
  }
}
