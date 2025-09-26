import React from "react";
import { Avatar, AvatarImage } from "../../../ui/avatar";
import { Card, CardContent } from "../../../ui/card";

const testimonials = [
  {
    name: "Emily Rodriguez",
    avatar: "/images/home_page/customers/customer_1.jpg",
    testimonial:
      "The facial treatment completely renewed my skin's radiance and confidence.",
    stars: "/images/home_page/star.svg",
  },
  {
    name: "Michael Chen",
    avatar: "/images/home_page/customers/customer_2.jpg",
    testimonial:
      "Their massage therapy is the most relaxing experience I've ever had.",
    stars: "/images/home_page/star.svg",
  },
  {
    name: "Sarah Thompson",
    avatar: "/images/home_page/customers/customer_3.jpg",
    testimonial:
      "I've never felt more pampered and rejuvenated after a spa day.",
    stars: "/images/home_page/star.svg",
  },
];

export const ClientFeedbackSection = () => {
  return (
    <section className="flex flex-col w-full items-center gap-20 pd-default py-[64px] sm:py-28 relative bg-[#e6e1c9]">
      <div className="flex flex-col max-w-screen-xl items-center gap-20 relative w-full">
        <header className="flex flex-col max-w-screen-md items-center gap-4 relative w-full">
          <h2 data-aos="fade-up" data-aos-delay="700" className="[font-family:'Bricolage_Grotesque',Helvetica] text-[#1c1c1c] text-5xl text-center leading-[57.6px] font-bold tracking-[0]">
            What Our Clients Say
          </h2>

          <p className="font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-[#1c1c1c] text-[length:var(--text-medium-normal-font-size)] text-center tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
            Hear what our clients say about their transformative experiences
          </p>
        </header>

        <div className="flex flex-col items-start gap-8 relative w-full">
          <div className="flex gap-8 w-full items-start flex-col md:flex-row">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="flex-1 bg-[#e6e1c9] rounded-[5px] border border-solid border-[#eabe30]"
              >
                <CardContent className="flex flex-col items-start gap-6 p-8">
                  <div className="flex items-center gap-4 w-full">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt="Avatar image"
                        className="object-cover"
                      />
                    </Avatar>

                    <div className="flex flex-col items-start flex-1">
                      <div className="font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-[#1c1c1c] text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                        {testimonial.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-6">
                    <p className="font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-[#1c1c1c] text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
                      {testimonial.testimonial}
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, idx) => (
                        <img key={idx} alt="stars" src={testimonial.stars} />
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