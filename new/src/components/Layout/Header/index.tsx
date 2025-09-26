import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Nav } from "./nav";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const servicesMenu = [
    { label: "Facials", href: "/services/facials" },
    { label: "Massage", href: "/services/massage" },
    { label: "Lashes", href: "/services/lashes" },
    { label: "Body Polish", href: "/services/body-polish" },
    { label: "Pedicure Treatment", href: "/services/pedicure-treatment" },
    { label: "View All", href: "/services" },
  ];

  const navigationItems = [
    { label: "About Us", href: "/about" },
    { label: "Locate Us", href: "/locate" },
    {
      label: "Services",
      href: "",
      hasDropdown: true,
      dropdownItems: servicesMenu,
    },
    { label: "Our Policy", href: "/policy" },
  ];

  const toggleDropdown = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-center pd-default py-0 bg-[#1c1c1c]">
      <div className="flex items-center justify-between w-full max-w-screen-xl h-[72px]">
        {/* logo */}
        <Link to={"/"}>
          <div className="flex w-fit h-10 justify-center flex-row items-center">
            <img
              className="w-[45px] h-10 object-cover md:w-[55px] md:h-12"
              alt="logo"
              src="/logo_no_bg_p.png"
            />
            <p className="text-other font-alex-brush text-[20px] -tracking-tight">
              Tohanniees Beauty
            </p>
          </div>
        </Link>

        {/* desktop nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-6 lg:gap-8">
            <Nav navigationItems={navigationItems} />
          </NavigationMenuList>
        </NavigationMenu>

        {/* reservation button (desktop) */}
        <div className="hidden md:flex items-center justify-center">
          <Button className="h-auto px-4 py-2 md:px-5 bg-[#eabe30] hover:bg-[#d4a829] text-black font-text-regular-normal rounded-[5px] border border-transparent">
            Reservation
          </Button>
        </div>

        {/* mobile toggle */}
        <button
          className="md:hidden text-[#e6e1c9] relative w-6 h-6"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <XIcon className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <MenuIcon className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-[#1c1c1c] pd-default py-4 flex flex-col space-y-4 md:hidden z-40">
          {navigationItems.map((item, index) => {
            if (item.hasDropdown) {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="flex flex-col gap-1">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-1 text-[#e6e1c9] hover:text-white transition-colors font-text-regular-normal"
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-0 w-40 bg-[#1c1c1c] shadow-lg rounded-md transition-all duration-200">
                      {item.dropdownItems?.map((drop, i) => (
                        <a
                          key={i}
                          href={drop.href}
                          className="block px-4 py-2 text-sm text-[#e6e1c9] hover:text-white hover:bg-[#2a2a2a]"
                        >
                          {drop.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <a
                  key={index}
                  href={item.href}
                  className="text-[#e6e1c9] hover:text-white transition-colors font-text-regular-normal"
                >
                  {item.label}
                </a>
              );
            }
          })}
          <Button className="w-full bg-[#eabe30] hover:bg-[#d4a829] text-black rounded-[5px] border border-transparent">
            Reservation
          </Button>
        </div>
      )}
    </nav>
  );
};
