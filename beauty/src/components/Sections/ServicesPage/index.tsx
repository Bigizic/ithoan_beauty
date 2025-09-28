import React, { useEffect } from 'react';
import AOS from "aos"
import "aos/dist/aos.css"
import { HeaderSection } from './HeaderSection';
import { ServicesSection } from './ServicesSection';
import { IndulgeSection } from './Indulge';
import { ServicesProps } from '../../../interface';

const ServicesPage = (props: ServicesProps) => {
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

  const { services } = props;
  return (
    <main className="flex flex-col w-full">
      <HeaderSection />
      <ServicesSection />
      <IndulgeSection />
    </main>
  )
}

export default ServicesPage
