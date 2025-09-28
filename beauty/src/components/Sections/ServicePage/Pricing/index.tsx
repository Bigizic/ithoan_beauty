import { CheckIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../../components/ui/separator";

const pricingPlans = [
  {
    title: "Express Glow Facial",
    duration: "30 minutes of rejuvenation",
    price: "₦30,000",
    features: [
      "Quick and refreshing",
      "Perfect for busy days",
      "Immediate glow effect",
    ],
  },
  {
    title: "Deep Cleansing Facial",
    duration: "60 minutes of care",
    price: "₦30,000",
    features: [
      "Thorough skin detox",
      "Hydration boost included",
      "Ideal for all skin",
      "Relaxing atmosphere",
    ],
  },
  {
    title: "Luxury Rejuvenation Facial",
    duration: "90 minutes of indulgence",
    price: "₦30,000",
    features: [
      "Ultimate relaxation experience",
      "Customized treatment plan",
      "Luxurious products used",
      "Long-lasting results",
      "Exclusive member perks",
    ],
  },
];

export const PricingPlansSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-20 px-16 py-28 w-full bg-[#e6e1c9]">
      <div className="flex-col max-w-screen-xl gap-20 flex items-center w-full">
        <header className="flex flex-col max-w-screen-md items-center gap-4 w-full">
          <div className="flex-col items-center gap-6 w-full flex">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] text-5xl text-center leading-[57.6px] font-bold text-[#1c1c1c] tracking-[0]">
              Pricing Plans
            </h2>

            <p className="[font-family:'Poppins',Helvetica] text-lg text-center leading-[27px] font-normal text-[#1c1c1c] tracking-[0]">
              Select the perfect facial for your needs.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="flex flex-col border border-[#eabe30] bg-[#00000001] p-8 gap-8"
            >
              <CardContent className="flex flex-col gap-8 p-0">
                <div className="flex flex-col gap-1">
                  <h3 className="[font-family:'Poppins',Helvetica] text-xl leading-7 font-bold text-[#1c1c1c] tracking-[0]">
                    {plan.title}
                  </h3>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[0] leading-6">
                    {plan.duration}
                  </p>
                </div>

                <Separator className="h-px bg-[url('/divider.svg')] bg-cover" />

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#1c1c1c] text-5xl tracking-[0] leading-[57.6px]">
                      {plan.price}
                    </div>
                  </div>

                  <Button className="h-auto bg-[#eabe30] hover:bg-[#d4a82a] text-[#1c1c1c] px-6 py-3 rounded-[10px] font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                    Book Now
                  </Button>
                </div>

                <Separator className="h-px bg-[url('/divider.svg')] bg-cover" />

                <div className="flex flex-col gap-4 py-2">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-4">
                      <CheckIcon className="w-6 h-6 text-[#1c1c1c] flex-shrink-0" />
                      <span className="flex-1 [font-family:'Poppins',Helvetica] text-base leading-6 font-normal text-[#1c1c1c] tracking-[0]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
