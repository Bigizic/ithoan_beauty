import React from "react";
import { Card, CardContent } from "../../../ui/card";

const features = [
  {
    icon: "/images/home_page/why_choose_us_icon_1.png",
    title: "Skilled Professionals",
    description:
      "Our team is trained to provide expert care tailored to your needs.",
  },
  {
    icon: "/images/home_page/why_choose_us_icon_1.png",
    title: "Premium Products",
    description:
      "We use only high-quality, skin-friendly products for safe and lasting results.",
  },
  {
    icon: "/images/home_page/why_choose_us_icon_1.png",
    title: "Relaxing Atmosphere",
    description:
      "Enjoy treatments in a serene and calming space designed for comfort.",
  },
  {
    icon: "/images/home_page/why_choose_us_icon_1.png",
    title: "Affordable Luxury",
    description:
      "Experience top-class spa services at prices that suit your budget.",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="min-h-[849px] why-choose-us-bg flex flex-col w-full items-center gap-20 pd-default py-[64px] sm:py-28 relative">
      <div className="max-w-screen-md items-center gap-6 w-full flex-[0_0_auto] flex flex-col relative">
        <h2 data-aos="fade-up" data-aos-delay="100" className="relative self-stretch mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-white text-5xl text-center tracking-[0] leading-[57.6px]">
          Why Choose Us
        </h2>

        <p className="relative self-stretch font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-white text-[length:var(--text-medium-normal-font-size)] text-center tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
          We make every visit soothing and unforgettable.
        </p>
      </div>

      <div className="flex-col max-w-screen-xl items-start gap-2 w-full flex-[0_0_auto] flex relative">
        <div className="w-full max-w-[1280px] gap-20 flex items-start relative flex-col md:flex-row">
          <div className="items-start gap-8 flex-1 grow flex flex-col relative">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto] text-justify sm:text-start">
              <div className="inline-flex items-center relative flex-[0_0_auto]">
                <span data-aos-once="false" className="relative w-fit mt-[-1.00px] font-heading-tagline font-[number:var(--heading-tagline-font-weight)] text-white text-[length:var(--heading-tagline-font-size)] tracking-[var(--heading-tagline-letter-spacing)] leading-[var(--heading-tagline-line-height)] whitespace-nowrap [font-style:var(--heading-tagline-font-style)]">
                  Relax. Refresh. Renew
                </span>
              </div>

              <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                <h3 data-aos="fade-right" data-aos-delay="600" className="relative self-stretch mt-[-1.00px] font-heading-h2 font-[number:var(--heading-h2-font-weight)] text-white text-[length:var(--heading-h2-font-size)] tracking-[var(--heading-h2-letter-spacing)] leading-[var(--heading-h2-line-height)] [font-style:var(--heading-h2-font-style)]">
                  Where Beauty Meets Serenity
                </h3>

                <p className="relative self-stretch font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-white text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
                  We combine expert care, premium products, and a relaxing
                  atmosphere to give you the spa experience you deserve.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-[852px] items-start gap-16 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-transparent border-none shadow-none"
                >
                  <CardContent className="flex flex-col items-start gap-6 p-0">
                    <img
                      className="relative w-12 h-12 object-cover"
                      alt="Spa relax"
                      src={feature.icon}
                    />

                    <h4 data-aos="fade-right" data-aos-delay={100 * index + 300} className="relative self-stretch font-heading-h4 font-[number:var(--heading-h4-font-weight)] text-white text-[24px] sm:text-[length:var(--heading-h4-font-size)] tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] [font-style:var(--heading-h4-font-style)]">
                      {feature.title}
                    </h4>

                    <p className="relative self-stretch font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-white text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
