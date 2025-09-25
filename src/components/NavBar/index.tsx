import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const NavbarSection = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Services", href: "#", hasDropdown: true },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-center px-4 md:px-16 py-0 bg-[#1c1c1c]">
      <div className="flex items-center justify-between w-full max-w-screen-xl h-[72px]">
        <div className="flex w-20 h-10 items-center justify-center">
          <img
            className="w-[45px] h-10 object-cover md:w-[55px] md:h-12"
            alt="logo"
            src="/logo_no_bg_p.png"
          />
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-6 lg:gap-8">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.href}
                  className="flex items-center gap-1 font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#e6e1c9] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] hover:text-white transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDownIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center justify-center">
          <Button className="h-auto px-4 py-2 md:px-5 bg-[#eabe30] hover:bg-[#d4a829] text-black font-text-regular-normal rounded-[5px] border border-transparent">
            Reservation
          </Button>
        </div>

        <button
          className="md:hidden text-[#e6e1c9]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-[#1c1c1c] px-4 py-4 flex flex-col space-y-4 md:hidden z-40">
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
