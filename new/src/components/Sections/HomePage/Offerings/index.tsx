import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const servicesData = [
  {
    id: 1,
    category: "Facials",
    title: "Revitalize Your Skin",
    description: "Customized treatments for radiant skin.",
    image: "/images/home_page/offerings/offering_1.jpg",
    size: "small",
  },
  {
    id: 2,
    category: "Massage",
    title: "Relax and Unwind",
    description: "Experience ultimate relaxation with our massage therapy.",
    image: "/images/home_page/offerings/offering_2.jpg",
    size: "small",
  },
  {
    id: 3,
    category: "Waxing",
    title: "Smooth and Silky",
    description: "Achieve flawless skin with our waxing services.",
    image: "/images/home_page/offerings/offering_3.jpg",
    size: "small",
  },
  {
    id: 4,
    category: "Pedicure",
    title: "Pamper Your Feet",
    description: "Indulge in our rejuvenating pedicure treatments.",
    image: "/images/home_page/offerings/offering_4.jpg",
    size: "small",
  },
  {
    id: 5,
    category: "Lashes",
    title: "Enhance Your Natural Beauty",
    description: "Our lash services will give you a stunning look.",
    image: "/images/home_page/offerings/offering_5.jpg",
    size: "large",
  },
];

interface WhyChooseUsProps {
  services?: [{
    id: string,
    category: string,
    name: string,
    image: string,
    title: string,
    description: string
  }]
}

