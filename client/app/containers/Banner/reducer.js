/*
 *
 * Banner reducer
 *
 */

import {
  FETCH_BANNER,
  SET_BANNER_LOADING,
  ADD_BANNER,
  SET_BANNER_FORM_ERRORS,
  RESET_BANNER,
  BANNER_CHANGE,
  REMOVE_BANNER,
  FETCH_HOME_BANNER,
} from './constants';

const initialState = {
  banners: [],
  homeBanners: [],
  isLoading: false,
  bannerFormData: {
    image: {},
    isActive: false,
    isDefault: false,
  },
  formErrors: {},
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANNER:
      return {
        ...state,
        banners: action.payload
      };
    case FETCH_HOME_BANNER:
      return {
        ...state,
        homeBanners: action.payload
      };
    case SET_BANNER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ADD_BANNER:
      return {
        ...state,
        banners: [...state.banners, action.payload]
      };
    case BANNER_CHANGE:
      return {
        ...state,
        bannerFormData: {
          ...state.bannerFormData,
          ...action.payload
        }
      };
    case SET_BANNER_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case RESET_BANNER:
      return {
        ...state,
        bannerFormData: {
          image: {},
          isActive: false,
          isDefault: false,
        },
      };
    case REMOVE_BANNER:
    const index = state.banners.findIndex(b => b._id === action.payload);
    return {
      ...state,
      banners: [
        ...state.banners.slice(0, index),
        ...state.banners.slice(index + 1)
      ]
    };
    default:
      return state;
  };
};

export default bannerReducer;
