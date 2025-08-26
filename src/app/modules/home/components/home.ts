import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { Home as HomeService } from '../services/home/home';
import { Countries as CountriesService } from '../../../shared/services/countries/countries';

import { Home as HomeModel } from '../models/Home';

@Component({
  selector: 'app-home',
  imports: [RouterModule, TranslateModule, NgbCarouselModule, NgbCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private homeService = inject(HomeService);

  countriesService = inject(CountriesService);

  content = signal<HomeModel | null>(null);

  ngOnInit(): void {
    this.homeService.getHomeContent().subscribe({
      next: (content: HomeModel) => {
        this.content.set(content);
      },
    });
  }
}
