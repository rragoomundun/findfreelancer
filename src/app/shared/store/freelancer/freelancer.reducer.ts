import { createReducer, on } from '@ngrx/store';

import { FreelancerState } from './freelancer.state';

import * as FreelancerActions from './freelancer.actions';

const initialState: FreelancerState = {
  freelancer: null,
  onGetFreelancer: 'false',
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
  }))
);
