import {
  SELECT_CURRENCY,
  ALL_CURRENCY,
  SET_CURRENCY_LOADING,
  TOGGLE_CURRENCY
} from './constants';

// local storage select_currency fetch
const sC = localStorage.getItem('select_currency');

const initialState = {
  select_currency: sC ? [sC] : [],
  all_currency: {
    //usd: '$',
    ngn: '₦',
    //gbp: '£',
  },
  default_currency: ['ngn'],
  isLoading: false,
  isCurrencyOpen: false,

};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CURRENCY:
      return {
        ...state,
        isCurrencyOpen: !state.isCurrencyOpen
      };
    case SELECT_CURRENCY:
      return {
        ...state,
        select_currency: action.payload
      }
    case ALL_CURRENCY:
      return {
        ...state,
        all_currency: action.payload
      }
    case SET_CURRENCY_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default currencyReducer;
