import React from "react";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";

export const SpecialOffersSection = () => {
  return (
    <section className="flex-[0_0_auto] bg-white flex flex-col w-full items-center gap-20 pd-default py-28 relative">
      <div className="flex-col max-w-screen-xl items-start gap-20 w-full flex-[0_0_auto] flex relative">
        <Card className="flex items-center gap-20 relative self-stretch w-full flex-col md:flex-row flex-[0_0_auto] border-0 shadow-none bg-transparent">
          <CardContent className="flex flex-col items-start gap-8 relative flex-1 grow p-0 md:w-[50%]">
            <div className="items-start gap-6 self-stretch w-full flex-[0_0_auto] flex flex-col relative">
              <img
                className="relative w-[2.5rem] h-[2.5rem] md:w-20 md:h-20"
                alt="Package"
                src="/images/home_page/package.svg"
              />

              <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                <h2 data-aos="fade-right" data-aos-delay="100" className="relative self-stretch mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-black text-5xl tracking-[0] leading-[57.6px]">
                  Special offers and packages
                </h2>

                <p className="relative self-stretch font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
                  Unlock exclusive wellness experiences with our seasonal spa
                  packages. Treat yourself to unbeatable value and
                  transformative treatments.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
              <Button
                variant="outline"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[5px] overflow-hidden border border-solid border-[#eabe30] bg-transparent hover:bg-[#eabe30]/10 h-auto"
              >
                <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                  View offers
                </span>
              </Button>
            </div>
          </CardContent>

          <img
            className="relative flex-1 grow h-full w-full md:h-[640px] rounded-[10px] object-cover md:w-[50%]"
            alt="Placeholder image"
            src="/images/home_page/special_offers.jpg"
          />
        </Card>
      </div>
    </section>
  );
};