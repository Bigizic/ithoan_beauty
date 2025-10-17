import { ChevronDownIcon } from "lucide-react"
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "../../ui/navigation-menu"
import { Link, useNavigate } from "react-router-dom"
import HyperLink from "../../Common/HyperLink"

type DropdownItem = {
  name: string
  slug: string
}

type NavigationItem = {
  name: string
  slug: string
  hasDropdown?: boolean
  dropdownItems?: DropdownItem[]
}

interface NavProps {
  navigationItems: NavigationItem[]
}

export const Nav = ({ navigationItems }: NavProps) => {
  const navigate = useNavigate()
  return (
    <div className="text-[#e6e1c9] flex items-center gap-6 lg:gap-8">
      {navigationItems.map((item, index) =>
        item.hasDropdown ? (
          <NavigationMenuItem key={index} className="relative">
            <div className="nav-dropdown flex items-center gap-1 cursor-pointer text-[#e6e1c9] hover:text-white">
              {item.name}
              {/* chevron with animation */}
              <ChevronDownIcon className="w-2 h-2 lg:w-4 lg:h-4 transform transition-transform duration-200 nav-dropdown-chev-hover" />

              {/* dropdown */}
              <div className="absolute left-0 top-full mt-0 w-40 bg-[#1c1c1c] shadow-lg rounded-md invisible nav-dropdown-hover transition-opacity duration-200">
                {item.dropdownItems?.map((drop, i) => (
                  <HyperLink
                    key={i}
                    to={item.name.toLowerCase() + '/' + drop.slug}
                    className="block px-4 py-2 text-sm text-[#e6e1c9] hover:text-white hover:bg-[#2a2a2a]"
                    text={drop.name}
                    onClick={() => navigate(drop.slug)}
                  />
                ))}
                <HyperLink
                  to={'/services'}
                  text={"View All"}
                  className="block px-4 py-2 text-sm text-[#e6e1c9] hover:text-white hover:bg-[#2a2a2a]"
                  onClick={() => {
                    navigate('/services')
                  }}
                />
              </div>
            </div>
          </NavigationMenuItem>
        ) : (
          <HyperLink
            key={index}
            to={item.slug}
            target={item.name === "Locate Us" ? "_blank" : "_self"}
            text={item.name}
            onClick={() => navigate(item.slug)}
            className="flex items-center gap-1 font-text-regular-normal text-[#e6e1c9] hover:text-white transition-colors"
          />
        )
      )}
    </div>
  )
}
