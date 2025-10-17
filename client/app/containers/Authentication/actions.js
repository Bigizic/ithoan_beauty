/*
 *
 * Authentication actions
 *
 */

import { SET_AUTH, CLEAR_AUTH, SET_IS_LOADING } from './constants';

export const
  setAuth = () => {
    return {
      type: SET_AUTH
    };
  };

export const authIsLoading = (v) => {
  return {
    type: SET_IS_LOADING,
    payload: v
  }
}

export const clearAuth = () => {
  return {
    type: CLEAR_AUTH
  };
};
