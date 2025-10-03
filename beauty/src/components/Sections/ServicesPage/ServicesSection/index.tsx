import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { ServicesProps } from "../../../../interface";
import { useNavigate } from "react-router-dom";

const Oldservices = [
  {
    id: 1,
    title: "Facials",
    description: "Glow-restoring treatments for healthy skin.",
    backgroundImage: "/images/services_page/services/facials.jpg",
    size: "large",
    titleSize: "text-[40px] leading-[48px]",
  },
  {
    id: 2,
    title: "Massage",
    description: "Relaxing techniques to ease stress and tension.",
    backgroundImage: "/images/services_page/services/massage.jpg",
    size: "small",
    titleSize: "text-2xl leading-[33.6px]",
  },
  {
    id: 3,
    title: "Lashes",
    description: "Enhancing your eyes with expert lash treatments.",
    backgroundImage: "/images/services_page/services/lashes.jpg",
    size: "small",
    titleSize: "text-2xl leading-[33.6px]",
  },
  {
    id: 4,
    title: "Body Polish",
    description: "Gentle exfoliation for silky, radiant skin.",
    backgroundImage: "/images/services_page/services/body_polish.jpg",
    size: "medium",
    titleSize: "text-[40px] leading-[48px]",
  },
  {
    id: 5,
    title: "Pedicure Treatment",
    description: "Nourishing care for soft, beautiful feet.",
    backgroundImage: "/images/services_page/services/pedicure.jpg",
    size: "large",
    titleSize: "text-[40px] leading-[48px]",
  },
];

/*
justify-center gap-20 p-12 h-[512px]
*/

export const ServicesSection = (props: ServicesProps) => {
  const { services } = props;
  const navigate = useNavigate()
  return (
    <section className="flex flex-col w-full items-center gap-20 pd-default py-default bg-[#c9c2a5]">
      <div className="flex flex-col max-w-screen-xl items-center gap-20 w-full">
        <header className="flex flex-col max-w-screen-md items-center gap-4 w-full">
          <div className="flex flex-col items-center gap-[8px] sm:gap-6 w-full">
            <h1 className="w-full mt-[-1px] font-bold text-black text-5xl text-center leading-[57.6px]">
              Our Services
            </h1>
            <p className="w-full font-normal text-black text-lg text-center leading-[27px]">
              We offer services for your beauty and wellness needs.
            </p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className={`rounded-[10px] border-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]`}
              style={{
                backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url(${service.imageUrl[0]})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <CardContent
                className={`flex flex-col items-start justify-center gap-20 px-6 py-12  h-full md:h-[512px] `}
              >
                <div className="flex flex-col items-start gap-2 w-full">
                  <h2
                    className={`font-bold text-[#c9c2a5] text-[40px] leading-[48px]`}
                    data-aos="fade-up"
                  >
                    {service.name}
                  </h2>
                  <p className="font-normal text-[#c9c2a5] text-base leading-6" dangerouslySetInnerHTML={{ __html: service.description }}>
                  </p>
                  <div className="service-array mt-4">
                    {service.serviceArray.slice(0, 6).map((item, idx) => (
                      <p key={idx} data-aos="fade-right" data-aos-delay={100 + idx * 200} className="text-sm text-white">
                        &#x2713; {item.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full">
                  <Button
                    onClick={() => navigate(`/services/${service.slug}`)}
                    variant="ghost"
                    className="inline-flex items-center justify-center gap-2 p-0 h-auto bg-transparent hover:bg-transparent"
                  >
                    <span className="font-normal text-[#c9c2a5] text-base leading-6 whitespace-nowrap">
                      View Service
                    </span>
                    <ChevronRightIcon className="w-6 h-6 text-[#c9c2a5]" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#eabe30] rounded-[5px] border border-solid border-[#c9c2a5] hover:bg-[#eabe30]/90 h-auto">
        <span className="font-normal text-black text-base leading-6 whitespace-nowrap">
          Contact us
        </span>
      </Button>
    </section>
  );
};
