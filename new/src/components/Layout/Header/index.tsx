import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesMenu = [
    { label: "Facials", href: "/services/facials" },
    { label: "Massage", href: "/services/massage" },
    { label: "Lashes", href: "/services/lashes" },
    { label: "Body Polish", href: "/services/body-polish" },
    { label: "Pedicure Treatment", href: "/services/pedicure-treatment" },
    { label: "View All", href: "/services" },
  ]

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Locate Us", href: "/locate" },
    {
      label: "Services",
      hasDropdown: true,
      dropdownItems: servicesMenu
    },
  ]

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-center pd-default py-0 bg-[#1c1c1c]">
      <div className="flex items-center justify-between w-full max-w-screen-xl h-[72px]">
        {/* logo */}
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

        {/* desktop nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-6 lg:gap-8">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem
                key={index}
                className={`relative ${item.hasDropdown ? "group" : ""}`}
              >
                {item.hasDropdown ? (
                  <div className="flex items-center gap-1 cursor-pointer text-[#e6e1c9] hover:text-white">
                    {item.label}
                    <ChevronDownIcon className="w-2 h-2 lg:w-4 lg:h-4" />
                  </div>
                ) : (
                  <NavigationMenuLink
                    href={item.href}
                    className="flex items-center gap-1 font-text-regular-normal text-[#e6e1c9] hover:text-white transition-colors"
                  >
                    {item.label}
                  </NavigationMenuLink>
                )}

                {item.hasDropdown && (
                  <div className="absolute left-0 mt-0 w-40 bg-[#1c1c1c] shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
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
              </NavigationMenuItem>
            ))}
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
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-[#e6e1c9] hover:text-white transition-colors font-text-regular-normal"
            >
              {item.label}
            </a>
          ))}
          <Button className="w-full bg-[#eabe30] hover:bg-[#d4a829] text-black rounded-[5px] border border-transparent">
            Reservation
          </Button>
        </div>
      )}
    </nav>
  );
};
