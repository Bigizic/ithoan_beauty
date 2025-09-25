import React, { useEffect } from 'react';
import AOS from "aos"
import "aos/dist/aos.css"
import { HeaderSection } from '../../components/Sections/Services/HeaderSection';
import { ServicesSection } from '../../components/Sections/Services/ServicesSection';
import { IndulgeSection } from '../../components/Sections/Services/Indulge';

const Services = () => {
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
      <HeaderSection />
      <ServicesSection />
      <IndulgeSection />
    </main>
  )
}

export default Services
