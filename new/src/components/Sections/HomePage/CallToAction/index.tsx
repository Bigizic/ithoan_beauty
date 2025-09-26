import React from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import ScrollTranslateOthers from "../../../Common/ScrollTranslateOthers";

export const CallToActionSection = () => {
  return (
    <section className="flex flex-col w-full items-center gap-20 pd-default py-[64px] sm:py-28 relative call-to-action-bg">
      <div className="flex-col max-w-screen-xl items-start gap-20 w-full flex-[0_0_auto] flex relative">
        <div className="flex items-center gap-20 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-start gap-8 flex-1 grow flex-col relative">
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <ScrollTranslateOthers multiplier={0.5}>
                <h1 className="mt-[-1.00px] mb-[-50px] sm:mb-[0px] [font-family:'Bricolage_Grotesque',Helvetica] text-white text-5xl leading-[57.6px] relative self-stretch font-bold tracking-[0]">
                  Ready to transform your wellness?
                </h1>
              </ScrollTranslateOthers>

              <p className="relative self-stretch font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-white text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
                Join our community and start your personalized wellness journey
                today. Exclusive offers await you.
              </p>
            </div>
            <div className="flex flex-col w-full lg:w-[513px] items-start gap-4 relative flex-[0_0_auto]">
              <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto] flex-col md:flex-row">
                <Input
                  className="h-[48px] p-[12px] flex-1 grow mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] rounded-[5px] border border-solid border-[#eabe30] bg-transparent text-white placeholder:text-white font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
                  placeholder="Enter email"
                  type="email"
                />

                <Button className="border-0 h-auto inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] mt-[-2.00px] mb-[-2.00px] mr-[-2.00px] bg-[#eabe30] rounded-[5px] border-solid hover:bg-[#d4a82a] font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#1c1c1c] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                  Sign up
                </Button>
              </div>

              <p className="relative self-stretch font-text-tiny-normal font-[number:var(--text-tiny-normal-font-weight)] text-white text-[length:var(--text-tiny-normal-font-size)] tracking-[var(--text-tiny-normal-letter-spacing)] leading-[var(--text-tiny-normal-line-height)] [font-style:var(--text-tiny-normal-font-style)]">
                By signing up, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
