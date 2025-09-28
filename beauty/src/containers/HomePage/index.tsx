import React, { useEffect } from "react";
import AOS from "aos"
import "aos/dist/aos.css"
import { HeroSection } from "../../components/Sections/HomePage/Hero";
import { OfferingsSection } from "../../components/Sections/HomePage/Offerings";
import { AboutUsSection } from "../../components/Sections/HomePage/AboutUs";
import { SpecialOffersSection } from "../../components/Sections/HomePage/SpecialOffers";
import { WhyChooseUsSection } from "../../components/Sections/HomePage/WhyChooseUs";
import { ClientFeedbackSection } from "../../components/Sections/HomePage/ClientFeedback";
import { CallToActionSection } from "../../components/Sections/HomePage/CallToAction";
import { HomePageProps } from "../../interface";

const HomePage = (props: HomePageProps) => {
  const { services } = props
  useEffect(() => {
    AOS.init({
      offset: 130,
      duration: 1200,
      easing: 'ease-out-cubic',
      mirror: true,
      anchorPlacement: 'bottom-center'
    });
    AOS.refresh();
  }, []);
  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <OfferingsSection services={services}/>
      <AboutUsSection />
      <SpecialOffersSection />
      <WhyChooseUsSection />
      <ClientFeedbackSection />
      <CallToActionSection />
    </main>
  );
};

export default HomePage
