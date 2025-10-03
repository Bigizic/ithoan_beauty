import React from "react";
import { Button } from "../../../ui/button";
import ScrollTranslate from "../../../Common/ScrollTranslate";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <section className="flex w-full min-h-[900px] items-center justify-center pd-default py-0 relative hero-bg">
      <div className="flex-col max-w-screen-xl items-center gap-20 flex-1 grow flex relative">
        <div className="flex max-w-screen-md items-center gap-8 w-full flex-[0_0_auto] flex-col relative">
          <ScrollTranslate
            className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]"
          >
            <h1
              data-aos="zoom-in"
              data-aos-delay="300"
              className="relative self-stretch mt-[-1.00px] [font-family:'Playfair_Display',Helvetica] font-bold text-white text-[40px] sm:text-[48px] text-center tracking-[0] leading-[57.6px]"
            >
              Glow Inside &amp; Out
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="600"
              className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-white text-[16px] sm:text-lg text-center tracking-[0] leading-[27px]"
            >
              Relax and refresh at our top spa. Enjoy personalized treatments
              that make self-care easy and special.
            </p>
          </ScrollTranslate>

          <div className="inline-flex items-start gap-8 relative flex-[0_0_auto]">
            <a
              className="h-auto bg-[#eabe30] hover:bg-[#d4a82a] text-[#1c1c1c] px-6 py-3 rounded-lg font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[16px] sm:text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
              onClick={() => navigate('/booking')}
            >
              Book Appointment
            </a>

            <a
              className="h-auto bg-white hover:bg-gray-50 text-[#1c1c1c] border-2 border-[#eabe30] px-6 py-3 rounded-lg font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[16px] sm:text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
              onClick={() => navigate('/services')}
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};