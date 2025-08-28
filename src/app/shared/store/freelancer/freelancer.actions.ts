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
export const updateFreelancerSettingsIdentityInit = createAction(
  '[Freelancer] Update Freelancer Settings Identity Init',
);
export const updateFreelancerSettingsIdentity = createAction(
  '[Freelancer] Update Freelancer Settings Identity',
  props<{ email: string; firstName: string; lastName: string }>(),
);
export const updateFreelancerSettingsIdentitySuccess = createAction(
  '[Freelancer] Update Freelancer Settings Identity Success',
  props<{ email: string; firstName: string; lastName: string }>(),
);
export const updateFreelancerSettingsIdentityError = createAction(
  '[Freelancer] Update Freelancer Settings Identity Error',
  props<{ error: any }>(),
);
export const updateFreelancerImage = createAction(
  '[Freelancer] Update Freelancer Image',
  props<{ image: string }>(),
);
