import React from "react";
import { AboutUsSection } from "./sections/AboutUsSection/AboutUsSection";
import { CallToActionSection } from "./sections/CallToActionSection/CallToActionSection";
import { ClientFeedbackSection } from "./sections/ClientFeedbackSection/ClientFeedbackSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { NavbarSection } from "./sections/NavbarSection/NavbarSection";
import { OfferingsSection } from "./sections/OfferingsSection/OfferingsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection/TestimonialsSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection/WhyChooseUsSection";

export const HomeDesktop = () => {
  return (
    <main className="flex flex-col w-full">
      <NavbarSection />
      <HeaderSection />
      <WhyChooseUsSection />
      <OfferingsSection />
      <TestimonialsSection />
      <AboutUsSection />
      <ClientFeedbackSection />
      <CallToActionSection />
      <FooterSection />
    </main>
  );
};
