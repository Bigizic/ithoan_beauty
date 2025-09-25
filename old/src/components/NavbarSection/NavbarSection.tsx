import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export const NavbarSection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Services", href: "#", hasDropdown: true },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#1c1c1c]">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto px-4 md:px-16 h-[72px]">
        {/* logo */}
        <div className="flex w-20 h-10 items-center justify-center">
          <img
            className="w-[45px] h-10 md:w-[55px] md:h-12 object-cover"
            alt="logo"
            src="/logo_no_bg_p.png"
          />
        </div>

        {/* desktop nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-8">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.href}
                  className="flex items-center gap-1 font-text-regular-normal text-[#e6e1c9] hover:text-white transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDownIcon className="w-5 h-5" />}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* desktop button */}
        <div className="hidden md:flex items-center justify-center">
          <Button className="h-auto px-5 py-2 bg-[#eabe30] hover:bg-[#d4a829] text-black font-text-regular-normal rounded-[5px] border border-transparent">
            Reservation
          </Button>
        </div>

        {/* mobile toggle button */}
        <button
          className="md:hidden text-[#e6e1c9]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1c1c1c] px-4 py-4 flex flex-col space-y-4 border-t border-[#333]">
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
