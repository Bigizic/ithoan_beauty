/*
 *
 * Homepage actions
 *
 */

import handleError from '../../utils/error';
import {
  DEFAULT_ACTION,
  SET_USER_MAINTENANCE_STATUS,
  HOME_PAGE_LOADING,
  SET_USER_MAINTENANCE_TEXT,
} from './constants';

import { API_URL } from '../../constants';
import axios from 'axios';


export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
};

export const createWebsiteVisit = () => {
  return async(dispatch, getState) => {
    try {
      const visitCreate = await axios.post(`${API_URL}/visit`);
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}


export const setHomePageLoading = (value) => {
  return (dispatch) => {
    dispatch({
      type: HOME_PAGE_LOADING,
      payload: value
    })
  }
}


export const getMaintenanceStats = () => {
  return async(dispatch, getState) => {
    dispatch(setHomePageLoading(true))
    try {
      const response  = await axios.get(`${API_URL}/setting/user`);
      if (response.status === 200) {
          dispatch({
            type: SET_USER_MAINTENANCE_STATUS,
            payload: response.data.setting[0].isMaintenanceMode
          });
          return dispatch({
            type: SET_USER_MAINTENANCE_TEXT,
            payload: response.data.setting[0].maintenanceText
          })
      }
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch(setHomePageLoading(false))
    }
  }
}

export const sortBanners = (bannersData) => {
  try {
    // Filter banners to include only active ones
    const activeBanners = [];
    const modelBanners = [];

    bannersData.forEach(banner => {
      if (!banner.isActive) return;

      // Extract image name without extension
      const imageName = banner.imageUrl.split('/').pop().split('.')[0];

      // Collect images named 'model_1' or 'model_2'
      if (imageName === 'model_1' || imageName === 'model_2') {
        modelBanners.push(banner);
      } else {
        activeBanners.push(banner);
      }
    });

    // Sort active banners so `isDefault: true` comes first
    const sortedActiveBanners = activeBanners.sort((a, b) => (b.isDefault === true) - (a.isDefault === true));

    // Combine model banners and active banners
    const newBanners = [modelBanners, sortedActiveBanners];

    return newBanners;
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [[], []];
  }
};
