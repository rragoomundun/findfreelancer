import { createReducer, on } from '@ngrx/store';

import { FreelancerState } from './freelancer.state';

import * as FreelancerActions from './freelancer.actions';

import { FreelancerExperience } from '../../models/FreelancerExperience';

const initialState: FreelancerState = {
  freelancer: undefined,
  experiences: undefined,
  onGetFreelancer: 'false',
  onCreateExperience: 'false',
  onUpdateExperience: 'false',
  onDeleteExperience: {},
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
  on(FreelancerActions.updateFreelancerImage, (state, { image }) => ({
    ...state,
    freelancer: {
      _id: <string>state.freelancer?._id,
      email: <string>state.freelancer?.email,
      firstName: <string>state.freelancer?.firstName,
      lastName: <string>state.freelancer?.lastName,
      image: image,
    },
  })),
  on(
    FreelancerActions.getFreelancerExperiencesSuccess,
    (state, { experiences }) => ({
      ...state,
      experiences,
    }),
  ),
  on(FreelancerActions.createFreelancerExperienceInit, (state) => ({
    ...state,
    onCreateExperience: 'false',
  })),
  on(FreelancerActions.createFreelancerExperience, (state) => ({
    ...state,
    onCreateExperience: 'true',
  })),
  on(
    FreelancerActions.createFreelancerExperienceSuccess,
    (state, { experience }) => {
      const experiences = [
        ...(<FreelancerExperience[]>state.experiences),
        experience,
      ];

      const sortedExperiences = [...(<FreelancerExperience[]>experiences)].sort(
        (a, b) => {
          if (!a.endDate) return -1;
          if (!b.endDate) return 1;
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        },
      );

      return {
        ...state,
        experiences: sortedExperiences,
        onCreateExperience: 'success',
        onDeleteExperience: {
          ...(state.onDeleteExperience ?? {}),
          [experience._id]: 'false',
        },
      };
    },
  ),
  on(FreelancerActions.createFreelancerExperienceError, (state) => ({
    ...state,
    onCreateExperience: 'error',
  })),
  on(FreelancerActions.updateFreelancerExperienceInit, (state) => ({
    ...state,
    onUpdateExperience: 'false',
  })),
  on(FreelancerActions.updateFreelancerExperience, (state) => ({
    ...state,
    onUpdateExperience: 'true',
  })),
  on(
    FreelancerActions.updateFreelancerExperienceSuccess,
    (state, { experience }) => {
      const updatedExperience = {
        ...experience,
        startDate: new Date(experience.startDate).toISOString(),
        endDate: experience.endDate
          ? new Date(experience.endDate).toISOString()
          : null,
      };
      const updatedExperiences = state.experiences
        ? state.experiences.map((exp) =>
            exp._id === updatedExperience._id ? updatedExperience : exp,
          )
        : [];
      const sortedExperiences = [...updatedExperiences].sort((a, b) => {
        if (!a.endDate) return -1;
        if (!b.endDate) return 1;
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      });

      return {
        ...state,
        experiences: sortedExperiences,
        onUpdateExperience: 'success',
      };
    },
  ),
  on(FreelancerActions.updateFreelancerExperienceError, (state) => {
    return { ...state, onUpdateExperience: 'error' };
  }),
  on(
    FreelancerActions.deleteFreelancerExperienceInit,
    (state, { experiencesIds }) => {
      const onDeleteExperience: { [key: string]: string } = {};

      for (const id of experiencesIds) {
        onDeleteExperience[id] = 'false';
      }

      return { ...state, onDeleteExperience };
    },
  ),
  on(
    FreelancerActions.deleteFreelancerExperience,
    (state, { experienceId }) => {
      return {
        ...state,
        onDeleteExperience: {
          ...state.onDeleteExperience,
          [experienceId]: 'true',
        },
      };
    },
  ),
  on(
    FreelancerActions.deleteFreelancerExperienceSuccess,
    (state, { experienceId }) => {
      const experiences = state.experiences?.filter(
        (experience) => experience._id !== experienceId,
      );
      const { [experienceId]: _, ...updatedOnDeleteExperience } =
        state.onDeleteExperience;

      return {
        ...state,
        experiences,
        onDeleteExperience: updatedOnDeleteExperience,
      };
    },
  ),
  on(
    FreelancerActions.deleteFreelancerExperienceError,
    (state, { experienceId }) => ({
      ...state,
      onDeleteExperience: {
        ...state.onDeleteExperience,
        [experienceId]: 'error',
      },
    }),
  ),
);
