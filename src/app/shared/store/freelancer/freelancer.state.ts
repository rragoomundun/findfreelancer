import { Freelancer } from '../../models/Freelancer';

export interface FreelancerState {
  freelancer: Freelancer | null | undefined;
  onGetFreelancer: string;
  onUpdateFreelancerSettingsIdentity: string;
}
