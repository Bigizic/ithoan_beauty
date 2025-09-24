import React from "react";
import { AboutUsSection } from "./sections/AboutUsSection/AboutUsSection";
import { CallToActionSection } from "./sections/CallToActionSection/CallToActionSection";
import { ClientFeedbackSection } from "./sections/ClientFeedbackSection/ClientFeedbackSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { OfferingsSection } from "./sections/OfferingsSection/OfferingsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection/TestimonialsSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection/WhyChooseUsSection";

export const HomeDesktop = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full">

      <HeaderSection />
      <WhyChooseUsSection />
      <OfferingsSection />
      <TestimonialsSection />
      <AboutUsSection />
      <ClientFeedbackSection />
      <CallToActionSection />
    </main>
  );
};
