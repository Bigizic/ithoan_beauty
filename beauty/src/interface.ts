import { SERVICEMENU, SERVICESMENU } from "./types";
import { Location, NavigateFunction } from 'react-router-dom';

export interface ApplicationStateProps {
  services: SERVICESMENU[],
  maintenanceText: string,
  homePageLoading: boolean,
  maintenanceStatus: boolean,
  isSearchOpen: boolean
}

export interface HomePageProps {
  services: SERVICESMENU[]
}

export interface ServicesProps {
  services: SERVICESMENU[]
}

export interface WhyChooseUsProps {
  services?: SERVICESMENU[]
}

export interface ServicePageParams {
  slug: string;
}

export interface ServicePageProps {
  service: SERVICESMENU;
  match: { params: ServicePageParams };
  navigate: NavigateFunction;
  location: Location;
}

export interface ServiceProps {
  service: SERVICESMENU
}

export interface PricingPlansProps {
  services: SERVICESMENU
  serviceCat: SERVICEMENU[]
}

export interface BookingProps {
  selectedService: SERVICESMENU | null;
  selectedSubService: SERVICEMENU | null;
  bookingDate: Date | null;
  bookingTime: string | null;
  availableTimes: string[];
  bookedDates: any[];
  loading: boolean;
  error: string | null;
  userInfo: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  bookingSuccess: boolean;
  services: SERVICESMENU[];
}

export interface ServiceSelectionProps {
  services: SERVICESMENU[];
  selectedService: SERVICESMENU | null;
  selectedSubService: SERVICEMENU | null;
  error: string | null;
}

export interface AppointmentDetailsProps {
  selectedService: SERVICESMENU | null;
  selectedSubService: SERVICEMENU | null;
  bookingDate: Date | null;
  bookingTime: string | null;
  availableTimes: string[];
  bookedDates: any[];
  loading: boolean;
  error: string | null;
  userInfo: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  bookingSuccess: boolean;
  fieldErrors: any;
}

export interface BookingIdParams {
  bookingId: string;
}

export interface bookingSuccessProps {
  bookingId: string,
  match: { params: BookingIdParams };
}

export interface bookingSuccessContainerProps {
  bookingId: string,
}
