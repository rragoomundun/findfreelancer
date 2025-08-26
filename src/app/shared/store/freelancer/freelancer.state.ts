import { Freelancer } from '../../models/Freelancer';

export interface FreelancerState {
  freelancer: Freelancer | null | undefined;
  onGetFreelancer: string;
  updateFreelancerSettingsIdentityError: any;
  onUpdateFreelancerSettingsIdentity: string;
}
