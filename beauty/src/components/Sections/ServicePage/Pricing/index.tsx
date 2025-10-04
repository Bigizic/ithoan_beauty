import { CheckIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { PricingPlansProps } from "../../../../interface";
import { DurationTime } from "../../../Common/DurationTime";
import { formatTime } from "../../../Common/FormatTIme";
import { ACTIONSTYPE } from "../../../../actions";
import { useNavigate } from "react-router-dom";

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

export const PricingPlansSection = (props: PricingPlansProps & ACTIONSTYPE) => {
  const { services, serviceCat, setSelectedService, setSelectedSubService } = props;
  const navigate = useNavigate()

  const handleBookAppointment = (service: any) => {
    setSelectedService(services);
    setSelectedSubService(service)
    navigate('/booking');
  };
  return (
    <section className="flex flex-col items-center gap-20 pd-default py-default w-full bg-[#e6e1c9]">
      <div className="flex-col max-w-screen-xl gap-20 flex items-center w-full">
        <header className="flex flex-col max-w-screen-md items-center gap-4 w-full">
          <div className="flex-col items-center gap-[0] md:gap-6 w-full flex">
            <h2
              data-aos="fade-up"
              data-aos-once="true"
              className="[font-family:'Bricolage_Grotesque',Helvetica] text-5xl text-center leading-[57.6px] font-bold text-[#1c1c1c] tracking-[0]"
            >
              Pricing Plans
            </h2>

            <p className="[font-family:'Poppins',Helvetica] text-lg text-center leading-[27px] font-normal text-[#1c1c1c] tracking-[0]">
              Select the perfect category for your needs.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {serviceCat?.map((plan, index) => {
            return (
              <Card
                key={index}
                className="flex flex-col border border-[#eabe30] bg-[#00000001] p-[16px] md:p-[32px] gap-8"
              >
                <CardContent className="flex flex-col gap-8 p-0">
                  <div className="flex flex-col gap-[16px]">
                    <h3 className="font-extrabold [font-family:'Poppins',Helvetica] text-[18px] md:text-[20px] leading-7 text-[#1c1c1c] tracking-[0]">
                      {plan?.name}
                    </h3>
                    <p className="text-[12px] md:text-[16px]">
                      {plan?.description}
                    </p>
                    <p className="bg-[#EABE30] p-[8px] rounded-[5px] w-fit text-[12px] md:text-[16px] [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c] text-base tracking-[0] leading-6">
                      {DurationTime(plan?.duration)}
                    </p>
                  </div>

                  <Separator className="h-px bg-[#1C1C1C]" />

                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <div className="[font-family:'Poppins',Helvetica] font-semibold text-[#1c1c1c] text-5xl tracking-[0] leading-[31px] md:leading-[57.6px]">
                        #{plan?.price.toLocaleString()}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleBookAppointment(plan)}
                      className="h-auto bg-[#eabe30] hover:bg-[#d4a82a] text-[#1c1c1c] px-6 py-3 rounded-[10px] font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
                    >
                      Book Now
                    </Button>
                  </div>

                  <Separator className="h-px bg-[#1C1C1C]" />
                  <div>
                    <p className="text-sm font-medium text-[#1c1c1c]">when can you book?</p>
                    <div
                      className="grid grid-cols-2 gap-3 mt-2"
                    >
                      {plan?.availability.map((time, idx) => {
                        return (
                          <div
                            key={idx}
                            className="flex relative flex-col items-start bg-[#f5f2e6] rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <span data-aos="fade-in" className="text-xs font-semibold uppercase tracking-wide text-[#1c1c1c]">
                              {time.day.substring(0, 3)}
                            </span>
                            {time.timeRanges.map((range, rIdx) => {
                              const start = formatTime(range.startHour, range.startMinute);
                              const end = formatTime(range.endHour, range.endMinute);
                              return (
                                <span
                                  key={rIdx}
                                  className="text-xs text-[#555] mt-1"
                                >
                                  {start} - {end}
                                </span>
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
};
