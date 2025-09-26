import { ChevronDownIcon } from "lucide-react"
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "../../ui/navigation-menu"

type DropdownItem = {
  label: string
  href: string
}

type NavigationItem = {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: DropdownItem[]
}

interface NavProps {
  navigationItems: NavigationItem[]
}

export const Nav = ({ navigationItems }: NavProps) => {
  return (
    <>
      {navigationItems.map((item, index) =>
        item.hasDropdown ? (
          <NavigationMenuItem key={index} className="relative">
            <div className="nav-dropdown flex items-center gap-1 cursor-pointer text-[#e6e1c9] hover:text-white">
              {item.label}
              {/* chevron with animation */}
              <ChevronDownIcon className="w-2 h-2 lg:w-4 lg:h-4 transform transition-transform duration-200 nav-dropdown-chev-hover" />

              {/* dropdown */}
              <div className="absolute left-0 top-full mt-0 w-40 bg-[#1c1c1c] shadow-lg rounded-md invisible nav-dropdown-hover transition-opacity duration-200">
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
            </div>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuLink
            key={index}
            href={item.href}
            className="flex items-center gap-1 font-text-regular-normal text-[#e6e1c9] hover:text-white transition-colors"
          >
            {item.label}
          </NavigationMenuLink>
        )
      )}
    </>
  )
}
