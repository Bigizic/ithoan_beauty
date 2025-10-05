import {
  FETCH_BOOKINGS,
  FETCH_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  SET_BOOKINGS_LOADING,
  CLEAR_BOOKINGS,
  SET_BOOKING_FORM_DATA,
  CLEAR_BOOKING_FORM_DATA
} from './constants';

const initialState = {
  bookings: [],
  booking: null,
  isLoading: false,
  totalPages: 1,
  currentPage: 1,
  totalBookings: 0,
  formData: {
    serviceId: '',
    subServiceId: '',
    bookingDate: '',
    bookingTime: '',
    status: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    note: ''
  }
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS:
      return {
        ...state,
        bookings: action.payload.bookings,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        totalBookings: action.payload.totalBookings
      };
    case FETCH_BOOKING:
      return {
        ...state,
        booking: action.payload
      };
    case UPDATE_BOOKING:
      return {
        ...state,
        booking: action.payload,
        bookings: state.bookings.map(booking =>
          booking._id === action.payload._id ? action.payload : booking
        )
      };
    case DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking._id !== action.payload)
      };
    case SET_BOOKINGS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_BOOKING_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    case CLEAR_BOOKING_FORM_DATA:
      return {
        ...state,
        formData: initialState.formData
      };
    case CLEAR_BOOKINGS:
      return {
        ...state,
        bookings: []
      };
    default:
      return state;
  }
};

export default bookingReducer;
