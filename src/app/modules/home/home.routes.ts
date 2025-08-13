import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home as HomeComponent } from './components/home';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'HOME_PAGE.TITLE' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutes {}
