import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../../app/store";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "lucide-react";
import { LoadingIndicator } from "../../../Common/LoadingIndicator";
import { AppointmentDetailsProps } from "../../../../interface";
import { actions, ACTIONSTYPE } from "../../../../actions";

interface AppointmentDetailsState {
  currentMonth: Date;
  calendar: (Date | null)[][];
}

class AppointmentDetailsContainer extends React.PureComponent<AppointmentDetailsProps & ACTIONSTYPE, AppointmentDetailsState> {
  constructor(props: AppointmentDetailsProps & ACTIONSTYPE) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      calendar: []
    };
  }

  componentDidMount() {
    this.generateCalendar(this.state.currentMonth);
  }

  componentDidUpdate(prevProps: AppointmentDetailsProps & ACTIONSTYPE, prevState: AppointmentDetailsState) {
    if (prevState.currentMonth !== this.state.currentMonth) {
      this.generateCalendar(this.state.currentMonth);
    }

    if (this.props.selectedSubService && this.props.bookingDate) {
      if (
        prevProps.selectedSubService?._id !== this.props.selectedSubService._id ||
        prevProps.bookingDate?.toDateString() !== this.props.bookingDate.toDateString()
      ) {
        this.props.fetchAvailableTimes(this.props.selectedSubService._id, this.props.bookingDate);
      }
    }
  }

  generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(year, month, day));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    this.setState({ calendar: weeks });
  };

  handlePreviousMonth = () => {
    this.setState({
      currentMonth: new Date(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth() - 1)
    });
  };

  handleNextMonth = () => {
    this.setState({
      currentMonth: new Date(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth() + 1)
    });
  };

  isDateBooked = (date: Date) => {
    return this.props.bookedDates.some((bookedDate: any) => {
      const d = new Date(bookedDate);
      return d.toDateString() === date.toDateString();
    });
  };

  isDatePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  isDateDisabled = (date: Date) => {
    return this.isDatePast(date) || this.isDateBooked(date);
  };

  handleDateClick = (date: Date) => {
    if (!this.isDateDisabled(date)) {
      this.props.setBookingDate(date);
    }
  };

  handleTimeClick = (time: string) => {
    this.props.setBookingTime(time);
  };

  handleUserInfoChange = (field: string, value: string) => {
    this.props.setUserInfo({ [field]: value });
  };

  handleSubmit = () => {
    this.props.createBooking({
      selectedService: this.props.selectedService,
      selectedSubService: this.props.selectedSubService,
      bookingDate: this.props.bookingDate,
      bookingTime: this.props.bookingTime,
      userInfo: this.props.userInfo
    });
  };

  render() {
    const {
      selectedService,
      selectedSubService,
      bookingDate,
      bookingTime,
      availableTimes,
      loading,
      error,
      userInfo,
      bookingSuccess,
      fieldErrors
    } = this.props;

    const { calendar, currentMonth } = this.state;

    if (!selectedService || !selectedSubService) {
      return null;
    }

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      <section className="relative w-full bg-white rounded-[20px] rounded-tl-none rounded-tr-none overflow-hidden p-[24px] py-[40px] md:py-[80px] md:p-[80px]">
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <LoadingIndicator />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-[24px] md:text-[32px] leading-[38.4px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#eabe30] tracking-[0]">
              Choose Time & Date
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-full md:w-[70%] items-center gap-4 px-2 py-4 rounded-[10px] border border-solid border-[#1c1c1c]">
                <div className="flex items-center justify-between w-full px-4">
                  <button onClick={this.handlePreviousMonth} className="p-1" aria-label="Previous month">
                    <ChevronLeftIcon className="w-[10.09px] h-[15.63px] text-[#1c1c1c] stroke-[8]" />
                  </button>
                  <div className="font-medium text-[#1c1c1c] [font-family:'Poppins',Helvetica] text-base tracking-[0] leading-6">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </div>
                  <button onClick={this.handleNextMonth} className="p-1" aria-label="Next month">
                    <ChevronRightIcon className="w-[10.09px] h-[15.63px] text-[#1c1c1c] stroke-[8]" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-9 w-full px-2">
                  {daysOfWeek.map((day, index) => (
                    <div key={`day-${index}`} className="[font-family:'Poppins',Helvetica] font-medium text-[#1c1c1c] text-base tracking-[0] leading-6 text-center">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 w-full px-2">
                  {calendar.map((week, weekIndex) => (
                    <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-9">
                      {week.map((date, dateIndex) => {
                        const isSelected = date && bookingDate && date.toDateString() === bookingDate.toDateString();
                        const isDisabled = date && this.isDateDisabled(date) || false;

                        return (
                          <button
                            key={`date-${weekIndex}-${dateIndex}`}
                            onClick={() => date && this.handleDateClick(date)}
                            disabled={!date || isDisabled}
                            className={`[font-family:'Poppins',Helvetica] font-normal text-base tracking-[0] leading-6 text-center ${isSelected ? "bg-[#eabe30] rounded-full w-6 h-6 font-bold" : isDisabled ? "text-[#1c1c1c]/30 cursor-not-allowed" : "text-[#1c1c1c] hover:text-[#eabe30]"
                              } ${!date ? "invisible" : ""}`}
                          >
                            {date ? date.getDate() : ""}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {bookingDate && availableTimes.length > 0 && (
              <div>
                <h3 className="text-xl leading-[24.0px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#eabe30] tracking-[0] mb-4">
                  Available Times
                </h3>
                <div className="flex flex-wrap gap-4">
                  {availableTimes.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => this.handleTimeClick(time)}
                      className={`px-4 py-2 rounded-[20px] overflow-hidden [font-family:'Poppins',Helvetica] font-medium text-base tracking-[0] leading-6 ${bookingTime === time
                          ? "bg-[#eabe30] text-black"
                          : "border border-solid border-[#1c1c1c7a] text-[#1c1c1c] hover:border-[#eabe30]"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-6 mt-8">
              <h3 className="text-[24px] leading-[24.0px] [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[#eabe30] tracking-[0]">
                Your Information
              </h3>

              {/*<div className="bg-[#eabe30]/10 border-l-4 border-[#eabe30] p-4 rounded-r-[5px]">
                <p className="text-sm text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
                  <strong>Note:</strong> You can skip entering your details by{' '}
                  <a
                    href="https://tohannieesskincare.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#eabe30] hover:underline font-medium"
                  >
                    logging in to your Tohanniees Skincare account
                  </a>
                  . Your information will be automatically filled.
                </p>
              </div>*/}

              <div>
                <Input
                  placeholder="Full Name"
                  value={userInfo.fullName}
                  onChange={(e) => this.handleUserInfoChange('fullName', e.target.value)}
                  className="h-[42px] rounded-[5px] border border-solid border-[#1c1c1c6b] [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c] text-base"
                />
                {fieldErrors?.fullName && (
                  <p className="text-sm text-red-600 [font-family:'Poppins',Helvetica] mt-1">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => this.handleUserInfoChange('email', e.target.value)}
                  className="h-[42px] rounded-[5px] border border-solid border-[#1c1c1c6b] [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c] text-base"
                />
                {fieldErrors?.email && (
                  <p className="text-sm text-red-600 [font-family:'Poppins',Helvetica] mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={userInfo.phoneNumber}
                  onInputChange={(n, v) => this.handleUserInfoChange('phoneNumber', v)}
                  className="h-[42px] rounded-[5px] border border-solid border-[#1c1c1c6b] [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1c] text-base"
                />
                {fieldErrors?.phoneNumber && (
                  <p className="text-sm text-red-600 [font-family:'Poppins',Helvetica] mt-1">
                    {fieldErrors.phoneNumber}
                  </p>
                )}
              </div>

              <Button
                onClick={this.handleSubmit}
                disabled={loading || !bookingDate || !bookingTime}
                className="h-auto bg-[#eabe30] hover:bg-[#d4a820] text-black rounded-[5px] p-4 [font-family:'Poppins',Helvetica] font-normal text-base tracking-[0] leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
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
    fieldErrors: state.booking.fieldErrors,
    userInfo: state.booking.userInfo,
    bookingSuccess: state.booking.bookingSuccess
  };
};

export const AppointmentDetailsSection = connect(mapStateToProps, actions)(AppointmentDetailsContainer);
