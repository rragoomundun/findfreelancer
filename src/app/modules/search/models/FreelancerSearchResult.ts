export interface FreelancerSearchResult {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
  hourlyRate: number;
  title: string;
  presentationText: string;
  skills: string[];
  location: { countryCode: string };
}
