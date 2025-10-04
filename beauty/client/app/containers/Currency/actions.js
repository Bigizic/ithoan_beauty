/**
 * currency actions
 */


import {
    SET_CURRENCY_LOADING,
    SELECT_CURRENCY,
    TOGGLE_CURRENCY
} from "./constants";

import axios from "axios";
import { TOGGLE_BRAND } from '../Navigation/constants'
import { API_URL } from "../../constants";
const key = 'select_currency';


import handleError from '../../utils/error';

export const setCurrencyLoading = (value) => {
  return {
    type: SET_CURRENCY_LOADING,
    payload: value
  };
};

export const setSelectCurrencey = (item) => {
  // local storage set select_currency
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, item);
  }
    return {
        type: SELECT_CURRENCY,
        payload: item
    }
}

export const fetchCurrentCurrency = () => {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key)
  }
  return {
      type: SELECT_CURRENCY
  }
}

export const toogleBrand = () => {
    return {
        type: TOGGLE_BRAND,
      };
}

export const updateSelectCurrency = (item, authentication, user) => {
  // local storage update select_currency
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
    localStorage.setItem(key, item);
  }

  // user authenticated udpate currency for user
  // user is authenticated
  if (authentication.authenticated && user._id) {
    // update the currency model with the item as the currency
    axios.put(`${API_URL}/currency/edit/${user._id}`, {
      newCurrency: item,
    })
  }

    return (dispatch, getState) => {
      try {
        dispatch(setCurrencyLoading(true));
        dispatch(setSelectCurrencey([item]));
      } catch (error) {
        handleError(error, dispatch);
      } finally {
        dispatch(setCurrencyLoading(false));
      }
    };
};