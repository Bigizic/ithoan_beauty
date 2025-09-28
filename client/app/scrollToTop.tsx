'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface ScrollToTopProps {
  height?: number;
  behavior?: "smooth" | "auto";
}

const ScrollToTop = (props: ScrollToTopProps) => {
  const pathname = usePathname();
  const {
    height = 0,
    behavior = "smooth"
  } = props;

  useEffect(() => {
    window.scrollTo({
      top: height,
      behavior,
    });
  }, [pathname, height, behavior]);

  return null;
};

export default ScrollToTop;