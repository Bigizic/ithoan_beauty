import React from "react";
import { Service } from "../../store/slices/servicesSlice";
import { AboutUsSection } from "./sections/AboutUsSection/AboutUsSection";
import { CallToActionSection } from "./sections/CallToActionSection/CallToActionSection";
import { ClientFeedbackSection } from "./sections/ClientFeedbackSection/ClientFeedbackSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { OfferingsSection } from "./sections/OfferingsSection/OfferingsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection/TestimonialsSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection/WhyChooseUsSection";

interface HomeDesktopProps {
  services: Service[];
  loading: boolean;
}

export const HomeDesktop = ({ services, loading }: HomeDesktopProps): JSX.Element => {
  return (
    <main className="flex flex-col w-full">

      <HeaderSection />
      <WhyChooseUsSection services={services} loading={loading} />
      <OfferingsSection />
      <TestimonialsSection />
      <AboutUsSection />
      <ClientFeedbackSection />
      <CallToActionSection />
    </main>
  );
};
