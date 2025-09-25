import { ChevronRight as ChevronRightIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Service } from "../../../../store/slices/servicesSlice";

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection = ({ services }: ServicesSectionProps): JSX.Element => {
  const getServiceSize = (index: number) => {
    if (index === 0 || index === 4) return "large";
    if (index === 3) return "medium";
    return "small";
  };

  const getTitleSize = (index: number) => {
    if (index === 0 || index === 3 || index === 4) return "text-[40px] leading-[48px]";
    return "text-2xl leading-[33.6px]";
  };

  return (
    <section className="flex flex-col w-full items-center gap-20 pd-default py-28 bg-[#c9c2a5]">
      <div className="flex flex-col max-w-screen-xl items-center gap-20 w-full">
        <header className="flex flex-col max-w-screen-md items-center gap-4 w-full">
          <div className="flex flex-col items-center gap-6 w-full">
            <h1 className="w-full mt-[-1px] font-bold text-black text-5xl text-center leading-[57.6px]">
              Our Services
            </h1>
            <p className="w-full font-normal text-black text-lg text-center leading-[27px]">
              We offer services for your beauty and wellness needs.
            </p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {services.slice(0, 5).map((service, index) => {
            const size = getServiceSize(index);
            const titleSize = getTitleSize(index);
            
            return (
            <Card
              key={service.id}
              className={`rounded-[10px] border-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]`}
              style={{
                backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url(${service.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <CardContent
                className={`flex flex-col items-start ${
                  size === "large"
                    ? "justify-center gap-20 p-12 h-[512px]"
                    : "gap-20 p-6 h-full"
                }`}
              >
                <div className="flex flex-col items-start gap-2 w-full">
                  <h2
                    className={`font-bold text-[#c9c2a5] ${titleSize}`}
                  >
                    {service.title}
                  </h2>
                  <p className="font-normal text-[#c9c2a5] text-base leading-6">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center gap-6 w-full">
                  <Link href={`/services/${service.slug}`}>
                    <Button
                      variant="ghost"
                      className="inline-flex items-center justify-center gap-2 p-0 h-auto bg-transparent hover:bg-transparent"
                    >
                      <span className="font-normal text-[#c9c2a5] text-base leading-6 whitespace-nowrap">
                        Learn More
                      </span>
                      <ChevronRightIcon className="w-6 h-6 text-[#c9c2a5]" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      </div>

      <Link href="/services">
        <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#eabe30] rounded-[5px] border border-solid border-[#c9c2a5] hover:bg-[#eabe30]/90 h-auto">
          <span className="font-normal text-black text-base leading-6 whitespace-nowrap">
            View All
          </span>
        </Button>
      </Link>
    </section>
  );
};
