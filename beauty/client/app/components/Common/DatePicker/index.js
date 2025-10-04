import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export const DateRangePickerComponent = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        if (onDateChange) {
          onDateChange(startDate, endDate);
        }
      }}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      numberOfMonths={1}
      isOutsideRange={() => false}
      startDateId="start_date"  // Add this prop
      endDateId="end_date"      // Add this prop
    />
  );
};
