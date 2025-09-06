import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

import { FreelancerState } from './freelancer.state';

export const selectFreelancerState = (state: AppState) => state.freelancer;

export const selectFreelancer = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.freelancer,
);
export const selectOnGetFreelancer = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.onGetFreelancer,
);
export const selectUpdateFreelancerSettingsIdentityError = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.updateFreelancerSettingsIdentityError,
);
export const selectOnUpdateFreelancerSettingsIdentity = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.onUpdateFreelancerSettingsIdentity,
);
export const selectFreelancerExperiences = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.experiences,
);
export const selectOnCreateExperience = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.onCreateExperience,
);
export const selectOnUpdateExperience = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.onUpdateExperience,
);
export const selectOnDeleteExperience = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.onDeleteExperience,
);
export const selectFreelancerEducations = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.educations,
);
export const selectOnCreateEducation = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.onCreateEducation,
);
export const selectOnUpdateEducation = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.onUpdateEducation,
);
export const selectOnDeleteEducation = createSelector(
  selectFreelancerState,
  (state: FreelancerState) => state.onDeleteEducation,
);
