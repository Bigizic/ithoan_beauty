import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { BookingSection } from "../../components/Sections/Booking";
import { actions, ACTIONSTYPE } from "../../actions";
import { RootState } from "../../../app/store";
import { BookingProps } from "../../interface";
import BookingSuccess from "../BookingSuccess";

class Booking extends React.PureComponent<BookingProps & ACTIONSTYPE> {
  render() {
    return (
      <>
        <Routes>
          <Route path="" index element={<BookingSection />} />
          <Route path="success/:bookingId" element={<BookingSuccess />} />
        </Routes>
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    selectedService: state.booking.selectedService,
    selectedSubService: state.booking.selectedSubService,
    bookingDate: state.booking.bookingDate,
    bookingTime: state.booking.bookingTime,
    availableTimes: state.booking.availableTimes,
    bookedDates: state.booking.bookedDates,
    loading: state.booking.loading,
    error: state.booking.error,
    userInfo: state.booking.userInfo,
    bookingSuccess: state.booking.bookingSuccess,
    services: state.service.services
  };
};

export default connect(mapStateToProps, actions)(Booking);
