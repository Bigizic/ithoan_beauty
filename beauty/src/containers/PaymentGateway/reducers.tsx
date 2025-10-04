import {
  SET_BOOKING_ID,
  TOGGLE_PAYMENT,
  SET_PAYMENT_RECEIPTS,
  RESET_PAYMENT_RECEIPTS,
  PAYMENT_IS_LOADING,
  PAYMENT_FORM_ERRORS,
  SET_BANK_COPIED,
  SET_PAYMENT_NOTE
} from './constants'

const initialState = {
  bookingId: '',
  isPaymentOpen: false,
  paymentReceipts: [] as File[],
  paymentIsLoading: false,
  copiedBank: '',
  formErrors: '',
  note: ''
}

type ActionProps = {
  type: string
  payload?: any
}

export default function paymentReducer(state = initialState, action: ActionProps) {
  switch (action.type) {
    case SET_PAYMENT_NOTE:
      return {
        ...state,
        note: action.payload
      }
    case SET_BANK_COPIED:
      return {
        ...state,
        copiedBank: action.payload
      }
    case PAYMENT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      }
    case PAYMENT_IS_LOADING:
      return {
        ...state,
        paymentIsLoading: action.payload
      }
    case RESET_PAYMENT_RECEIPTS:
      return {
        ...state,
        paymentReceipts: [],
        formErrors: ''
      }
    case SET_PAYMENT_RECEIPTS:
      return {
        ...state,
        paymentReceipts: action.payload
      }
    case TOGGLE_PAYMENT:
      return {
        ...state,
        isPaymentOpen: !state.isPaymentOpen
      }
    case SET_BOOKING_ID:
      return {
        ...state,
        bookingId: action.payload
      }
    default:
      return state
  }
}
