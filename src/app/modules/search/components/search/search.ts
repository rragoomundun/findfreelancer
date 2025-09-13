import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgMultiLabelTemplateDirective,
} from '@ng-select/ng-select';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Countries as CountriesService } from '../../../../shared/services/countries/countries';
import { Languages as LanguagesService } from '../../../../shared/services/languages/languages';
import { Search as SearchService } from '../../services/search/search';

import { FreelancerSearchResult } from '../../models/FreelancerSearchResult';

@Component({
  selector: 'app-search',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgMultiLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    InputComponent,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);

  countriesService = inject(CountriesService);
  languagesService = inject(LanguagesService);

  formGroup = signal(
    new FormGroup({
      query: new FormControl('', [Validators.required]),
      minHourlyRate: new FormControl(),
      maxHourlyRate: new FormControl(),
    }),
  );
  freelancers = signal<FreelancerSearchResult[]>([]);
  currentPage = signal(1);
  pages = signal<number[]>([]);
  pagesEnd = computed(() => {
    const start = this.pages().length - 3;
    const pagesArray = [];

    for (let i = start; i <= this.pages().length; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  });
  pagesIn = computed(() => {
    const start = this.currentPage() - 1;
    const end = this.currentPage() + 1;
    const pagesArray = [];

    for (let i = start; i <= end; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  });
  onSearch = signal('false');

  selectedCountries = [];
  selectedLanguages = [];

  get controls(): any {
    return this.formGroup().controls;
  }

  get isPriceRangeValid(): boolean {
    const minHourlyRate = this.controls.minHourlyRate.value;
    const maxHourlyRate = this.controls.maxHourlyRate.value;

    if (
      (minHourlyRate && (minHourlyRate < 5 || minHourlyRate > 100)) ||
      (maxHourlyRate && (maxHourlyRate < 5 || maxHourlyRate > 100)) ||
      (minHourlyRate && maxHourlyRate && minHourlyRate >= maxHourlyRate)
    ) {
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((value: Params) => {
      const {
        query,
        minHourlyRate,
        maxHourlyRate,
        locations,
        languages,
        page,
      } = value;

      if (query && query !== this.controls.query.value) {
        this.controls.query.setValue(query);
      }

      if (minHourlyRate) {
        this.controls.minHourlyRate.setValue(minHourlyRate);
      }

      if (maxHourlyRate) {
        this.controls.maxHourlyRate.setValue(maxHourlyRate);
      }

      if (locations) {
        this.selectedCountries = locations.split(',');
      }

      if (languages) {
        this.selectedLanguages = languages.split(',');
      }

      if (page) {
        this.currentPage.set(Number(page));
      }

      this.onSearchClick();
    });
  }

  onSearchClick(): void {
    const params: any = {
      query: this.controls.query.value,
    };

    if (this.controls.minHourlyRate.value) {
      params.minHourlyRate = this.controls.minHourlyRate.value;
    }

    if (this.controls.maxHourlyRate.value) {
      params.maxHourlyRate = this.controls.maxHourlyRate.value;
    }

    if (this.selectedCountries.length) {
      params.locations = this.selectedCountries.join(',');
    }

    if (this.selectedLanguages.length) {
      params.languages = this.selectedLanguages.join(',');
    }

    params.page = this.currentPage();

    this.router.navigate(['/search'], { queryParams: params });

    this.onSearch.set('true');

    this.searchService.search(params).subscribe({
      next: (result: {
        freelancers: FreelancerSearchResult[];
        totalFreelancers: number;
        nbPages: number;
      }) => {
        for (const freelancer of result.freelancers) {
          if (freelancer.presentationText.length > 280) {
            freelancer.presentationText = `${freelancer.presentationText.substring(0, 280)}...`;
          }
        }

        this.pages.set(Array.from({ length: result.nbPages }, (_, i) => i + 1));
        this.freelancers.set(result.freelancers);
        this.onSearch.set('success');

        setTimeout(() => window.scrollTo(0, 0));
      },
    });
  }
}
