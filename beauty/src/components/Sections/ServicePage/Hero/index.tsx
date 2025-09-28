import React from "react";

export const HeroSection = () => {
  return (
    <section className="flex flex-col items-center gap-20 px-16 py-28 relative self-stretch w-full flex-[0_0_auto] bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%),url(..//header---56--.png)_50%_50%_/_cover]">
      <div className="flex flex-col max-w-screen-xl items-start gap-20 relative w-full flex-[0_0_auto]">
        <header className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex gap-4 flex-[0_0_auto] flex-col items-start relative">
            <div className="inline-flex items-center relative self-stretch flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] font-heading-tagline font-[number:var(--heading-tagline-font-weight)] text-white text-[length:var(--heading-tagline-font-size)] tracking-[var(--heading-tagline-letter-spacing)] leading-[var(--heading-tagline-line-height)] whitespace-nowrap [font-style:var(--heading-tagline-font-style)]">
                Revitalize
              </p>
            </div>

            <h1 className="relative w-fit [font-family:'Playfair_Display',Helvetica] font-bold text-[#eabe30] text-[56px] tracking-[0] leading-[67.2px] whitespace-nowrap">
              Facials
            </h1>
          </div>

          <div className="flex w-[493px] gap-8 flex-[0_0_auto] flex-col items-start relative">
            <p className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-white text-lg tracking-[0] leading-[27px]">
              Refresh and renew your skin with our luxury facials. Starting at
              just #30,000 each treatment is tailored to your unique skincare
              needs
            </p>
          </div>
        </header>
      </div>
    </section>
  );
};
