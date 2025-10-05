import React from "react";
import { Button } from "../../../ui/button";
import ScrollTranslateOthers from "../../../Common/ScrollTranslateOthers";
import { useNavigate } from "react-router-dom";

export const IndulgeSection = () => {
  const navigate = useNavigate()
  return (
    <section className="flex flex-col w-full items-center gap-20 pd-default py-default relative bg-services-call-to-action">
      <div className="flex flex-col max-w-screen-xl items-center gap-20 relative w-full">
        <div className="flex-col max-w-screen-md items-center gap-8 w-full flex relative">
          <ScrollTranslateOthers multiplier={0.4} className="flex flex-col items-center gap-6 relative self-stretch w-full">
            <h1 className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-bold text-white text-5xl text-center tracking-[0] leading-[57.6px]">
              Ready to Indulge?
            </h1>

            <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[27px]">
              Book your appointment today and step into relaxation
            </p>
          </ScrollTranslateOthers>

          <div className="items-start inline-flex gap-4 relative">
            <Button
              onClick={() => navigate('/booking')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 relative bg-[#eabe30] rounded-[5px] text-black text-base [font-family:'Poppins',Helvetica] font-normal tracking-[0] leading-6 whitespace-nowrap hover:bg-[#d4a82a] h-auto"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
