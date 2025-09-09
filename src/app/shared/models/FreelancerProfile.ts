import { FreelancerEducation } from './FreelancerEducation';
import { FreelancerExperience } from './FreelancerExperience';
import { FreelancerLanguage } from './FreelancerLanguage';

export interface FreelancerProfile {
  _id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  hourlyRate: number | null;
  title: string | null;
  presentationText: string | null;
  location: { town: string | null; countryCode: string | null };
  contact: { email: string | null; phone: string | null };
  skills: string[];
  experiences: FreelancerExperience[];
  educations: FreelancerEducation[];
  languages: FreelancerLanguage[];
}
