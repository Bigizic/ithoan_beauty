/*
 *
 * Navigation actions
 *
 */

import axios from 'axios';
import handleError from '../../utils/error';
import {
  TOGGLE_MENU,
  TOGGLE_CART,
  TOGGLE_BRAND,
  SEARCH_CHANGE,
  SUGGESTIONS_FETCH_REQUEST,
  SUGGESTIONS_CLEAR_REQUEST,

  RELATED_PRODUCTS_SUGGESTIONS_FETCH,
  SET_WEBSITE_INFO,
  TOGGLE_SEARCH_ICON
} from './constants';
import { API_URL } from '../../constants';
import { getMaintenanceStats } from '../Homepage/actions';

export const setWebsiteInfo = (message, status) => {
  return (dispatch) => {
    dispatch({
      type: SET_WEBSITE_INFO,
      payload: message,
      websiteInfoStatus: status
    })
  }
}
export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
};

export const toggleCart = () => {
  return {
    type: TOGGLE_CART
  };
};

export const toggleBrand = () => {
  return {
    type: TOGGLE_BRAND
  };
};

export const onSearch = v => {
  return {
    type: SEARCH_CHANGE,
    payload: v
  };
};

export const setShowSearch = (v) => {
  return {
    type: TOGGLE_SEARCH_ICON,
    payload: v
  }
}

export const handleWebsiteInfo = () => {
  return async (dispatch) => {
    try {
      const response  = await axios.get(`${API_URL}/setting/user`);
      if (response.status === 200) {
        const infoMessage = response.data.setting[0].websiteInfo
        const status = response.data.setting[0].websiteInfoStatus
        if (infoMessage) {
          dispatch(setWebsiteInfo(infoMessage, status));
        }
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  }
}

export const onSuggestionsFetchRequested = (value, change=false) => {
  const inputValue = value.value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue && inputValue.length % 3 === 0) {
        const response = await axios.get(
          `${API_URL}/product/list/search/${inputValue}`
        );
        if (change) {
          dispatch({
            type: RELATED_PRODUCTS_SUGGESTIONS_FETCH,
            payload: response.data.products
          })
        } else {
          dispatch({
            type: SUGGESTIONS_FETCH_REQUEST,
            payload: response.data.products
          });
        }
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const onSuggestionsClearRequested = () => {
  return {
    type: SUGGESTIONS_CLEAR_REQUEST,
    payload: []
  };
};
