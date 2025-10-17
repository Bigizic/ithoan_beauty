import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "./nav";
import HyperLink from "../../Common/HyperLink";
import { SERVICESMENU } from "../../../types";
import { ACTIONSTYPE } from "../../../actions";
import SearchModal from "../../Common/Search";

interface HeaderProps {
  services: SERVICESMENU[],
  isSearchOpen: boolean
}

export const Header = (props: (HeaderProps & ACTIONSTYPE)) => {
  const { toogleSearch, isSearchOpen, services = [] } = props;
  const servicesSliced = services
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate()

  const navigationItems = [
    { name: "About Us", slug: "/about" },
    { name: "Locate Us", slug: "https://maps.google.com/?q=Tohanniees+Beauty" },
    {
      name: "Services",
      slug: "",
      hasDropdown: true,
      dropdownItems: servicesSliced,
    },
    { name: "Our Policy", slug: "/policy" },
  ];

  const toggleDropdown = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-center pd-default py-0 bg-[#1c1c1c]">
      <div className="flex items-center justify-between w-full max-w-screen-xl h-[72px]">
        {/* logo */}
        <Link to={"/"} className="hidden md:flex">
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

        <Link to={"/"} className="flex md:hidden"
          onClick={() => setMobileOpen(false)}
        >
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
        <div className="hidden md:flex items-center justify-center gap-6">
          <Button
            onClick={() => toogleSearch(true)}
            className="h-auto font-medium px-4 py-2 md:px-5 bg-[#eabe30] hover:bg-[#d4a829] text-black font-text-regular-normal rounded-[5px] border border-transparent"
          >
            Search Services
          </Button>
          <Button
            onClick={() => navigate(`/booking`)}
            className="h-auto px-4 py-2 md:px-5 bg-[#eabe30] hover:bg-[#d4a829] text-black font-text-regular-normal rounded-[5px] border border-transparent"
          >
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
        <div className="absolute top-[72px] text-[#e6e1c9] left-0 w-full bg-[#1c1c1c] pd-default py-4 flex flex-col space-y-4 md:hidden z-40">
          {navigationItems.map((item, index) => {
            if (item.hasDropdown) {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="flex flex-col gap-1">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-1 text-[#e6e1c9] hover:text-white transition-colors font-text-regular-normal"
                  >
                    {item.name}
                    <ChevronDownIcon
                      className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-0 w-40 bg-[#1c1c1c] shadow-lg rounded-md transition-all duration-200">
                      {item.dropdownItems?.map((drop, i) => (
                        <HyperLink
                          key={i}
                          to={item.name.toLowerCase() + '/' + drop.slug}
                          className="block px-4 py-2 text-sm text-[#e6e1c9] hover:text-white hover:bg-[#2a2a2a]"
                          text={drop.name}
                          onClick={() => {
                            setMobileOpen(false)
                            toggleDropdown(index)
                            navigate(drop.slug)
                          }}
                        />
                      ))}
                      <HyperLink
                        to={'/services'}
                        text={"View All"}
                        className="block px-4 py-2 text-sm text-[#e6e1c9] hover:text-white hover:bg-[#2a2a2a]"
                        onClick={() => {
                          setMobileOpen(false)
                          toggleDropdown(index)
                          navigate('/services')
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <HyperLink
                  key={index}
                  to={item.slug}
                  target={item.name === "Locate Us" ? "_blank" : "_parent"}
                  className="text-[#e6e1c9] hover:text-white transition-colors font-text-regular-normal"
                  text={item.name}
                  onClick={() => {
                    setMobileOpen(false)
                    navigate(item.slug)
                  }}
                >
                </HyperLink>
              );
            }
          })}
          <Button
            onClick={() => toogleSearch(true)}
            className="h-auto font-medium px-4 py-2 md:px-5 bg-[#eabe30] hover:bg-[#d4a829] text-black font-text-regular-normal rounded-[5px] border border-transparent"
          >
            Search Services
          </Button>
          <Button
            onClick={() => {
              setMobileOpen(false)
              navigate(`/booking`)
            }}
            className="w-full bg-[#eabe30] hover:bg-[#d4a829] text-black rounded-[5px] border border-transparent"
          >
            Reservation
          </Button>
        </div>
      )}

      {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => toogleSearch(false)} />}
    </nav>
  );
};
