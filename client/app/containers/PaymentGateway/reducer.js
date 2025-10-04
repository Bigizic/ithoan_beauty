/**
 * Payment Gate way reducer
 */

import {
  SET_PAY_ORDER_CREDENTIALS,
  SET_ORDER_ID,

  TOGGLE_ORDER,
  SET_ORDER_RECEIPTS,
  RESET_ORDER_RECEIPTS,

  ORDER_PAYMENT_IS_LOADING,
  ORDER_FORM_ERRORS,
  SET_BANK_COPIED,
  ORDER_PAYMENT_HELPER,

  SET_ORDER_NOTE,
} from './constants'


const initialState = {
  orderId: '',
  isOrderOpen: false,
  orderReceipts: [],

  orderIsLoading: false,
  copiedBank: '',
  formErrors: '',
  orderPaymentHelper: null,
  note: null,
}


const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_NOTE:
      return {
        ...state,
        note: action.payload
      };
    case ORDER_PAYMENT_HELPER:
      return {
        ...state,
        orderPaymentHelper: action.payload
      };
    case SET_BANK_COPIED:
      return {
        ...state,
        copiedBank: action.payload
      };
    case ORDER_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      }
    case ORDER_PAYMENT_IS_LOADING:
      return {
        ...state,
        orderIsLoading: action.payload,
      };
    case RESET_ORDER_RECEIPTS:
      return {
        ...state,
        orderReceipts: [],
        formErrors: ''  // also reset form errors
      }
    case SET_ORDER_RECEIPTS:
      return {
        ...state,
        orderReceipts: action.payload,
      }
    case TOGGLE_ORDER:
      return {
        ...state,
        isOrderOpen: !state.isOrderOpen,
      }
    case SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      }
    case SET_PAY_ORDER_CREDENTIALS:
      return {
        ...state,
        orderCredentials: action.payload,
      }
    default:
        return state;
  }
}

export default paymentReducer;
