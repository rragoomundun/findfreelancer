import { Freelancer } from '../../models/Freelancer';

export interface FreelancerState {
  freelancer: Freelancer | null;
  onGetFreelancer: string;
}
