import React from "react";
import { Service } from "../../store/slices/servicesSlice";
import { CallToActionSection } from "./sections/CallToActionSection";
import { HeaderSection } from "./sections/HeaderSection";
import { ServicesSection } from "./sections/ServicesSection";

interface ServicesPageProps {
  services: Service[];
}

export const ServicesPage = ({ services }: ServicesPageProps): JSX.Element => {
  return (
    <div className="inline-flex flex-col items-start relative">
      <HeaderSection />
      <ServicesSection services={services} />
      <CallToActionSection />
    </div>
  );
};
