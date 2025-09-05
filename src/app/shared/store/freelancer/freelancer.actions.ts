import { createAction, props } from '@ngrx/store';

import { Freelancer } from '../../models/Freelancer';
import { FreelancerExperience } from '../../models/FreelancerExperience';

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
export const getFreelancerExperiences = createAction(
  '[Freelancer] Get Freelancer Experiences',
);
export const getFreelancerExperiencesSuccess = createAction(
  '[Freelancer] Get Freelancer Experiences Success',
  props<{ experiences: FreelancerExperience[] }>(),
);
export const getFreelancerExperiencesError = createAction(
  '[Freelancer] Get Freelancer Experiences Error',
);
export const createFreelancerExperienceInit = createAction(
  '[Freelancer] Create Experience Init',
);
export const createFreelancerExperience = createAction(
  '[Freelancer] Create Experience',
  props<{ experience: FreelancerExperience }>(),
);
export const createFreelancerExperienceSuccess = createAction(
  '[Freelancer] Create Experience Success',
  props<{ experience: FreelancerExperience }>(),
);
export const createFreelancerExperienceError = createAction(
  '[Freelancer] Create Experience Error',
);
export const updateFreelancerExperienceInit = createAction(
  '[Freelancer] Update Experience Init',
);
export const updateFreelancerExperience = createAction(
  '[Freelancer] Update Experience',
  props<{ experience: FreelancerExperience }>(),
);
export const updateFreelancerExperienceSuccess = createAction(
  '[Freelancer] Update Experience Success',
  props<{ experience: FreelancerExperience }>(),
);
export const updateFreelancerExperienceError = createAction(
  '[Freelancer] Update Experience Error',
);
export const deleteFreelancerExperienceInit = createAction(
  '[Freelancer] Delete Experience Init',
  props<{ experiencesIds: string[] }>(),
);
export const deleteFreelancerExperience = createAction(
  '[Freelancer] Delete Experience',
  props<{ experienceId: string }>(),
);
export const deleteFreelancerExperienceSuccess = createAction(
  '[Freelancer] Delete Experience Success',
  props<{ experienceId: string }>(),
);
export const deleteFreelancerExperienceError = createAction(
  '[Freelancer] Delete Experience Error',
  props<{ experienceId: string }>(),
);
