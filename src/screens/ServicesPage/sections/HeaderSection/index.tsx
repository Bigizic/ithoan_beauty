import React from "react";

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="flex w-full min-h-[900px] items-start justify-center gap-20 pd-default py-28 relative bg-services-header">
      <div className="flex-col max-w-screen-xl items-start gap-20 flex-1 grow flex relative">
        <div className="flex items-start gap-20 relative flex-1 self-stretch w-full grow">
          <div className="justify-end gap-8 self-stretch flex flex-col items-start relative flex-1 grow">
            <h1 className="relative self-stretch [font-family:'Poppins',Helvetica] font-bold text-white text-[56px] tracking-[0] leading-[67.2px]">
              Experience Our Luxurious Spa Services Today
            </h1>

            <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-white text-lg tracking-[0] leading-[21.6px]">
              Discover our range of beauty and wellness treatments designed just
              for you.
            </p>
          </div>

          <div className="gap-4 self-stretch flex flex-col items-start relative flex-1 grow">
            <div className="items-start gap-4 self-stretch w-full flex-[0_0_auto] flex relative">
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-white text-lg tracking-[0] leading-[27px]">
                Indulge in our exquisite beauty and wellness treatments tailored
                for your unique needs. Let us elevate your self-care routine
                with our expert touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