export const OfferingsSection = (props: WhyChooseUsProps) => {
  //const { services } = props
  const services = servicesData
  return (
    <section className="flex flex-col w-full items-center gap-20 pd-default py-[64px] sm:py-28 relative bg-[#e6e1c9]">
      <div className="flex flex-col max-w-screen-xl items-center gap-20 relative w-full">
        <header className="flex flex-col max-w-screen-md items-center gap-[12px] relative w-full">
          <div className="inline-flex items-center relative">
            <div className="w-fit text-[#1c1c1c] text-center whitespace-nowrap relative mt-[-1.00px] font-heading-tagline font-[number:var(--heading-tagline-font-weight)] text-[length:var(--heading-tagline-font-size)] tracking-[var(--heading-tagline-letter-spacing)] leading-[var(--heading-tagline-line-height)] [font-style:var(--heading-tagline-font-style)]">
              <p>Services</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 relative self-stretch w-full">
            <h2 data-aos="fade-right" className="relative self-stretch [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#1c1c1c] text-5xl text-center tracking-[0] leading-[57.6px]">
              Explore Our Offerings
            </h2>
            <p className="relative self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-[#1c1c1c] text-lg text-center tracking-[0] leading-[27px]">
              Indulge in our luxurious spa treatments.
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 self-stretch w-full">
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex gap-8 flex-col md:flex-row">
              {services.slice(0, 2).map((service, idx) => (
                <Card
                  key={service.id}
                  className="flex flex-col w-full md:w-[306px] bg-[#e6e1c9] rounded-[10px] overflow-hidden border border-solid border-[#1c1c1c]"
                >
                  <div className="flex flex-col items-center justify-end relative self-stretch w-full">
                    <img
                      className="relative self-stretch w-full h-[171px] object-cover"
                      alt={`${service.category} service`}
                      src={service.image}
                    />
                  </div>

                  <CardContent className="flex flex-col items-start justify-center gap-6 p-6">
                    <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                      <div className="inline-flex items-center relative">
                        <div data-aos="fade-right" data-aos-delay={100 * idx + 100} className="relative w-fit mt-[-1.00px] font-heading-tagline font-[number:var(--heading-tagline-font-weight)] text-[#1c1c1c] text-[length:var(--heading-tagline-font-size)] tracking-[var(--heading-tagline-letter-spacing)] leading-[var(--heading-tagline-line-height)] whitespace-nowrap [font-style:var(--heading-tagline-font-style)]">
                          {service.category}
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                        <h3 data-aos="fade-right" data-aos-delay={100 * idx + 100} className="relative self-stretch mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#1c1c1c] text-2xl tracking-[0] leading-[33.6px]">
                          {service.title}
                        </h3>

                        <p data-aos="fade-right" data-aos-delay={100 * idx + 100} className="relative self-stretch font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#1c1c1c] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="h-auto inline-flex items-center justify-center gap-2 p-2 rounded-[5px] border border-solid border-[#1c1c1c] bg-transparent hover:bg-[#1c1c1c] hover:text-white"
                    >
                      <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                        Book Appointment
                      </span>
                      <ChevronRightIcon className="relative w-6 h-6" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-8 flex-col md:flex-row">
              {services.slice(2, 4).map((service, idx) => (
                <Card
                  key={service.id}
                  className="flex flex-col flex-1 bg-[#e6e1c9] rounded-[10px] overflow-hidden border border-solid border-[#1c1c1c]"
                >
                  <div className="flex flex-col items-center justify-end relative self-stretch w-full">
                    <img
                      className="relative self-stretch w-full h-[171px] object-cover"
                      alt={`${service.category} service`}
                      src={service.image}
                    />
                  </div>

                  <CardContent className="flex flex-col items-start justify-center gap-6 p-6">
                    <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                      <div className="inline-flex items-center relative">
                        <div data-aos="fade-right" data-aos-delay={100 * idx + 100} className="relative w-fit mt-[-1.00px] font-heading-tagline font-[number:var(--heading-tagline-font-weight)] text-[#1c1c1c] text-[length:var(--heading-tagline-font-size)] tracking-[var(--heading-tagline-letter-spacing)] leading-[var(--heading-tagline-line-height)] whitespace-nowrap [font-style:var(--heading-tagline-font-style)]">
                          {service.category}
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                        <h3 data-aos="fade-right" data-aos-delay={100 * idx + 100} className="relative self-stretch mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#1c1c1c] text-2xl tracking-[0] leading-[33.6px]">
                          {service.title}
                        </h3>

                        <p data-aos="fade-right" data-aos-delay={100 * idx + 100} className="relative self-stretch font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#1c1c1c] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="h-auto inline-flex items-center justify-center gap-2 p-2 rounded-[5px] border border-solid border-[#1c1c1c] bg-transparent hover:bg-[#1c1c1c] hover:text-white"
                    >
                      <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                        Book Appointment
                      </span>
                      <ChevronRightIcon className="relative w-6 h-6" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="flex flex-col flex-1 self-stretch bg-[#e6e1c9] rounded-[10px] overflow-hidden border border-solid border-[#1c1c1c]">
            <div className="h-[360px] flex flex-col items-center justify-end relative self-stretch w-full">
              <img
                className="relative self-stretch w-full h-[360px] object-cover"
                alt="Lashes service"
                src={services[4].image}
              />
            </div>

            <CardContent className="flex flex-col items-start justify-center gap-6 md:gap-8 p-12 pl-6 flex-1">
              <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                <div className="inline-flex items-center relative">
                  <div data-aos="fade-right" data-aos-delay={100 * 0 + 100} className="relative w-fit mt-[-1.00px] font-heading-tagline font-[number:var(--heading-tagline-font-weight)] text-[#1c1c1c] text-[length:var(--heading-tagline-font-size)] tracking-[var(--heading-tagline-letter-spacing)] leading-[var(--heading-tagline-line-height)] whitespace-nowrap [font-style:var(--heading-tagline-font-style)]">
                    {services[4].category}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                  <h3 data-aos="fade-right" data-aos-delay={100 * 1 + 100} className="mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] text-[#1c1c1c] text-[32px] md:text-[40px] leading-[48.0px] relative self-stretch font-bold tracking-[0]">
                    {services[4].title}
                  </h3>

                  <p data-aos="fade-right" data-aos-delay={100 * 2 + 100} className="relative self-stretch font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#1c1c1c] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                    {services[4].description}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="h-auto inline-flex items-center justify-center gap-2 p-2 rounded-[5px] border border-solid border-[#1c1c1c] bg-transparent hover:bg-[#1c1c1c] hover:text-white"
              >
                <span className="relative w-fit font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                  Book Appointment
                </span>
                <ChevronRightIcon className="relative w-6 h-6" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};