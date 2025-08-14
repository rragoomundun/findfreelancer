import { createAction, props } from '@ngrx/store';

import { Freelancer } from '../../models/Freelancer';

export const getFreelancer = createAction('[Freelancer] Get Freelancer');
export const getFreelancerSuccess = createAction(
  '[Freelancer] Get Freelancer Success',
  props<{ freelancer: Freelancer }>(),
);
export const getFreelancerError = createAction(
  '[Freelancer] Get Freelancer Error',
);
export const logoutFreelancer = createAction('[Freelancer] Logout');
