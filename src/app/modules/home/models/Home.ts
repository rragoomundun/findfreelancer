export interface Home {
  carousel: {
    queryParams: Object;
    image: string;
    imageSmall: string;
    routerLink: string;
  }[];
  freelancers: {
    _id: string;
    image: string;
    firstName: string;
    lastName: string;
    hourlyRate: number;
    title: string;
    location: { town: string; countryCode: string };
  }[];
}
