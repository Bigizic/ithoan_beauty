/*
 *
 * Banner actions
 *
 */

import { goBack } from 'connected-react-router';
import { success, warning } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_BANNER,
  SET_BANNER_LOADING,
  ADD_BANNER,
  SET_BANNER_FORM_ERRORS,
  RESET_BANNER,
  BANNER_CHANGE,
  REMOVE_BANNER,
  FETCH_HOME_BANNER,
} from './constants';

import handleError from '../../utils/error';
import { API_URL } from '../../constants';
import { fileValidation } from '../../utils/validation';

export const bannerChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: BANNER_CHANGE,
    payload: formData
  };
};

export const resetBanner = () => {
  return (dispatch, getState) => {
    const fileInput = document.querySelector('input[name="image"]');
    if (fileInput) {
      fileInput.value = "";
    }
    dispatch({ type: RESET_BANNER });
  };
};

export const setBannerLoading = value => {
  return {
    type: SET_BANNER_LOADING,
    payload: value
  };
};

export const updateBannerlist = (bannerId, newBannerDetails) => {
  return async (dispatch, getState) => {
    try {
      if (getState().authentication.authenticated === true) {
        const response = await axios.put(`${API_URL}/banner/edit/${bannerId}`, {
          newBanner: newBannerDetails,
        });

        const successfulOptions = {
          title: `${response.data.message}`,
          position: 'tr',
          autoDismiss: 1
        };

        if (response.data.success === true) {
          dispatch(success(successfulOptions));
          dispatch(fetchBanners());
        }
      } else {
        const retryOptions = {
          title: `Please login as admin`,
          position: 'tr',
          autoDismiss: 1
        };
        dispatch(warning(retryOptions));
      }
    } catch (error) {
      handleError(error, dispatch);
      dispatch(fetchBanners());
    }
  };
};

// delete banner api
export const deleteBanner = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`${API_URL}/banner/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_BANNER,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch bannerlist api
export const fetchBanners = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_BANNER_LOADING, payload: true });

      const response = await axios.get(`${API_URL}/banner/get_banners`);

      dispatch({ type: FETCH_BANNER, payload: response.data.banners });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_BANNER_LOADING, payload: false });
    }
  };
};

// fetch homepage banner api
export const fetchHomeBanner = () => {
  return async (dispatch, getState) => {
    dispatch(setBannerLoading(true));

    try {
      const response = await axios.get(`${API_URL}/banner/get_banners`);
      dispatch({
        type: FETCH_HOME_BANNER,
        payload: response.data.banners
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setBannerLoading(false));
    }
  };
};

// add banner api
export const addBanner = () => {
  return async (dispatch, getState) => {
    dispatch(setBannerLoading(true))
    try {
      const rules = {
        image: 'required|regex:/\.(jpg|jpeg|png)$/i',
      };

      const banner = getState().banner.bannerFormData;

      const newBanner= {
        image: banner.image,
        isActive: banner.isActive,
        isDefault: banner.isDefault,
        isPopup: banner.isPopup,
        buttonText: banner.buttonText,
        linkType: banner.linkType,
        categorySlug: banner.categorySlug,
        displayDuration: banner.displayDuration
      };

      const errors = await fileValidation(newBanner.image)

      if (!errors) {
        dispatch({ type: SET_BANNER_FORM_ERRORS, payload: { image: ["Please upload files with jpg, jpeg, png format."] } });
        dispatch(setBannerLoading(false));
        return;
      }

      const formData = new FormData();
      if (newBanner.image) {
        for (const key in newBanner) {
          if (newBanner.hasOwnProperty(key)) {
            formData.set(key, newBanner[key]);
          }
        }
      }

      const response = await axios.post(`${API_URL}/banner/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_BANNER,
          payload: response.data
        });
        dispatch(resetBanner());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setBannerLoading(false))
    }
  };
};
