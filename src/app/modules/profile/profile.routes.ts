import { Routes } from '@angular/router';

import { Profile as ProfileComponent } from './components/profile/profile';
import { ProfileEditGeneral as ProfileEditGeneralComponent } from './components/profile-edit-general/profile-edit-general';
import { ProfileEditPresentation as ProfileEditPresentationComponent } from './components/profile-edit-presentation/profile-edit-presentation';
import { ProfileEditSkills as ProfileEditSkillsComponent } from './components/profile-edit-skills/profile-edit-skills';
import { ProfileEditExperiences as ProfileEditExperiencesComponent } from './components/profile-edit-experiences/profile-edit-experiences';
import { ProfileEditEducation as ProfileEditEducationComponent } from './components/profile-edit-education/profile-edit-education';
import { ProfileEditLanguages as ProfileEditLanguagesComponent } from './components/profile-edit-languages/profile-edit-languages';
import { ProfileEditContact as ProfileEditContactComponent } from './components/profile-edit-contact/profile-edit-contact';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'general',
        component: ProfileEditGeneralComponent,
        data: { title: 'EDIT_PROFILE_PAGE.TITLE_GENERAL' },
      },
      {
        path: 'presentation',
        component: ProfileEditPresentationComponent,
        data: { title: 'EDIT_PROFILE_PAGE.TITLE_PRESENTATION' },
      },
      {
        path: 'skills',
        component: ProfileEditSkillsComponent,
        data: { title: 'EDIT_PROFILE_PAGE.TITLE_SKILLS' },
      },
      {
        path: 'experiences',
        component: ProfileEditExperiencesComponent,
        data: { title: 'EDIT_PROFILE_PAGE.TITLE_EXPERIENCES' },
      },
      {
        path: 'education',
        component: ProfileEditEducationComponent,

        data: { title: 'EDIT_PROFILE_PAGE.TITLE_EDUCATION' },
      },
      {
        path: 'languages',
        component: ProfileEditLanguagesComponent,
        data: { title: 'EDIT_PROFILE_PAGE.TITLE_LANGUAGES' },
      },
      {
        path: 'contact',
        component: ProfileEditContactComponent,
        data: { title: 'EDIT_PROFILE_PAGE.TITLE_CONTACT' },
      },
      {
        path: '**',
        redirectTo: 'general',
      },
    ],
  },
];
