/*
 *
 * Dashboard actions
 *
 */

import { TOGGLE_DASHBOARD_MENU, SET_DASHBOARD_ROUTE } from './constants';

export const toggleDashboardMenu = () => {
  return {
    type: TOGGLE_DASHBOARD_MENU
  };
};

export const setDashboardRouter = (v) => ({
  type: SET_DASHBOARD_ROUTE,
  payload: v
})
