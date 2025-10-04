/*
 *
 * Cart reducer
 *
 */


import {
  HANDLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  HANDLE_CART_TOTAL,
  SET_CART_ID,
  CLEAR_CART,
  SELECTED_ADDRESS,
  REMOVE_SELECTED_ADDRESS,

  HANDLE_CART_AMOUNT,
  HANDLE_SERVICE_CHARGE,
} from './constants';

const initialState = {
  cartItems: [],
  cartTotal: 0,
  serviceCharge: 0,
  cartAmount: 0,
  cartId: '',
  cartCurrency: [],
  selectedAddress: [],
};

const cartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case HANDLE_CART_AMOUNT:
      return {
        ...state,
        cartAmount: action.payload
      };
    case HANDLE_SERVICE_CHARGE:
      return {
        ...state,
        serviceCharge: action.payload
      };
    case SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload
      };

    case REMOVE_SELECTED_ADDRESS: 
      return {
        ...state,
        selectedAddress: []
      }
    case ADD_TO_CART:
      newState = {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartCurrency: action.payload.cartCurrency
      };

      return newState;
    case REMOVE_FROM_CART:
      let itemIndex = state.cartItems.findIndex(
        x => x._id == action.payload._id
      );

      newState = {
        ...state,
        cartItems: [
          ...state.cartItems.slice(0, itemIndex),
          ...state.cartItems.slice(itemIndex + 1)
        ]
      };

      return newState;
    case HANDLE_CART_TOTAL:
      newState = {
        ...state,
        cartTotal: action.payload
      };

      return newState;
    case HANDLE_CART:
      newState = {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal,
        cartId: action.payload.cartId,
        cartCurrency: action.payload.cartCurrency
      };
      return newState;
    case SET_CART_ID:
      newState = {
        ...state,
        cartId: action.payload
      };
      return newState;
    case CLEAR_CART:
      newState = {
        ...state,
        cartItems: [],
        cartTotal: 0,
        cartId: '',
        cartCurrency: [],
        selectedAddress: []
      };
      return newState;

    default:
      return state;
  }
};

export default cartReducer;
