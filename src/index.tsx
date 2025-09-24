import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomeDesktop } from "./screens/HomeDesktop/HomeDesktop";
import { NavbarSection } from "./screens/HomeDesktop/sections/NavbarSection/NavbarSection";
import ScrollToTop from "./scrollToTop";
import { BrowserRouter } from "react-router-dom";
import { FooterSection } from "./screens/HomeDesktop/sections/FooterSection/FooterSection";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <NavbarSection />
      <HomeDesktop />
      <FooterSection />
    </BrowserRouter>
  </StrictMode>,
);
