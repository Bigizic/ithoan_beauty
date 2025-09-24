import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const FooterSection = (): JSX.Element => {
  const quickLinks = [
    { label: "Home" },
    { label: "About Us" },
    { label: "Contact" },
    { label: "Pricing" },
  ];

  const services = [
    { label: "Waxing" },
    { label: "Facials" },
    { label: "Pedicure" },
    { label: "Massage" },
    { label: "Body Polish" },
    { label: "Lashes" },
  ];

  const contactInfo = [
    { label: "Address" },
    { label: "Phone" },
    { label: "Email" },
    { label: "Promotions" },
  ];

  const footerLinks = [
    { label: "Privacy Policy" },
    { label: "Terms of Service" },
    { label: "Cookie Settings" },
  ];

  const socialIcons = [
    //{ alt: "Facebook", src: "/images/footer/facebook.svg" },
    { alt: "Instagram", src: "/images/footer/instagram.svg" },
    //{ alt: "X", src: "/images/footer/x.svg" },
    //{ alt: "Linked in", src: "/images/footer/linkedin.svg" },
    //{ alt: "Youtube", src: "/images/footer/youtube.svg" },
  ];

  return (
    <footer className="w-full items-center gap-8 pd-default py-20 bg-[#1c1c1c] flex flex-col relative">
      <div className="flex-col max-w-screen-xl items-start gap-20 w-full flex-[0_0_auto] flex relative">
        <div className="flex-col gap-8 self-stretch w-full flex-[0_0_auto] flex items-start relative">
          <Card className="gap-32 p-12 self-stretch w-full flex-[0_0_auto] bg-[#1c1c1c] rounded-[5px] border-[#eabe30] flex items-start relative border border-solid">
            <CardContent className="flex-col md:flex-row flex items-start gap-10 relative flex-1 grow p-0">
              <img
                className="relative w-[344px] h-[296px] object-cover"
                alt="Removal"
                src="/logo_no_bg_p.png"
              />

              <div className="flex flex-col items-start gap-4 relative flex-1 grow">
                <h3 className="relative self-stretch mt-[-1.00px] font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-white text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                  Quick Links
                </h3>

                <nav className="items-start self-stretch w-full flex flex-col relative flex-[0_0_auto]">
                  {quickLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-start px-0 py-2 relative self-stretch w-full flex-[0_0_auto]"
                    >
                      <a className="relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer">
                        {link.label}
                      </a>
                    </div>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col items-start gap-4 relative flex-1 grow">
                <h3 className="self-stretch text-white relative mt-[-1.00px] font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                  Services
                </h3>

                <nav className="items-start self-stretch w-full flex flex-col relative flex-[0_0_auto]">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start px-0 py-2 relative self-stretch w-full flex-[0_0_auto]"
                    >
                      <a className="relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer">
                        {service.label}
                      </a>
                    </div>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col items-start gap-4 relative flex-1 grow">
                <h3 className="relative self-stretch mt-[-1.00px] font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-white text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                  Contact Us
                </h3>

                <div className="items-start self-stretch w-full flex flex-col relative flex-[0_0_auto]">
                  {contactInfo.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-start px-0 py-2 relative self-stretch w-full flex-[0_0_auto]"
                    >
                      <a className="relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer">
                        {contact.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex justify-between self-stretch w-full items-start relative flex-[0_0_auto] md:flex-nowrap flex-wrap gap-[1em] md:gap-0">
              <div className="inline-flex items-center gap-6 relative flex-[0_0_auto] w-full flex-wrap">
                <div className="relative w-fit mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] whitespace-nowrap [font-style:var(--text-small-normal-font-style)]">
                  © 2025 Tohanniees_Beauty. All rights reserved.
                </div>

                {footerLinks.map((link, index) => (
                  <a
                    key={index}
                    className="relative w-fit mt-[-1.00px] font-text-small-link font-[number:var(--text-small-link-font-weight)] text-white text-[length:var(--text-small-link-font-size)] tracking-[var(--text-small-link-letter-spacing)] leading-[var(--text-small-link-line-height)] underline whitespace-nowrap [font-style:var(--text-small-link-font-style)] hover:text-[#eabe30] cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
                {socialIcons.map((icon, index) => (
                  <img
                    key={index}
                    className="relative w-6 h-6 hover:opacity-80 cursor-pointer"
                    alt={icon.alt}
                    src={icon.src}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
