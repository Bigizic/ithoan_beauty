/*
 *
 * Homepage reducer
 *
 */

import {
  DEFAULT_ACTION,
  SET_USER_MAINTENANCE_STATUS,
  HOME_PAGE_LOADING,
  SET_USER_MAINTENANCE_TEXT,
} from './constants';

const initialState = {
  userMaintenanceStats: false,
  homePageIsLoading: false,
  maintenanceText: '',
};

const homepageReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case HOME_PAGE_LOADING:
      return {
        ...state,
        homePageIsLoading: action.payload
      };
    case SET_USER_MAINTENANCE_TEXT:
      return {
        ...state,
        maintenanceText: action.payload
      };
    case SET_USER_MAINTENANCE_STATUS:
      return {
        ...state,
        userMaintenanceStats: action.payload
      };
    case DEFAULT_ACTION:
      return newState;
    default:
      return state;
  }
};

export default homepageReducer;
