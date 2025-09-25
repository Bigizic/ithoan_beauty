'use client';

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export const FooterSection = (): JSX.Element => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const services = [
    { label: "Waxing", href: "/services" },
    { label: "Facials", href: "/services" },
    { label: "Pedicure", href: "/services" },
    { label: "Massage", href: "/services" },
    { label: "Body Polish", href: "/services" },
    { label: "Lashes", href: "/services" },
  ];

  const contactInfo = [
    { label: "Address", href: "#" },
    { label: "Phone", href: "#" },
    { label: "Email", href: "#" },
    { label: "Promotions", href: "#" },
  ];

  const footerLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Settings", href: "#" },
  ];

  const socialIcons = [
    { alt: "Instagram", src: "/images/footer/instagram.svg", href: "#" },
  ];

  return (
    <footer className="w-full items-center gap-8 pd-default py-20 bg-[#1c1c1c] flex flex-col relative">
      <div className="flex-col max-w-screen-xl items-start gap-20 w-full flex-[0_0_auto] flex relative">
        <div className="flex-col gap-8 self-stretch w-full flex-[0_0_auto] flex items-start relative">
          <Card className="gap-32 p-12 self-stretch w-full flex-[0_0_auto] bg-[#1c1c1c] rounded-[5px] border-[#eabe30] flex items-start relative border border-solid">
            <CardContent className="flex-col md:flex-row flex items-start gap-10 relative flex-1 grow p-0">
              <Link href="/">
                <img
                  className="relative w-[344px] h-[296px] object-cover"
                  alt="Tohanniees Beauty Logo"
                  src="/logo_no_bg_p.png"
                />
              </Link>

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
                      <Link 
                        href={link.href}
                        className="relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer"
                      >
                        {link.label}
                      </Link>
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
                      <Link 
                        href={service.href}
                        className="relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer"
                      >
                        {service.label}
                      </Link>
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
                      <Link 
                        href={contact.href}
                        className="relative flex-1 mt-[-1.00px] font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-white text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)] hover:text-[#eabe30] cursor-pointer"
                      >
                        {contact.label}
                      </Link>
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
                  <Link
                    key={index}
                    href={link.href}
                    className="relative w-fit mt-[-1.00px] font-text-small-link font-[number:var(--text-small-link-font-weight)] text-white text-[length:var(--text-small-link-font-size)] tracking-[var(--text-small-link-letter-spacing)] leading-[var(--text-small-link-line-height)] underline whitespace-nowrap [font-style:var(--text-small-link-font-style)] hover:text-[#eabe30] cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
                {socialIcons.map((icon, index) => (
                  <Link key={index} href={icon.href}>
                    <img
                      className="relative w-6 h-6 hover:opacity-80 cursor-pointer"
                      alt={icon.alt}
                      src={icon.src}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};