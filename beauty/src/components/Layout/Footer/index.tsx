import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Link, useNavigate } from "react-router-dom";
import { SERVICESMENU } from "../../../types";
import HyperLink from "../../Common/HyperLink";

interface FooterProps {
  services: SERVICESMENU[]
}

export const Footer = (props: FooterProps) => {
  const { services } = props;
  const googleMapsLink = "https://maps.app.goo.gl/h1a1gvUfMj37m3bx6";

  const quickLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
    { label: "Locate Us", href: googleMapsLink },
  ];

  const contactInfo = [
    { label: "Address", href: googleMapsLink, text: "Ikorodu, Lagos State" },
    { label: "Phone", href: "tel:+234 907 769 2506", text: "+234 907 769 2506" },
    { label: "Email", href: "mailto:support@tohannieesskincare.com", text: "support@tohannieesskincare.com" },
  ];

  const footerLinks = [
    { label: "Protocols", href: "/policy" },
    { label: "Privacy Policy", href: "https://tohannieesskincare.com/terms" },
  ];

  const socialIcons = [
    { alt: "Instagram", src: "/images/footer/instagram.svg", href: "https://instagram.com/tohanniees_beauty001" },
  ];
  const navigate = useNavigate()
  return (
    <footer className="w-full items-center gap-8 pd-default py-20 bg-[#1c1c1c] flex flex-col relative">
      <div className="flex-col max-w-screen-xl items-start gap-20 w-full flex-[0_0_auto] flex relative">
        <div className="flex-col gap-8 self-stretch w-full flex-[0_0_auto] flex items-start relative">
          <Card className="gap-32 px-6 py-12 self-stretch w-full flex-[0_0_auto] bg-[#1c1c1c] rounded-[5px] border-[#eabe30] flex items-start relative border border-solid">
            <CardContent className="flex-col sm:flex-row flex items-start gap-10 relative flex-1 grow p-0">
              <div className="flex w-full lg:w-[50%] justify-center flex-col items-center">
                <img
                  className="relative w-[112px] h-22 sm:w-[322px] sm:h-[286px] object-cover"
                  alt="Removal"
                  src="/logo_no_bg_p.png"
                />
                <p className="text-other font-alex-brush text-[22px] sm:text-[32px] -tracking-tight">
                  Tohanniees Beauty
                </p>
              </div>
              <div className="flex-row flex items-start gap-10 relative flex-wrap sm:flex-nowrap justify-start sm:justify-around w-full">
                <div className="flex justify-between sm:justify-start lg:justify-evenly w-full gap-4 flex-wrap flex-col sm:flex-row">
                  <div className="flex justify-between w-full lg:w-[50%] lg:justify-around flex-col sm:flex-row gap-4">
                    <div className="flex flex-col items-start gap-4 relative">
                      <h3 className="self-stretch text-white relative mt-[-1.00px] font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                        Services
                      </h3>

                      <nav className="items-start self-stretch w-full flex flex-col relative flex-[0_0_auto]">
                        {services?.map((service, index) => (
                          <div
                            key={index}
                            className="text-white flex items-start px-0 py-2 relative self-stretch w-full flex-[0_0_auto]"
                          >
                            <HyperLink
                              to={'services' + '/' + service.slug}
                              onClick={() => navigate('services' + '/' + service.slug)}
                              text={service.name}
                              className="text-white relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-xs sm:text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer"
                            >
                            </HyperLink>
                          </div>
                        ))}
                      </nav>
                    </div>

                    <div className="flex flex-col items-start gap-4 relative">
                      <h3 className="relative self-stretch mt-[-1.00px] font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-white text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                        Quick Links
                      </h3>

                      <nav className="items-start self-stretch w-full flex flex-col relative flex-[0_0_auto]">
                        {quickLinks.map((link, index) => (
                          <div
                            key={index}
                            className="flex items-start px-0 py-2 relative self-stretch w-full flex-[0_0_auto]"
                          >
                            <Link to={link.href} className="relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-xs sm:text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer">
                              {link.label}
                            </Link>
                          </div>
                        ))}
                      </nav>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-4 relative">
                    <h3 className="relative self-stretch mt-[-1.00px] font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-white text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                      Contact Us
                    </h3>

                    <div className="items-start self-stretch w-full flex flex-col relative flex-[0_0_auto]">
                      {contactInfo.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-start px-0 py-2 relative self-stretch w-full flex-[0_0_auto]"
                        >
                          <Link target="_blank" to={contact.href} className="relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-xs sm:text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer">
                            {contact.text}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex justify-between self-stretch w-full items-start relative flex-[0_0_auto] md:flex-nowrap flex-wrap gap-[1em] md:gap-0">
              <div className="flex flex-col md:flex-row gap-2 md:gap-6 relative flex-[0_0_auto] w-full flex-wrap">
                <div className="relative w-fit text-xs text-white whitespace-nowrap">
                  &copy; {new Date().getFullYear()} Tohanniees Beauty. All rights reserved.
                </div>
                {footerLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="relative w-fit text-xs text-white underline hover:text-[#eabe30] cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
                {socialIcons.map((icon, index) => (
                  <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
                    <img
                      className="relative w-6 h-6 hover:opacity-80 cursor-pointer"
                      alt={icon.alt}
                      src={icon.src}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
