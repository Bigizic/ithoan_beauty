/*
 *
 * Navigation reducer
 *
 */

import {
  TOGGLE_MENU,
  TOGGLE_CART,
  TOGGLE_BRAND,
  SEARCH_CHANGE,
  SUGGESTIONS_FETCH_REQUEST,
  SUGGESTIONS_CLEAR_REQUEST,

  RELATED_PRODUCTS_SUGGESTIONS_FETCH,
  SET_WEBSITE_INFO,
  SET_WEBSITE_INFO_RENDER,
  TOGGLE_SEARCH_ICON
} from './constants';

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
  isBrandOpen: false,
  showSearch: false,
  searchValue: '',
  searchSuggestions: [],
  relatedProducts: [],
  websiteInfo: '',
  websiteInfoStatus: false,
  websiteInfoStatusRender: false,
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH_ICON:
      return {
        ...state,
        showSearch: action.payload
      };
    case SET_WEBSITE_INFO_RENDER:
      return {
        ...state,
        websiteInfoStatusRender: action.payload
      };
    case SET_WEBSITE_INFO:
      return {
        ...state,
        websiteInfo: action.payload,
        websiteInfoStatus: action.websiteInfoStatus
      };
    case RELATED_PRODUCTS_SUGGESTIONS_FETCH:
      return {
        ...state,
        relatedProducts: action.payload
      };
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        isCartOpen: false
      };
    case TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
        isMenuOpen: false
      };
    case TOGGLE_BRAND:
      return {
        ...state,
        isBrandOpen: !state.isBrandOpen
      };
    case SEARCH_CHANGE:
      return {
        ...state,
        searchValue: action.payload
      };
    case SUGGESTIONS_FETCH_REQUEST:
      return {
        ...state,
        searchSuggestions: action.payload
      };
    case SUGGESTIONS_CLEAR_REQUEST:
      return {
        ...state,
        searchSuggestions: action.payload
      };
    default:
      return state;
  }
};

export default navigationReducer;
