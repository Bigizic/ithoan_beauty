import React from "react";
import { Button } from "../../../ui/button";
import { useNavigate } from "react-router-dom";

export const AboutUsSection = () => {
  const navigate = useNavigate()
  return (
    <section className="bg-white flex flex-col w-full items-center gap-20 pd-default py-[64px] sm:py-28 relative">
      <div className="flex-col max-w-screen-xl items-start gap-20 w-full flex-[0_0_auto] flex relative">
        <div className="flex items-center gap-20 relative self-stretch w-full flex-[0_0_auto] flex-col-reverse md:flex-row">
          <img
            className="relative flex-1 grow h-full w-full md:h-[640px] rounded-[10px] object-cover md:w-[50%]"
            alt="Placeholder image"
            src="/images/home_page/about_us.jpg"
          />

          <div className="flex flex-col items-start gap-8 relative flex-1 grow md:w-[50%]">
            <div className="items-start gap-[8px] sm:gap-4 self-stretch w-full flex-[0_0_auto] flex flex-col relative">
              <div className="inline-flex items-center relative flex-[0_0_auto]">
                <h2 className="w-fit [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#1c1c1c] text-5xl leading-[32px] sm:leading-[72px] whitespace-nowrap relative mt-[-1.00px] tracking-[0]">
                  About Us
                </h2>
              </div>

              <div className="flex flex-col items-start gap-[16px] sm:gap-6 relative self-stretch w-full flex-[0_0_auto]">
                <h3 className="relative self-stretch mt-[-1.00px] font-heading-h2 font-[number:var(--heading-h2-font-weight)] text-[#eabe30] text-[length:var(--heading-h2-font-size)] tracking-[var(--heading-h2-letter-spacing)] leading-[var(--heading-h2-line-height)] [font-style:var(--heading-h2-font-style)]">
                  A place to relax and feel renewed.
                </h3>

                <p className="relative self-stretch [font-family:'Roboto',Helvetica] font-normal text-[#1c1c1c] text-lg tracking-[0] leading-[27px]">
                  We are dedicated to providing exceptional, personalized spa
                  experiences that nurture both body and mind. Our expert team
                  is committed to your total well-being. At our salon, your
                  comfort comes first…
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
              <Button
                onClick={() => navigate('/about-us')}
                variant="outline"
                className="h-auto inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[5px] overflow-hidden border border-solid border-[#eabe30] bg-transparent hover:bg-[#eabe30]/10"
              >
                <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#1c1c1c] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                  Learn More
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
