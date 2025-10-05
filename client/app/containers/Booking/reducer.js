/*
 *
 * Booking reducer
 *
 */

import {
  FETCH_BOOKINGS,
  FETCH_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  SET_BOOKING_LOADING,
  SET_BOOKING_FILTERS,
  CLEAR_BOOKINGS,
  BOOKING_FORM_CHANGE,
  BOOKING_FORM_RESET,
  SET_BOOKING_FORM_ERRORS
} from './constants';

const initialState = {
  bookings: [],
  booking: null,
  bookingFormData: {
    _id: '',
    serviceId: '',
    subServiceId: '',
    bookingDate: '',
    bookingTime: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    status: 'pending',
    note: ''
  },
  formErrors: {},
  isLoading: false,
  totalPages: 1,
  currentPage: 1,
  totalBookings: 0
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS:
      return {
        ...state,
        bookings: action.payload
      };
    case FETCH_BOOKING:
      return {
        ...state,
        booking: action.payload,
        bookingFormData: {
          _id: action.payload._id,
          serviceId: action.payload.serviceId?._id || '',
          subServiceId: action.payload.subServiceId?._id || '',
          bookingDate: action.payload.bookingDate || '',
          bookingTime: action.payload.bookingTime || '',
          fullName: action.payload.customerInfo?.fullName || '',
          email: action.payload.customerInfo?.email || '',
          phoneNumber: action.payload.customerInfo?.phoneNumber || '',
          status: action.payload.status || 'pending',
          note: action.payload.note || ''
        }
      };
    case UPDATE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking._id === action.payload._id ? action.payload : booking
        ),
        booking: action.payload
      };
    case DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking._id !== action.payload)
      };
    case SET_BOOKING_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_BOOKING_FILTERS:
      return {
        ...state,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        totalBookings: action.payload.totalBookings
      };
    case CLEAR_BOOKINGS:
      return {
        ...state,
        bookings: []
      };
    case BOOKING_FORM_CHANGE:
      return {
        ...state,
        bookingFormData: {
          ...state.bookingFormData,
          [action.payload.name]: action.payload.value
        }
      };
    case BOOKING_FORM_RESET:
      return {
        ...state,
        bookingFormData: initialState.bookingFormData,
        formErrors: {}
      };
    case SET_BOOKING_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    default:
      return state;
  }
};

export default bookingReducer;
