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
