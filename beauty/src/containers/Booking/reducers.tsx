import {
  SET_SELECTED_SERVICE,
  SET_SELECTED_SUBSERVICE,
  SET_BOOKING_DATE,
  SET_BOOKING_TIME,
  FETCH_AVAILABLE_TIMES,
  CREATE_BOOKING,
  BOOKING_LOADING,
  SET_BOOKING_ERROR,
  CLEAR_BOOKING_ERROR,
  SET_USER_INFO,
  SET_FIELD_ERROR,
  CLEAR_FIELD_ERROR,
  RESET_BOOKING,
  FETCH_BANKS,
} from './constants'

const initialState = {
  loading: false,
  selectedService: null as any,
  selectedSubService: null as any,
  bookingDate: null as Date | null,
  bookingTime: null as string | null,
  availableTimes: [] as string[],
  bookedDates: [] as any[],
  error: null as string | null,
  fieldErrors: {} as Record<string, string>,
  userInfo: {
    fullName: '',
    email: '',
    phoneNumber: ''
  },
  bookingSuccess: false,
  bookingData: null as any,
  banks: [] as any[]
}

type actionProps = {
  type: string
  payload?: any
}

export default function bookingReducer(state = initialState, action: actionProps) {
  switch (action.type) {
    case BOOKING_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case SET_SELECTED_SERVICE:
      return {
        ...state,
        selectedService: action.payload,
        selectedSubService: null,
        error: null
      }
    case SET_SELECTED_SUBSERVICE:
      return {
        ...state,
        selectedSubService: action.payload,
        error: null
      }
    case SET_BOOKING_DATE:
      return {
        ...state,
        bookingDate: action.payload,
        bookingTime: null,
        error: null
      }
    case SET_BOOKING_TIME:
      return {
        ...state,
        bookingTime: action.payload,
        error: null
      }
    case FETCH_AVAILABLE_TIMES:
      return {
        ...state,
        availableTimes: action.payload.availableTimes,
        loading: false
      }
    case SET_BOOKING_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CLEAR_BOOKING_ERROR:
      return {
        ...state,
        error: null
      }
    case SET_FIELD_ERROR:
      return {
        ...state,
        fieldErrors: {
          ...state.fieldErrors,
          [action.payload.field]: action.payload.error
        }
      }
    case CLEAR_FIELD_ERROR:
      const newFieldErrors = { ...state.fieldErrors }
      delete newFieldErrors[action.payload]
      return {
        ...state,
        fieldErrors: newFieldErrors
      }
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload
        }
      }
    case CREATE_BOOKING:
      return {
        ...state,
        bookingSuccess: true,
        bookingData: action.payload,
        loading: false
      }
    case FETCH_BANKS:
      return {
        ...state,
        banks: action.payload
      }
    case RESET_BOOKING:
      return initialState
    default:
      return state
  }
}
