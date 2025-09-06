import { createReducer, on } from '@ngrx/store';

import { FreelancerState } from './freelancer.state';

import * as FreelancerActions from './freelancer.actions';

import { FreelancerExperience } from '../../models/FreelancerExperience';
import { FreelancerEducation } from '../../models/FreelancerEducation';

const initialState: FreelancerState = {
  freelancer: undefined,
  experiences: undefined,
  educations: undefined,
  onGetFreelancer: 'false',
  onCreateExperience: 'false',
  onUpdateExperience: 'false',
  onDeleteExperience: {},
  updateFreelancerSettingsIdentityError: {},
  onUpdateFreelancerSettingsIdentity: 'false',
  onCreateEducation: 'false',
  onUpdateEducation: 'false',
  onDeleteEducation: {},
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
  on(
    FreelancerActions.getFreelancerEducationsSuccess,
    (state, { educations }) => ({
      ...state,
      educations,
    }),
  ),
  on(FreelancerActions.createFreelancerEducationInit, (state) => ({
    ...state,
    onCreateEducation: 'false',
  })),
  on(FreelancerActions.createFreelancerEducation, (state) => ({
    ...state,
    onCreateEducation: 'true',
  })),
  on(
    FreelancerActions.createFreelancerEducationSuccess,
    (state, { education }) => {
      const educations = [
        ...(<FreelancerEducation[]>state.educations),
        education,
      ];
      const sortedEducations = [...(<FreelancerEducation[]>educations)].sort(
        (a, b) => {
          if (!a.endDate) return -1;
          if (!b.endDate) return 1;
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        },
      );

      return {
        ...state,
        educations: sortedEducations,
        onCreateEducation: 'success',
        onDeleteEducation: {
          ...(state.onDeleteEducation ?? {}),
          [education._id]: 'false',
        },
      };
    },
  ),
  on(FreelancerActions.createFreelancerExperienceError, (state) => ({
    ...state,
    onCreateEducation: 'error',
  })),
  on(FreelancerActions.updateFreelancerEducationInit, (state) => ({
    ...state,
    onUpdateEducation: 'false',
  })),
  on(FreelancerActions.updateFreelancerEducation, (state) => ({
    ...state,
    onUpdateEducation: 'true',
  })),
  on(
    FreelancerActions.updateFreelancerEducationSuccess,
    (state, { education }) => {
      const updatedExperience = {
        ...education,
        startDate: new Date(education.startDate).toISOString(),
        endDate: education.endDate
          ? new Date(education.endDate).toISOString()
          : null,
      };
      const updatedEducations = state.educations
        ? state.educations.map((exp) =>
            exp._id === updatedExperience._id ? updatedExperience : exp,
          )
        : [];
      const sortedEducations = [...updatedEducations].sort((a, b) => {
        if (!a.endDate) return -1;
        if (!b.endDate) return 1;
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      });

      return {
        ...state,
        educations: sortedEducations,
        onUpdateEducation: 'success',
      };
    },
  ),
  on(FreelancerActions.updateFreelancerEducationError, (state) => ({
    ...state,
    onUpdateEducation: 'error',
  })),
  on(
    FreelancerActions.deleteFreelancerEducationInit,
    (state, { educationsIds }) => {
      const onDeleteEducation: { [key: string]: string } = {};

      for (const id of educationsIds) {
        onDeleteEducation[id] = 'false';
      }

      return { ...state, onDeleteEducation };
    },
  ),
  on(FreelancerActions.deleteFreelancerEducation, (state, { educationId }) => {
    return {
      ...state,
      onDeleteEducation: {
        ...state.onDeleteEducation,
        [educationId]: 'true',
      },
    };
  }),
  on(
    FreelancerActions.deleteFreelancerEducationSuccess,
    (state, { educationId }) => {
      const educations = state.educations?.filter(
        (education) => education._id !== educationId,
      );
      const { [educationId]: _, ...updateOnDeleteEducation } =
        state.onDeleteEducation;

      return {
        ...state,
        educations,
        onDeleteEducation: updateOnDeleteEducation,
      };
    },
  ),
  on(
    FreelancerActions.deleteFreelancerEducationError,
    (state, { educationId }) => ({
      ...state,
      onDeleteEducation: {
        ...state.onDeleteEducation,
        [educationId]: 'error',
      },
    }),
  ),
);
