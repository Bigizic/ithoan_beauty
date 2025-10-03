import React from "react";
import { ServiceProps } from "../../../../interface";

export const HeroSection = (props: ServiceProps) => {
  const { service } = props;

  return (
    <section
      className="flex flex-col items-center gap-20 pd-default pt-[20em] pb-28 relative self-stretch w-full flex-[0_0_auto]"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url(${service?.imageUrl[0]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col max-w-screen-xl items-start gap-20 relative w-full flex-[0_0_auto]">
        <header className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex gap-1 md:gap-4 flex-[0_0_auto] flex-col items-start relative">
            <div className="inline-flex items-center relative self-stretch flex-[0_0_auto]">
              <p
                data-aos="fade-right"
                data-aos-once="false"
                className="text-wrap relative w-fit mt-[-1.00px] font-heading-tagline font-[number:var(--heading-tagline-font-weight)] text-white text-[12px] md:text-[length:var(--heading-tagline-font-size)] tracking-[var(--heading-tagline-letter-spacing)] leading-[var(--heading-tagline-line-height)] whitespace-nowrap [font-style:var(--heading-tagline-font-style)]"
              >
                {service?.title}
              </p>
            </div>

            <h1 className="text-wrap relative w-fit [font-family:'Playfair_Display',Helvetica] font-bold text-[#eabe30] text-[48px] md:text-[56px] tracking-[0] leading-[67.2px] whitespace-nowrap">
              {service?.name}
            </h1>
          </div>

          <div className="flex w-full md:w-[493px] gap-8 flex-[0_0_auto] flex-col items-start relative">
            <p dangerouslySetInnerHTML={{ __html: service?.description }} className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-white text-[16px] md:text-lg tracking-[0] leading-[27px]">
            </p>
          </div>
        </header>
      </div>
    </section>
  );
};
