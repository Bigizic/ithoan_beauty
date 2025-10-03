import { SERVICEMENU, SERVICESMENU } from "./types";
import { Location, NavigateFunction } from 'react-router-dom';

export interface ApplicationStateProps {
  services: SERVICESMENU[]
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
  serviceCat: SERVICEMENU[]
}

