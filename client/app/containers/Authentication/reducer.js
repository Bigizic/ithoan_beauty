/*
 *
 * Authentication reducer
 *
 */

import { SET_AUTH, CLEAR_AUTH, SET_IS_LOADING } from './constants';

const initialState = {
  authenticated: false,
  isLoading: false
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_AUTH:
      return {
        ...state,
        authenticated: true
      };
    case CLEAR_AUTH:
      return {
        ...state,
        authenticated: false
      };
    default:
      return state;
  }
};

export default authenticationReducer;
