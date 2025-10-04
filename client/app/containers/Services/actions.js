/*
 *
 * Services actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_SERVICES_LIST,
  FETCH_SERVICES_ITEM,
  SERVICES_CHANGE,
  SERVICES_EDIT_CHANGE,
  SET_SERVICES_FORM_ERRORS,
  SET_SERVICES_FORM_EDIT_ERRORS,
  ADD_SERVICES,
  REMOVE_SERVICES,
  FETCH_SERVICES_SELECT,
  SET_SERVICES_LIST_LOADING,
  RESET_SERVICES
} from './constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../utils/select';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';

export const servicesChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SERVICES_CHANGE,
    payload: formData
  };
};

export const servicesEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SERVICES_EDIT_CHANGE,
    payload: formData
  };
};

export const resetServices = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_SERVICES });
  };
};

export const setServicesLoading = value => {
  return {
    type: SET_SERVICES_LIST_LOADING,
    payload: value
  };
};

// fetch services list api
export const fetchServicesList = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_SERVICES_LIST_LOADING, payload: true });

      const response = await axios.get(`${API_URL}/services`);

      dispatch({
        type: FETCH_SERVICES_LIST,
        payload: response.data.services
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_SERVICES_LIST_LOADING, payload: false });
    }
  };
};

// fetch services item api
export const fetchServicesItem = servicesId => {
  return async (dispatch, getState) => {
    dispatch(setServicesLoading(true))
    try {
      const response = await axios.get(`${API_URL}/services/${servicesId}`);

      dispatch({
        type: FETCH_SERVICES_ITEM,
        payload: response.data.services
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setServicesLoading(false))
    }
  };
};

// fetch individual services for dropdown
export const fetchServicesForSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/service/list/select`);

      const formattedServices = formatSelectOptions(response.data.services);

      dispatch({
        type: FETCH_SERVICES_SELECT,
        payload: formattedServices
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add services api
export const addServices = () => {
  return async (dispatch, getState) => {
    dispatch(setServicesLoading(true))
    try {
      const rules = {
        name: 'required',
        description: 'required|max:5000',
        title: 'required'
      };

      const services = getState().services.servicesFormData;

      const { isValid, errors } = allFieldsValidation(services, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 5000 characters.',
        'required.title': 'Title is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_SERVICES_FORM_ERRORS, payload: errors });
      }

      const formData = new FormData();
      for (const key in services) {
        if (services.hasOwnProperty(key)) {
          if (key === 'serviceArray' && Array.isArray(services[key])) {
            // Convert select option format to just IDs
            const serviceIds = services[key].map(service => service.value);
            formData.set(key, JSON.stringify(serviceIds));
          } else if (key === 'images' && services[key]) {
            for (let i = 0; i < services[key].newFiles.length; i++) {
              formData.append('images', services[key].newFiles[i].file || services[key].newFiles[i]);
            }
          } else {
            formData.set(key, services[key]);
          }
        }
      }

      const response = await axios.post(`${API_URL}/services/add`, formData, {
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
          type: ADD_SERVICES,
          payload: response.data.services
        });

        dispatch(goBack());
        dispatch({ type: RESET_SERVICES });
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setServicesLoading(false))
    }
  };
};

// update services api
export const updateServices = () => {
  return async (dispatch, getState) => {
    dispatch(setServicesLoading(true))
    try {
      const rules = {
        name: 'required',
        slug: 'required|alpha_dash',
        description: 'required|max:5000',
        title: 'required'
      };

      const servicesItem = getState().services.servicesItem;

      const newServices = {
        name: servicesItem.name,
        slug: servicesItem.slug,
        title: servicesItem.title,
        description: servicesItem.description,
        isActive: servicesItem.isActive,
        serviceArray: servicesItem.serviceArray,
        images: servicesItem.images
      };

      const { isValid, errors } = allFieldsValidation(newServices, rules, {
        'required.name': 'Name is required.',
        'required.slug': 'Slug is required.',
        'alpha_dash.slug': 'Slug may have alpha-numeric characters, as well as dashes and underscores only.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 5000 characters.',
        'required.title': 'Title is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_SERVICES_FORM_EDIT_ERRORS, payload: errors });
      }

      const formData = new FormData();
      for (const key in newServices) {
        if (newServices.hasOwnProperty(key)) {
          if (key === 'images' && newServices[key]) {
            // Handle new image files
            if (newServices[key].newFiles) {
              for (let i = 0; i < newServices[key].newFiles.length; i++) {
                formData.append('images', newServices[key].newFiles[i].file || newServices[key].newFiles[i]);
              }
            }
            // Keep existing images
            if (newServices[key].existingImages) {
              formData.set('existingImages', JSON.stringify(newServices[key].existingImages));
            }
          } else if (key === 'serviceArray' && Array.isArray(newServices[key])) {
            // Convert select option format to just IDs if needed
            const serviceIds = newServices[key].map(service =>
              typeof service === 'object' ? service._id : service
            );
            formData.set(key, JSON.stringify(serviceIds));
          } else {
            formData.set(key, newServices[key]);
          }
        }
      }

      const response = await axios.put(`${API_URL}/services/${servicesItem._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setServicesLoading(false))
    }
  };
};

// delete services api
export const deleteServices = id => {
  return async (dispatch, getState) => {
    dispatch(setServicesLoading(true))
    try {
      const response = await axios.delete(`${API_URL}/services/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_SERVICES,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setServicesLoading(false))
    }
  };
};