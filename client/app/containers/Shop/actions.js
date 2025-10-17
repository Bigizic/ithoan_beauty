/*
 *
 * Shop actions
 *
 */

import axios from 'axios';
import handleError from '@/utils/error';
import { API_URL } from '@/constants';
import {
  DEFAULT_ACTION,
  SEARCH_ITEM,
  RESET_SEARCH_ITEM,
  SHOP_PRODUCTS
} from './constants';

//export const 

export const onShopSuggestionsFetchRequested = (value) => {
  const inputValue = value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue && inputValue.length % 3 === 0) {
        const response = await axios.get(
          `${API_URL}/product/list/search/${inputValue}`
        );
        dispatch({
          type: SHOP_PRODUCTS,
          payload: response.data.products
        })
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const onShopSuggestionsClearRequested = () => {
  return {
    type: RESET_SEARCH_ITEM
  };
};

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
};

export const setSearchTerm = (v) => {
  return {
    type: SEARCH_ITEM,
    payload: v
  }
}

export const resetSearchItem = () => {
  return {
    type: RESET_SEARCH_ITEM
  }
}
