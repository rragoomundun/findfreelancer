import { Component, signal, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../shared/store/app.state';

import { selectFreelancer } from '../../../../shared/store/freelancer/freelancer.selectors';

import { ShowMore as ShowMoreComponent } from '../../../../shared/components/show-more/show-more';

import { Freelancer as FreelancerService } from '../../../../shared/services/freelancer/freelancer';
import { Countries as CountriesServices } from '../../../../shared/services/countries/countries';
import { DateService } from '../../../../shared/services/date/date';
import { Languages as LanguagesService } from '../../../../shared/services/languages/languages';
import { Translation as TranslationService } from '../../../../shared/services/translation/translation';

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
  private titleService = inject(Title);
  private translationService = inject(TranslationService);
  private freelancerService = inject(FreelancerService);
  private activatedRoute = inject(ActivatedRoute);

  countriesService = inject(CountriesServices);
  dateService = inject(DateService);
  languageService = inject(LanguagesService);

  freelancer = signal<FreelancerProfile | null>(null);
  visibilityInfos = signal<FreelancerVisibility | null>(null);
  onGetFreelancer = signal('false');

  constructor() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const { id } = params;

      this.onGetFreelancer.set('true');

      this.freelancerService.getFreelancer(id).subscribe({
        next: (freelancer: FreelancerProfile) => {
          this.freelancer.set(freelancer);
          this.onGetFreelancer.set('success');

          this.titleService.setTitle(
            `${this.freelancer()?.firstName} ${this.freelancer()?.lastName} - ${this.translationService.instant('APP.TITLE')}`,
          );
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

                this.titleService.setTitle(
                  `${this.translationService.instant('FREELANCER_PAGE.INVISIBLE.HEADING')} - ${this.translationService.instant('APP.TITLE')}`,
                );
              } else {
                this.titleService.setTitle(
                  `${this.translationService.instant('FREELANCER_PAGE.NOT_FOUND_TITLE')} - ${this.translationService.instant('APP.TITLE')}`,
                );
                this.onGetFreelancer.set('error');
              }
            });

          this.destroyRef.onDestroy(() => subscription.unsubscribe());
        },
      });
    });
  }
}
