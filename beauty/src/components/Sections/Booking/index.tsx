import React from "react";
import { AppointmentDetailsSection } from "./AppointmentDetails";
import { ServiceSelectionSection } from "./ServiceSelection";

export const BookingSection = () => {
  return (
    <div className="flex flex-col items-center gap-20 pd-default py-28 relative bg-[#e6e1c9]">
      <ServiceSelectionSection />
      <AppointmentDetailsSection />
    </div>
  );
};
