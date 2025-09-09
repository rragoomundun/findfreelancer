import { Routes } from '@angular/router';

import { Freelancer as FreelancerComponent } from './components/freelancer/freelancer';

export const freelancerRoutes: Routes = [
  {
    path: ':id',
    component: FreelancerComponent,
  },
];
