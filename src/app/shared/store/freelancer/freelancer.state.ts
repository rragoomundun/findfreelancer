import { Freelancer } from '../../models/Freelancer';
import { FreelancerExperience } from '../../models/FreelancerExperience';

export interface FreelancerState {
  freelancer: Freelancer | null | undefined;
  experiences: FreelancerExperience[] | null | undefined;
  onGetFreelancer: string;
  updateFreelancerSettingsIdentityError: any;
  onUpdateFreelancerSettingsIdentity: string;
  onCreateExperience: string;
  onUpdateExperience: string;
  onDeleteExperience: { [key: string]: string };
}
