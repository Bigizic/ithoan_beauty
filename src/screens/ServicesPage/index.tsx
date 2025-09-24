import React from "react";
import { CallToActionSection } from "./sections/CallToActionSection";
import { HeaderSection } from "./sections/HeaderSection";
import { ServicesSection } from "./sections/ServicesSection";

export const ServicesPage = (): JSX.Element => {
  return (
    <div className="inline-flex flex-col items-start relative">
      <HeaderSection />
      <ServicesSection />
      <CallToActionSection />
    </div>
  );
};
