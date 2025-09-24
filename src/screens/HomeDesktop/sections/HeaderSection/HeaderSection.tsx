import React from "react";
import { Button } from "../../../../components/ui/button";

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="flex w-full min-h-[900px] items-center justify-center pd-default py-0 relative bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)] hero-bg">
      <div className="flex-col max-w-screen-xl items-center gap-20 flex-1 grow flex relative">
        <div className="flex max-w-screen-md items-center gap-8 w-full flex-[0_0_auto] flex-col relative">
          <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative self-stretch mt-[-1.00px] [font-family:'Playfair_Display',Helvetica] font-bold text-white text-[48px] text-center tracking-[0] leading-[57.6px]">
              Glow Inside &amp; Out
            </h1>

            <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[27px]">
              Relax and refresh at our top spa. Enjoy personalized treatments
              that make self-care easy and special.
            </p>
          </div>

          <div className="inline-flex items-start gap-8 relative flex-[0_0_auto]">
            <Button className="h-auto bg-[#eabe30] hover:bg-[#d4a82a] text-[#1c1c1c] px-6 py-3 rounded-lg font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
              Book Appointment
            </Button>

            <Button
              variant="outline"
              className="h-auto bg-white hover:bg-gray-50 text-[#1c1c1c] border-2 border-[#eabe30] px-6 py-3 rounded-lg font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
            >
              View Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
