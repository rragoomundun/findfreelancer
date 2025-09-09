export interface FreelancerVisibility {
  visible: boolean;
  missing: {
    title: boolean | undefined;
    presentationText: boolean | undefined;
    hourlyRate: boolean | undefined;
    location: {
      town: boolean | undefined;
      countryCode: boolean | undefined;
    };
    contact: {
      email: boolean | undefined;
      phone: boolean | undefined;
    };
  };
}
