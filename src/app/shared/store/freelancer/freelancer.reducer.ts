import { createReducer, on } from '@ngrx/store';

import { FreelancerState } from './freelancer.state';

import * as FreelancerActions from './freelancer.actions';

const initialState: FreelancerState = {
  freelancer: undefined,
  onGetFreelancer: 'false',
  updateFreelancerSettingsIdentityError: {},
  onUpdateFreelancerSettingsIdentity: 'false',
};

export const freelancerReducer = createReducer(
  initialState,
  on(FreelancerActions.getFreelancer, (state) => ({
    ...state,
    onGetFreelancer: 'true',
  })),
  on(FreelancerActions.getFreelancerSuccess, (state, { freelancer }) => ({
    ...state,
    freelancer,
    onGetFreelancer: 'success',
  })),
  on(FreelancerActions.getFreelancerError, (state) => ({
    ...state,
    freelancer: null,
    onGetFreelancer: 'error',
  })),
  on(FreelancerActions.logoutFreelancer, (state) => ({
    ...state,
    freelancer: null,
    onGetFreelancer: 'false',
  })),
  on(FreelancerActions.updateFreelancerSettingsIdentityInit, (state) => ({
    ...state,
    updateFreelancerSettingsIdentityError: {},
    onUpdateFreelancerSettingsIdentity: 'false',
  })),
  on(FreelancerActions.updateFreelancerSettingsIdentity, (state) => ({
    ...state,
    onUpdateFreelancerSettingsIdentity: 'true',
  })),
  on(
    FreelancerActions.updateFreelancerSettingsIdentitySuccess,
    (state, { email, firstName, lastName }) => ({
      ...state,
      freelancer: state.freelancer
        ? { ...state.freelancer, email, firstName, lastName }
        : null,
      updateFreelancerSettingsIdentityError: {},
      onUpdateFreelancerSettingsIdentity: 'success',
    }),
  ),
  on(
    FreelancerActions.updateFreelancerSettingsIdentityError,
    (state, { error }) => ({
      ...state,
      updateFreelancerSettingsIdentityError: error,
      onUpdateFreelancerSettingsIdentity: 'error',
    }),
  ),
);
