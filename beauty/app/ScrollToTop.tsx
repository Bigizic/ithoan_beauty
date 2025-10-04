'use client';

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  height?: number;
  behavior?: "smooth" | "auto";
}

const ScrollToTop = (props: ScrollToTopProps) => {
  const location = useLocation();
  const {
    height = -100,
    behavior = "smooth"
  } = props;

  useEffect(() => {
    window.scrollTo({
      top: height,
      behavior,
    });
  }, [location, height, behavior]);

  return null;
};

export default ScrollToTop;