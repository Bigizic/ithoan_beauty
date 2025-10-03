import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const calendarWeeks = [
  [null, null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30],
];

const timeSlots = [
  { id: 1, time: "10:00 AM", selected: true },
  { id: 2, time: "11:30 AM", selected: false },
  { id: 3, time: "02:00 AM", selected: false },
];

export const AppointmentDetailsSection = () => {
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState(1);

  return (
    <div className="relative w-full bg-white rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040] p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-[32px] leading-[38.4px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#eabe30] tracking-[0]">
            Select service
          </h2>

          <Select defaultValue="facials">
            <SelectTrigger className="w-full h-[50px] rounded-[10px] border border-solid border-[#1c1c1c82]">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facials">Facials</SelectItem>
            </SelectContent>
          </Select>

          <div className="font-normal text-[#1c1c1c] [font-family:'Poppins',Helvetica] text-base tracking-[0] leading-6">
            Glow-restoring skincare
          </div>

          <div className="flex flex-col gap-[30px]">
            <h3 className="text-2xl leading-[28.8px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#eabe30] tracking-[0]">
              Choose Date &amp; Time
            </h3>

            <div className="flex flex-col items-center gap-4 px-2 py-4 rounded-[10px] border border-solid border-[#1c1c1c] shadow-[inset_0px_4px_4px_#00000040]">
              <div className="flex items-center justify-between w-full px-4">
                <button className="p-1" aria-label="Previous month">
                  <ChevronLeftIcon className="w-[10.09px] h-[15.63px] text-[#1c1c1c]" />
                </button>
                <div className="font-medium text-[#1c1c1c] [font-family:'Poppins',Helvetica] text-base tracking-[0] leading-6">
                  June 2025
                </div>
                <button className="p-1" aria-label="Next month">
                  <ChevronRightIcon className="w-[10.09px] h-[15.63px] text-[#1c1c1c]" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-9 w-full px-2">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={`day-${index}`}
                    className="[font-family:'Poppins',Helvetica] font-medium text-[#1c1c1c] text-base tracking-[0] leading-6 text-center"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 w-full px-2">
                {calendarWeeks.map((week, weekIndex) => (
                  <div
                    key={`week-${weekIndex}`}
                    className="grid grid-cols-7 gap-9"
                  >
                    {week.map((date, dateIndex) => (
                      <button
                        key={`date-${weekIndex}-${dateIndex}`}
                        onClick={() => date && setSelectedDate(date)}
                        className={`[font-family:'Poppins',Helvetica] font-normal text-base tracking-[0] leading-6 text-center ${
                          date === selectedDate
                            ? "text-[#eabe30]"
                            : "text-[#1c1c1c]"
                        } ${!date ? "invisible" : ""}`}
                      >
                        {date || ""}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4 mt-[164px]">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedTime(slot.id)}
                className={`px-6 py-2 rounded-[20px] overflow-hidden [font-family:'Poppins',Helvetica] font-medium text-base tracking-[0] leading-6 ${
                  selectedTime === slot.id
                    ? "bg-[#eabe30] text-white"
                    : "border border-solid border-[#1c1c1c7a] text-[#1c1c1c]"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6 mt-8">
            <h3 className="text-xl leading-[24.0px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#eabe30] tracking-[0]">
              Your Information
            </h3>

            <Input
              placeholder="Full Name"
              className="h-[42px] rounded-[5px] border border-solid border-[#1c1c1c6b] shadow-[inset_0px_4px_4px_#00000040] [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c8a] text-base"
            />

            <Input
              placeholder="Email Address"
              type="email"
              className="h-[42px] rounded-[5px] border border-solid border-[#1c1c1c6b] shadow-[inset_0px_4px_4px_#00000040] [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c8a] text-base"
            />

            <Input
              placeholder="Phone Number"
              type="tel"
              className="h-[42px] rounded-[5px] border border-solid border-[#1c1c1c6b] shadow-[inset_0px_4px_4px_#00000040] [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c8a] text-base"
            />

            <Button className="h-auto bg-[#eabe30] hover:bg-[#d4a820] text-white rounded-[5px] p-4 [font-family:'Poppins',Helvetica] font-normal text-base tracking-[0] leading-6">
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
