import { Routes } from '@angular/router';

import { Settings as SettingsComponent } from './components/settings/settings';
import { SettingsIdentity as SettingsIdentityComponent } from './components/settings-identity/settings-identity';
import { SettingsSecurity as SettingsSecurityComponent } from './components/settings-security/settings-security';
import { SettingsDeleteAccount as SettingsDeleteAccountComponent } from './components/settings-delete-account/settings-delete-account';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'identity',
        component: SettingsIdentityComponent,
        data: { title: 'SETTINGS_PAGE.TITLE_IDENTITY' },
      },
      {
        path: 'security',
        component: SettingsSecurityComponent,
        data: { title: 'SETTINGS_PAGE.TITLE_SECURITY' },
      },
      {
        path: 'delete-account',
        component: SettingsDeleteAccountComponent,
        data: { title: 'SETTINGS_PAGE.TITLE_DELETE_ACCOUNT' },
      },
      {
        path: '**',
        redirectTo: 'identity',
      },
    ],
  },
];
