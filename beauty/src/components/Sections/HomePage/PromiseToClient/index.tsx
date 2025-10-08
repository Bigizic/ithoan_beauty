import React from "react";
import { Avatar } from "../../../ui/avatar";
import { Card, CardContent } from "../../../ui/card";

const promises = [
  {
    name: "exceptional service",
    testimonial:
      "our expert team is dedicated to delivering personalized treatments that exceed expectations.",
    icon: "/images/home_page/star.svg",
  },
  {
    name: "relaxation guaranteed",
    testimonial:
      "step into a tranquil atmosphere designed to calm your mind, soothe your body, and refresh your spirit.",
    icon: "/images/home_page/star.svg",
  },
  {
    name: "lasting glow",
    testimonial:
      "we use premium, skin-friendly products that enhance your natural beauty and leave you feeling renewed.",
    icon: "/images/home_page/star.svg",
  },
];

export const PromiseToClient = () => {
  return (
    <section className="flex flex-col w-full items-center gap-20 pd-default py-[64px] sm:py-28 relative bg-[#e6e1c9]">
      <div className="flex flex-col max-w-screen-xl items-center gap-20 relative w-full">
        <header className="flex flex-col max-w-screen-md items-center gap-4 relative w-full">
          <h2
            data-aos="fade-up"
            data-aos-once="true"
            className="[font-family:'Bricolage_Grotesque',Helvetica] text-[#1c1c1c] text-5xl text-center leading-[57.6px] font-bold tracking-[0]"
          >
            Our Promise to Every Client
          </h2>

          <p className="font-text-medium-normal text-[#1c1c1c] text-center leading-[var(--text-medium-normal-line-height)]">
            We’re dedicated to creating a relaxing, restorative, and confidence boosting
            experience for everyone who walks through our doors.
          </p>

        </header>

        <div className="flex flex-col items-start gap-8 relative w-full">
          <div className="flex gap-8 w-full items-start flex-col md:flex-row">
            {promises.map((promise, index) => (
              <Card
                key={index}
                className="flex-1 bg-[#e6e1c9] rounded-[5px] border border-solid border-[#eabe30] hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="flex flex-col items-start gap-6 p-8">
                  <div className="flex items-center gap-4 w-full">
                    <Avatar className="w-12 h-12 bg-[#eabe30]/20 flex items-center justify-center text-[#1c1c1c] font-semibold capitalize">
                      {promise.name.charAt(0)}
                    </Avatar>

                    <div className="flex flex-col items-start flex-1">
                      <div className="font-text-regular-semi-bold text-[#1c1c1c] text-lg capitalize">
                        {promise.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-6">
                    <p className="font-text-medium-normal text-[#1c1c1c] text-base leading-relaxed">
                      {promise.testimonial}
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, idx) => (
                        <img key={idx} alt="icon" src={promise.icon} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
