/*
 *
 * Dashboard reducer
 *
 */

import { TOGGLE_DASHBOARD_MENU, SET_DASHBOARD_ROUTE } from './constants';

const initialState = {
  isMenuOpen: false,
  routeType: '/dashboard'
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DASHBOARD_ROUTE:
      return {
        ...state,
        routeType: action.payload
      }
    case TOGGLE_DASHBOARD_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    default:
      return state;
  }
};

export default dashboardReducer;
