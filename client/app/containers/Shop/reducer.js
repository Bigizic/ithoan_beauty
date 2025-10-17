/*
 *
 * Products reducer
 *
 */

import {
  DEFAULT_ACTION,
  SEARCH_ITEM,
  RESET_SEARCH_ITEM,
  SHOP_PRODUCTS
} from './constants';

const initialState = {
  shopProducts: [],
  searchItem: ''
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOP_PRODUCTS:
      return {
        ...state,
        shopProducts: action.payload
      }
    case RESET_SEARCH_ITEM:
      return {
        ...state,
        shopProducts: [],
        searchItem: ''
      }
    case SEARCH_ITEM:
      return {
        ...state,
        searchItem: action.payload
      }
    case DEFAULT_ACTION:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default shopReducer;
