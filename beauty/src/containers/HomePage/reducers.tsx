/*
 *
 * Homepage reducer
 *
 */

import { ACTIONPROPS } from '../../types';
import {
  DEFAULT_ACTION,
  SET_USER_MAINTENANCE_STATUS,
  HOME_PAGE_LOADING,
  SET_USER_MAINTENANCE_TEXT,
  TOOGLE_HEADER_SEARCH
} from './constants';

const initialState = {
  userMaintenanceStats: false as boolean,
  homePageIsLoading: false as boolean,
  maintenanceText: '' as string,
  isSearchOpen: false as boolean
};

const homepageReducer = (state = initialState, action: ACTIONPROPS) => {
  let newState;
  switch (action.type) {
    case TOOGLE_HEADER_SEARCH:
      return {
        ...state,
        isSearchOpen: action.payload
      }
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
