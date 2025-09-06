import { Freelancer } from '../../models/Freelancer';
import { FreelancerEducation } from '../../models/FreelancerEducation';
import { FreelancerExperience } from '../../models/FreelancerExperience';

export interface FreelancerState {
  freelancer: Freelancer | null | undefined;
  experiences: FreelancerExperience[] | null | undefined;
  educations: FreelancerEducation[] | null | undefined;
  onGetFreelancer: string;
  updateFreelancerSettingsIdentityError: any;
  onUpdateFreelancerSettingsIdentity: string;
  onCreateExperience: string;
  onUpdateExperience: string;
  onDeleteExperience: { [key: string]: string };
  onCreateEducation: string;
  onUpdateEducation: string;
  onDeleteEducation: { [key: string]: string };
}
